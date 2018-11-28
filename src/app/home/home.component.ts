import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { directionsKeys } from '../data/data';
import { getKey, initLocalStorage } from '../common/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public amountTotal = 0;
  public amount: string;
  public direction: string;
  public directions = directionsKeys;
  public keys = Object.keys(this.directions);

  constructor(private http: HttpClient) { }

  public ngOnDestroy() {
    this.keys.forEach(
      (k) => {
        const key = getKey(k);

        this.http.patch(
          'http://localhost:3000/' + key,
          {
            value: localStorage.getItem(key)
          }
        ).subscribe(
          (result) => {
            console.log(result);
          }
        )
      });
  }

  public ngOnInit() {
    this.keys.forEach(
      (k) => {
        const key = getKey(k);

        this.http.get(
          'http://localhost:3000/' + key
        ).subscribe(
          (result) => {
            initLocalStorage(key, result['value']);

            // this.amountTotal += Number(result['value']);
          }
        )

        if (localStorage.getItem(key)) {
          this.amountTotal += Number(localStorage.getItem(key));
        }
      }
    )
  }

  public add() {
    const amount = Number(parseFloat('0' + this.amount));
    this.amountTotal += amount;
    this.save(this.direction, amount);
  }

  public sub() {
    const amount = Number(parseFloat('0' + this.amount));
    this.amountTotal -= amount;
    this.save(this.direction, -amount);
  }

  public save(k: string, val: number) {
    let currentValue = 0;
    const key = getKey(k);

    this.addRecord(key, val);
    
    if (localStorage.getItem(key)) {
      currentValue = Number(localStorage.getItem(key)) + val;
    } else {
      currentValue = val;
    }
    //yyyymm_direction
    /*
      yyyymm {
        direction1: value,
        direction2: value,
      }
    */

    localStorage.setItem(key, currentValue.toFixed(2));
  }

  public addRecord(key: string, val: number){
    const recordKey = new Date().getTime();
    this.http.patch(
      'http://localhost:3000/' + key,
      {
        [recordKey]: val
      }
    ).subscribe(
      (result) => {
        console.log(result);
      }
    )
  }
}
