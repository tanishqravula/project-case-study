import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CartService } from '../cartservice.service';
import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, FormsModule, CommonModule],
  providers: [HttpClient, CartService],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

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
    this.cartService.checkout().subscribe(
      () => {
        alert('Order placed successfully!');
        this.cartItems = []; 
      },
      (error) => {
        console.error('Error during checkout', error);
      }
    );
  }
}
