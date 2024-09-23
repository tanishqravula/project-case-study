// src/app/models/product.model.ts

export class Product {
    productId: number;
    productName: string;
    description: string;
    unitPrice: number|null;
    category: string;
    stockQuantity: number| null;
    imageURL: string;

    constructor() {
        this.productId = 0;
        this.productName = '';
        this.description = '';
        this.unitPrice = null;
        this.category = '';
        this.stockQuantity = null;
        this.imageURL = '';
      }
}
