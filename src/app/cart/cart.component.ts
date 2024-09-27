import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CartItem } from '../../../models/cart-item.model';
import { OrdersComponent } from '../orders/orders.component';
import { CartService } from '../cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, FormsModule, CommonModule, OrdersComponent],
  providers: [HttpClient,CartService],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getAllCartItems().subscribe(
      (data) => {
        this.cartItems = data;
      },
      (error) => {
        console.error('Error loading cart items', error);
      }
    );
  }

  removeItem(id: number): void {
    const confirmation = window.confirm('Are you sure you want to remove this item from your cart?');
    
    if (confirmation) {
      this.cartService.removeFromCart(id).subscribe(
        () => {
          this.loadCartItems(); 
        },
        (error) => {
          console.error('Error removing item', error);
        }
      );
    }
  }

  checkout(): void {
    const confirmation = window.confirm('Are you sure want to place this order?');
    if (confirmation) {
      
          this.router.navigate(['/orders']);
          //alert('Order placed successfully!');
          
          //this.cartItems = []; 
    }


    }
  }
