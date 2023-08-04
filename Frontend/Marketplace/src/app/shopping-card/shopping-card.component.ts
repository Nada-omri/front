import { Component, OnInit } from '@angular/core';

import { Product } from '../shared/models/product';
import { CartService } from '../services/shppingCart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { API_URLS } from '../config/api.url.config';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css'],
})
export class ShoppingCardComponent implements OnInit {
  cart!: Cart;
  Url:string =API_URLS.IMAGE_URL;
  constructor(private cartService: CartService) {
    this.setCart();
  }

  ngOnInit(): void {}

  /*removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product.id);
    this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString, 10); // Add base 10 radix to parseInt
    if (!isNaN(quantity)) { // Add a check for NaN (Not a Number)
      this.cartService.changeQuantity(cartItem.product.id, quantity);
      this.setCart();
    } else {
      // Handle the case where the quantityInString is not a valid number
      // You can show an error message to the user or take appropriate action
      console.error('Invalid quantity');
    }
  }*/

  setCart() {
    this.cart = this.cartService.getCart();
  }
}  




