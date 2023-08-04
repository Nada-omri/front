import { Product } from "./product"; // Note the lowercase "p" in "product"

export class CartItem {
    constructor(product: Product) {
        this.product = product;
    }

    product!: Product;
    quantity: number = 1;

    get price(): number {
        if (this.product) {
            return 4 * this.quantity; // Access the price property of the Product class
        } else {
            return 0; 
        }
    }
}
