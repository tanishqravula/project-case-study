import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserserviceService } from '../users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../Models/User';

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

  constructor(private userObjectServiceObj: UserserviceService, private router: Router) {}

  public loginButtonClick() {
    // Ensure both email and password fields are filled
    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    let obj: User = new User();
    obj.customerId = 0;
    obj.userName = this.userName;
    obj.password = this.password;
    obj.email = this.email;
    obj.address = this.address;

    this.userObjectServiceObj.login(obj).subscribe((resData: any) => {
      alert(resData.message);
      if (resData.success) {
        this.router.navigate(['/']); // Redirect to login page after successful signup
      }
      else{
        alert("Invalid email or password");
      }
    });
  }

  public goToSignup() {
    this.router.navigate(['/signup']); // Redirect to signup page
  }
}
