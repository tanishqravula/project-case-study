import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { DataService } from '../dataservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../cartservice.service';
import { AuthService } from '../auth.service'; 

interface ProductWithQuantity extends Product {
  selectedQuantity: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DataService, HttpClient, CartService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public productsArray: ProductWithQuantity[] = [];
  public filteredProducts: ProductWithQuantity[] = [];
  searchTerm: string = '';

  constructor(
    private dataServiceObj: DataService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.getDataButtonClick();
  }

  public getDataButtonClick() {
    this.dataServiceObj.getAll().subscribe((resData: Product[]) => {
      this.productsArray = resData.map((product) => ({
        ...product,
        selectedQuantity: 1 
      }));
      this.filteredProducts = this.productsArray;
    });
  }

  public searchProduct() {
    if (this.searchTerm) {
      this.filteredProducts = this.productsArray.filter((product) =>
        product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.productsArray;
    }
  }

  public addToCart(product: ProductWithQuantity) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const productId = product.productId;
    const quantity = product.selectedQuantity;
    if (quantity < 1 || quantity > product.quantity) {
      alert(`Please select a valid quantity. Available stock: ${product.quantity}.`);
      return; 
    }
  
    this.cartService.addToCart(productId, quantity).subscribe(
      (response) => {
        alert(`${product.productName} has been added to the cart with quantity ${quantity}.`);
        this.router.navigate(['/cart']);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to the cart. Please try again.');
      }
    );
  }
}
