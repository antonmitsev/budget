import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public amountTotal = 0;
  public amount: string;
  public direction: string;
  public directions = {
    'personal': 'Personal',
    'bills': 'Bills',
    'home': 'Home',
  };
  public keys = Object.keys(this.directions);

  constructor(private http: HttpClient) { }

  public ngOnInit() {
    this.keys.forEach(
      (k) => {
        const key = this.getKey(k);
        
        this.http.get(
          'http://localhost:3000/' + key
        ).subscribe(
          (result) => {
            return console.log(result);
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

  protected getKey(k: string): string {
    const d = new Date();
    const yyyymm = d.getFullYear() * 100 + d.getMonth() + 1;
    const key = yyyymm + '_' + k;
    return key;
  }

  public save(k: string, val: number) {
    let currentValue = 0;
    const key = this.getKey(k);

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
}
