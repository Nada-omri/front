import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();

  constructor() {
    // Load the cart from local storage if it exists
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart(product: Product): void {
    if (!product.id) {
      console.error("Invalid product ID. Cannot add to cart.");
      return;
    }

    let cartItem = this.cart.items.find(item => item.product.id === product.id);
    if (cartItem) {
      this.changeQuantity(product.id, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItem(product));
    this.saveCart(); // Save the cart to local storage after updating it
  }

  removeFromCart(productId: number): void {
    this.cart.items =
      this.cart.items.filter(item => item.product.id != productId);
    this.saveCart(); // Save the cart to local storage after updating it
  }

  changeQuantity(productId: number, quantity: number) {
    let cartItem = this.cart.items.find(item => item.product.id === productId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    this.saveCart(); // Save the cart to local storage after updating it
  }

  getCart(): Cart {
    return this.cart;
  }
}
