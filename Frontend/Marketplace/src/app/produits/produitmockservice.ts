import { Injectable } from '@angular/core';
import {  Produit } from '../shared/Produit';

@Injectable()
export class ProduitMockService {
  private produits: Produit[] = [];

  constructor() {
    let p1: Produit = new Produit(1,'laptop', 'asus', 40);
    let p2: Produit = new Produit(33,'laptop1', 'asus1', 40);
    this.produits.push(p1);
    this.produits.push(p2);
  }

  public getProduits(): Produit[] {
    return this.produits;
  }
}

