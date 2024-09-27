import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router'; // Import Router for navigation
import { UserserviceService } from '../userservice.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports:[CommonModule,FormsModule,RouterLink,RouterOutlet],
  providers:[HttpClient,UserserviceService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class UserComponent {
  public usersArray: User[] = [];
  userName: string = '';
  password: string = '';
  email: string = '';
  address: string = '';

  constructor(private userObjectServiceObj: UserserviceService, private router: Router) {}

  public addButtonClick() {
    // Validate password and address
    if (!this.password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
      alert('Password must contain at least one special character!');
      return;
    }

    if (this.address.length < 20) {
      alert('Address must be at least 20 characters long!');
      return;
    }

    let obj: User = new User();
    obj.customerId = 0;
    obj.userName = this.userName;
    obj.password = this.password;
    obj.email = this.email;
    obj.address = this.address;

    this.userObjectServiceObj.create(obj).subscribe((resData: any) => {
      alert(resData.status);
      if (resData.status === "User details added successfully.") {
        this.router.navigate(['/login']); // Redirect to login page after successful signup
      }
    });
  }
}
