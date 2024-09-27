import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HttpClient } from '@angular/common/http';
import { DataService } from './dataservice.service';
import { Product } from '../../models/product.model';
import { PageComponent } from './page/page.component';
import { ProductDetailsComponent } from './productdetails/productdetails.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule,FormsModule,ProductComponent,ProductDetailsComponent,PageComponent],
  providers:[HttpClient,DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
