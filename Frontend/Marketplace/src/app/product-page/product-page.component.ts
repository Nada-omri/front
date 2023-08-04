import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { produitService } from '../produits/produit.Service';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URLS } from '../config/api.url.config';
import { CartService } from '../services/shppingCart.service';
import { AccountService } from '../services/accounts/account.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  productId!: number;
  productDetails: any; 
  Url:string =API_URLS.IMAGE_URL;

  constructor(private productService: produitService, private route: ActivatedRoute,
    private router: Router, private cartService:CartService ,private accountService:AccountService ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.productId = +params.get('id')!;
        this.getProductDetails();
      });}
      getProductDetails() {
        this.productService.getProductById(this.productId).subscribe(
          res => {
            this.productDetails = res;
            console.log(this.productDetails);
          },
          error => {
            console.log('Error: Failed to retrieve the product details.', error);
          }
        );
      }
      /*addToCart() {
        if (this.productDetails) {
          this.shoppingCartService.addToCart(this.productDetails);
          console.log("Added to cart:", this.productDetails);
        } else {
          console.log("No product details to add to cart.");
        }
      }
      
      addToCart() {
        if (this.productDetails) {
          this.cartService.setSelectedProduct(this.productDetails);
          console.log("Added to cart:", this.productDetails);
          this.router.navigateByUrl('/shops');

        } else {
          console.log("No product details to add to cart.");
        }
      }*/
      addToCart() {
        if (this.accountService.isAuthenticated()) {
          this.cartService.addToCart(this.productDetails);
          this.router.navigateByUrl('/shops');
        } else {
          this.router.navigateByUrl('/signin'); // Assuming the sign-in page URL is '/signin'
        }    
    }
  } 