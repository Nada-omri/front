import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  showMe: number | null = null;

  toggleTag(index: number) {
    this.showMe = this.showMe === index ? null : index;
  }
}
