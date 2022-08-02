import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user__: any;
  role: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getUserDatafromLocalStorage();
  }

  getUserDatafromLocalStorage() {
    let userData: any;
    userData = localStorage.getItem('userInfo');
    this.user__ = JSON.parse(userData)
    console.log('the user data is===========', this.user__);
    this.role = this.user__.role;
    console.log('this.role', this.role);

  }

  logout() {
    this.router.navigate(["login"])
  }
}
