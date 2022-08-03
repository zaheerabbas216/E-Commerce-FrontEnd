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
  isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private user: UsersService) {
  }


  ngOnInit(): void {
    if (this.user.isLoggedIn()) {
      this.router.navigate(["home"])
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required])],
    })
  }




  onSubmit() {
    let data = this.loginForm.value;
    this.isLoading = true;
    this.user.loginUser(data).subscribe((res: any) => {
      if (res) {
        this.loginForm.reset();
        this.router.navigate(["home"]);
        this.userData = res.user;
        console.log(res);
        localStorage.setItem("token", res.accessToken)
        localStorage.setItem("userInfo", JSON.stringify(this.userData))
        this.isLoading = false;
      }
      else {
        console.log('Error while logging');
        this.isLoading = false;
      }
    }, (error) => {
      // this.loader = false;
      console.log("initiate", error);
      if (error.status === 400) {
        this.isLoading = false;
      }
    })
  }

  gotoSignup() {
    this.router.navigate(["signup"])
  }

}
