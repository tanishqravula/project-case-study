// app.module.ts
import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';

const appRoutes: Routes = [
  { path: 'Products', component: ProductComponent },
  // other routes
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AppComponent,
    ProductComponent,
  ],
  providers: [],
})
export class AppModule { }
