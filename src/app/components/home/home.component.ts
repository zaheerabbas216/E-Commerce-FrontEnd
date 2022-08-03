import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user__: any;
  role: any;

  constructor(private router: Router, private user: UsersService) { }

  ngOnInit(): void {
    this.getUserDatafromLocalStorage();
  }

  getUserDatafromLocalStorage() {
    let userData: any;
    userData = localStorage.getItem('userInfo');
    this.user__ = JSON.parse(userData)
    this.role = this.user__.role;
  }



  logout() {
    this.user.logout();
  }
}
