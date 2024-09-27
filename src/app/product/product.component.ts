import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../dataservice.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet,CommonModule, FormsModule],
  providers: [DataService, HttpClient],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  public productsArray: Product[] = [];
  public filteredProducts: Product[] = [];
  productName: string = '';
  unitPrice: number = 0;
  quantity: number = 0;
  category: string = '';
  description: string = '';
  url: string = '';
  public selectedId: number = 0;
  searchTerm: string = ''; // Search term

  constructor(private dataServiceObj: DataService) {}

  public getDataButtonClick() {
    this.dataServiceObj.getAll().subscribe((resData) => {
      this.productsArray = resData;
      this.filteredProducts = this.productsArray; // Initially display all products
    });
  }

  // Search functionality
  public searchProduct() {
    if (this.searchTerm) {
      this.filteredProducts = this.productsArray.filter((product) =>
        product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.productsArray; // Reset to all products if no search term
    }
  }

  public deleteClick(sid: number) {
    let flag: boolean = confirm('Do you want to delete?');

    if (flag == false) {
      return;
    }

    this.dataServiceObj.delete(sid).subscribe((resData:any) => {
      alert(resData.status);
      this.getDataButtonClick();
    });
  }

  public selectClick(sid: number) {
    this.dataServiceObj.getProductById(sid).subscribe((resData: Product) => {
      this.selectedId = resData.productId;
      this.productName = resData.productName;
      this.unitPrice = resData.unitPrice;
      this.quantity = resData.quantity;
      this.category = resData.category;
      this.description = resData.description;
      this.url = resData.url;
    });
  }

  public addButtonClick() {
    let obj: Product = new Product();
    obj.productId = 0;
    obj.productName = this.productName;
    obj.unitPrice = this.unitPrice;
    obj.quantity = this.quantity;
    obj.category = this.category;
    obj.description = this.description;
    obj.url = this.url;

    this.dataServiceObj.create(obj).subscribe((resData: any) => {
      alert(resData.status);
      this.getDataButtonClick();
      this.clearFields();
    });
  }

  public clearFields() {
    this.productName = '';
    this.unitPrice = 0;
    this.quantity = 0;
    this.category = '';
    this.description = '';
    this.url = '';
  }

  public updateButtonClick() {
    let obj: Product = new Product();
    obj.productId = this.selectedId;
    obj.productName = this.productName;
    obj.unitPrice = this.unitPrice;
    obj.quantity = this.quantity;
    obj.category = this.category;
    obj.description = this.description;
    obj.url = this.url;

    this.dataServiceObj.update(obj).subscribe((resData: any) => {
      alert(resData.status);
      this.getDataButtonClick();
    });
  }
}
