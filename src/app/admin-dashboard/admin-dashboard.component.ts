import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../product.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent /*implements OnInit*/ {
  products: Product[] = [];
  newProduct: Product = {
    productId: 0,
    productName: '',
    description: '',
    unitPrice: null,
    category: '',
    stockQuantity: null,
    imageURL: ''
  };

  constructor(private adminService: AdminService) {}

/*  ngOnInit() {
    // Initially load products only when the button is clicked
  } */

  loadProducts() {
    this.adminService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addProduct() {
    
      if (this.newProduct.productId === 0) {
        this.adminService.addProduct(this.newProduct).subscribe(() => {
          alert('Product added successfully!');
          this.loadProducts();
          this.resetForm();
        });
      } else {
        this.adminService.updateProduct(this.newProduct.productId, this.newProduct).subscribe(() => {
        //  alert('Product updated successfully!');
          this.loadProducts();
          this.resetForm();
        });
      }
    }
  

  editProduct(product: Product) {
    
    this.newProduct = { ...product };
  }

  deleteProduct(id: number) {
    const confirmation = confirm('Do you want to delete this product?');
    if (confirmation) {
      this.adminService.deleteProduct(id).subscribe(() => {
        alert('Product deleted successfully!');
        this.loadProducts();
      });
    }
  }

  resetForm() {
    this.newProduct = {
      productId: 0,
      productName: '',
      description: '',
      unitPrice: null,
      category: '',
      stockQuantity: null,
      imageURL: ''
    };
  }
}
