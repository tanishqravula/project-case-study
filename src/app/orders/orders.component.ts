import { Component, OnInit } from '@angular/core';
import { CartService } from '../cartservice.service';
import { CartItem } from '../../../models/cart-item.model';
import { Product } from '../../../models/product.model';
import { DataService } from '../dataservice.service'; 
import { forkJoin } from 'rxjs'; // Import forkJoin
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone:true,
  imports:[CommonModule,FormsModule,RouterOutlet,RouterLink],
  providers:[DataService,CartService,HttpClient],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  cartItems: CartItem[] = [];
  productsMap: Map<number, Product> = new Map();
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService, private productService: DataService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  // Load all items from the cart
  loadCartItems(): void {
    this.cartService.getAllCartItems().subscribe(
      (cartData) => {
        this.cartItems = cartData;
        this.fetchProductDetails(); 
      },
      (error) => {
        console.error('Error loading cart items', error);
      }
    );
  }

  fetchProductDetails(): void {
    const productObservables = this.cartItems.map(item => this.productService.getProductById(item.productId));

    forkJoin(productObservables).subscribe(
      (products: Product[]) => {
        products.forEach(product => {
          if (product) {
            this.productsMap.set(product.productId, product); 
          }
        });
        this.calculateTotals(); 
      },
      (error) => {
        console.error('Error fetching product details', error);
      }
    );
  }

  calculateTotals(): void {
    this.totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      const product = this.productsMap.get(item.productId);
      const productPrice = product ? product.unitPrice : 0;
      return sum + (productPrice * item.quantity);
    }, 0);
  }

  checkout(): void {
    const confirmation = window.confirm('Are you sure you want to place this order?');
    if (confirmation) {
      this.cartService.checkout().subscribe(
        () => {
          alert('Order placed successfully!');
          this.cartItems = [];
          this.totalPrice = 0;
          this.totalQuantity = 0;
        },
        (error) => {
          console.error('Error during checkout', error);
        }
      );
    }
  }
}
