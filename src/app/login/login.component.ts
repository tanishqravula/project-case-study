import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  providers: [HttpClient, UserserviceService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public usersArray: User[] = [];
  userName: string = '';
  password: string = '';
  email: string = '';
  address: string = '';

  constructor(
    private userObjectServiceObj: UserserviceService,
    private router: Router,
    private authService: AuthService 
  ) {}

  public loginButtonClick() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    if (this.email === 'admin@gmail.com' && this.password === 'admin@123') {
      alert('Welcome Admin');
      this.authService.login({ customerId: 0, userName: 'Admin', password: '', email: 'admin@gmail.com', address: '' });
      this.router.navigate(['/Products']);
      return;
    }

    let obj: User = new User();
    obj.customerId = 0;
    obj.userName = this.userName;
    obj.password = this.password;
    obj.email = this.email;
    obj.address = this.address;

    this.userObjectServiceObj.login(obj).subscribe((resData: any) => {
      if (resData.success) {
        alert(resData.message);
        this.authService.login(resData.user); 
        this.router.navigate(['/home']); 
      } else {
        alert('Invalid email or password');
      }
    });
  }

  public goToSignup() {
    this.router.navigate(['/signup']);
  }
}
