import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './productdetails/productdetails.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';
import { PageComponent } from './page/page.component';
import { ContactComponent } from './contact/contact.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

export const routes: Routes = [
    {path:"",component:PageComponent},
    {path:"profile",component:UserprofileComponent},
    {path:"orders",component:OrdersComponent},
    {path:"contact",component:ContactComponent},
    { path : "home", component : HomeComponent},
    { path : "Products", component : ProductComponent },
    {path:"signup",component:UserComponent},
    {path:"login",component:LoginComponent},
    {path:"Logout",component:LogoutComponent},
    { path : "productsbycategory", component : ProductDetailsComponent},
    {path:"cart",component:CartComponent},
    {path:"AboutUs",component:AboutusComponent},
    {path:"orders",component:OrdersComponent},
    {path:"Gallery",component:GalleryComponent},
    { path :  "**", component : NotfoundComponent},  

];
