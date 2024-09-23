import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageService } from './image.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Product Details';
  image: string = "";
  productId:number=11;
  product:any;
  

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getProduct(this.productId).subscribe((data: any) => {
      this.product = data;
      
    });
  }
}
