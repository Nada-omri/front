import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  Productbuyed :number =9;
  Productbuyedstop:any =setInterval(()=>{
    this.Productbuyed++;
    if (this.Productbuyed ==90)
    {
      clearInterval(this.Productbuyedstop);
    }
    },10)
  Customersatisfaction :number =50;
  Customersatisfactionstoped:any =setInterval(()=>{
    this.Customersatisfaction++;
    if (this.Customersatisfaction ==80)
    {
      clearInterval(this.Customersatisfactionstoped);
    }
    },100)
  clientnumber :number =80;
  clientnumberstoped:any =setInterval(()=>{
    this.clientnumber++;
    if (this.clientnumber ==100)
    {
      clearInterval(this.clientnumberstoped);
    }
    },100)
}
