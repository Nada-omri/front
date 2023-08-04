import { Component, OnInit } from '@angular/core';
import { produitService } from '../produits/produit.Service';
import { Product } from '../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URLS } from '../config/api.url.config';
import { ProductsService } from '../services/products/products.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  sliderValue: number = 0;
  minValue: number = 0;
  maxValue: number = 100;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchMarque: string = '';
  selectedProduit:Product={name:"",description:"",price:0};
  Url:string =API_URLS.IMAGE_URL;
  

  constructor(
    private produitService: produitService,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.filteredProducts = products; 
        this.route.params.subscribe((params) => {

          if (params['id']) {
            this.filteredProducts = this.products.filter((product: Product) => product.id === params['id']);
          }
        });
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  getProduit(productId: number | undefined, product: Product) { 
    if (productId !== undefined && product !== undefined) {
      this.produitService.getProductById(productId).subscribe(
        res => {
          console.log(res);
          
        },
        error => {
          console.log('Error: Failed to retrieve the product details.', error);
        }
      );
    } else {
      console.log('Error: The selected product does not have a valid ID or is undefined.');
    }
  }
  
  
  

  updateMinMax(): void {
    this.minValue = this.sliderValue;
    this.maxValue = 100 - this.sliderValue;
  }

  applyRange(): void {
    // Perform your desired actions with the values (e.g., send them to the backend)
    // ...

    // For testing, you can log the values in the console
    console.log("Slider Value:", this.sliderValue);
    console.log("Min Value:", this.minValue);
    console.log("Max Value:", this.maxValue);
  }
 
  searchByMarque(searchmarque: string): void {
    this.searchMarque = searchmarque.trim();
    if (!this.searchMarque) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter((product: Product) => {
        return product.name?.toLowerCase().includes(this.searchMarque.toLowerCase());
      });
    }
  }
}




