import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public amountTotal = 0;
  public amount = 0;
  public amountField;
  
  

  constructor() { }

  public ngOnInit() {
  }

  public add() {
    console.log(this.amountField);
    this.amountTotal += this.amountField.value;
  }

  public sub() {

  }

}
