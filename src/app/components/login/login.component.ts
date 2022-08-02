import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userData: any;
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private user: UsersService) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  onSubmit() {
    let data = this.loginForm.value;

    this.user.loginUser(data).subscribe((res: any) => {
      if (res) {
        this.loginForm.reset();
        this.router.navigate(["home"]);
        this.userData = res.user;
        console.log('this.userdata', this.userData);
        localStorage.setItem("userInfo", JSON.stringify(this.userData))
        console.log('user logged in successfully!!', res.user);
      }
      else {
        console.log('Error while logging');
      }
    })
  }

  gotoSignup() {
    this.router.navigate(["signup"])
  }

}
