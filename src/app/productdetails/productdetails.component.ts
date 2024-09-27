import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataservice.service';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './productdetails.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  providers: [DataService, HttpClient],
  styleUrls: ['./productdetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productsArray: Product[] = [];
  public filteredProducts: Product[] = [];
  public categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  selectedProduct: Product | null = null; 

  constructor(private dataServiceObj: DataService) {}

  ngOnInit(): void {
    this.getCategories();  
    this.getProductsByCategory(); 
  }

  public getCategories() {
    this.dataServiceObj.getCategories().subscribe((resData: string[]) => {
      this.categories = resData;
    });
  }

  public getProductsByCategory() {
    if (this.selectedCategory) {
      this.dataServiceObj.getProductsByCategory(this.selectedCategory).subscribe((resData: Product[]) => {
        this.filteredProducts = resData;
      });
    } else {
      this.dataServiceObj.getAll().subscribe((resData: Product[]) => {
        this.filteredProducts = resData;
        this.productsArray = resData; 
      });
    }
  }

  public searchProduct() {
    if (this.searchTerm) {
      this.filteredProducts = this.productsArray.filter((product) =>
        product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.getProductsByCategory();
    }
  }

  public onCategoryChange(event: Event) {
    const category = (event.target as HTMLSelectElement).value;
    this.selectedCategory = category;
    this.getProductsByCategory();
  }

  public selectClick(productId: number) {
    this.dataServiceObj.getProductById(productId).subscribe((product: Product) => {
      this.selectedProduct = product;
      console.log('Selected Product:', this.selectedProduct);
    });
  }
}
