import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { directionsKeys } from '../data/data';
import { getKey, initLocalStorage } from '../common/helpers';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public directions = directionsKeys;
  public keys = Object.keys(this.directions);
  public stats = [];
  
  constructor(private http: HttpClient) { }

  public ngOnInit() {
    this.keys.forEach(
      (k) => {
        const key = getKey(k);
        this.stats.push(
          {
            key: key,
            records: []
          }
        );

        this.http.get(
          'http://localhost:3000/' + key
        ).subscribe(
          (result) => {
            const timestamps = Object.keys(result);
            timestamps.forEach(
              (ts) => {
                if (ts !== 'value') {
                  this.stats[this.stats.length - 1]['records'].push(
                    {
                      ts: ts,
                      amount: result[ts]
                    }
                  );
                }
              }
            )
            
            // initLocalStorage(key, result['value']);
          }
        ) 
      }
    );
    console.log(this.stats);
  }

}
