import { Component } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdminDashboardComponent,RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  
  title = 'Ikea-Project';
  constructor(private router:Router){}
  signOut(){
    this.router.navigate(['/login']);
  }
}
