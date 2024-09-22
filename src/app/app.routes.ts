import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LogoutComponent } from './logout/logout.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path :  "", component : HomeComponent},
    { path :  "Products", component : ProductComponent },
    {path:"signup",component:UserComponent},
    {path:"login",component:LoginComponent},
    {path:"Logout",component:LogoutComponent},
    { path :  "ProductDetails/:id", component : ProductdetailsComponent },
    {path:"UserProfile",component:UserprofileComponent},
    {path:"Cart",component:CartComponent},
    {path:"AboutUs",component:AboutusComponent},
    {path:"Gallery",component:GalleryComponent},
    { path :  "**", component : NotfoundComponent},  

];
