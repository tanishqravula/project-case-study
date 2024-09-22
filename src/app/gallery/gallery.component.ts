import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { DataService } from '../dataservice.service';
import { ProductComponent } from '../product/product.component';
import { ProductdetailsComponent } from '../productdetails/productdetails.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  providers: [DataService, HttpClient],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  public productsArray: Product[] = [];
  public filteredProducts: Product[] = [];
  public selectedProduct: Product | null = null;

  public isFitMode: boolean = false;
  public isFullscreenMode: boolean = false;
  public isAnimationEnabled: boolean = false;
  public isBorderEnabled: boolean = false;
  public isShadowEnabled: boolean = false;
  public isZoomEnabled: boolean = false;

  public selectedFilter: string = 'none'; 

  constructor(private dataServiceObj: DataService) {}

  ngOnInit() {
    this.loadProducts();
  }

  public loadProducts() {
    this.dataServiceObj.getAll().subscribe((resData) => {
      this.productsArray = resData;
      this.filteredProducts = this.productsArray; 
    });
  }

  public openImageModal(product: Product) {
    if (product) {  
      this.selectedProduct = product;
      this.isAnimationEnabled = true;
    } else {
      console.error('Product is null or undefined.');
    }
  }

  public closeModal() {
    this.selectedProduct = null;
  }

  public toggleFitMode() {
    this.isFitMode = !this.isFitMode;
    this.isFullscreenMode = false;
  }

  public toggleFullscreenMode() {
    this.isFullscreenMode = !this.isFullscreenMode;
    this.isFitMode = false; 
  }

  public toggleAnimation() {
    this.isAnimationEnabled = !this.isAnimationEnabled;
  }

  public toggleBorder() {
    this.isBorderEnabled = !this.isBorderEnabled;
  }

  public toggleShadow() {
    this.isShadowEnabled = !this.isShadowEnabled;
  }

  public applyFilter(filter: string) {
    this.selectedFilter = filter;
  }

  public toggleZoom() {
    this.isZoomEnabled = !this.isZoomEnabled; 
  }
}
