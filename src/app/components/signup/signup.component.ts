import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private user: UsersService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', Validators.compose([Validators.required])],
      role: ['user']
    })
  }
  onSubmit() {
    let data = this.loginForm.value;
    this.user.signupUser(data).subscribe((res: any) => {
      if (res) {
        this.loginForm.reset();
        this.router.navigate(["home"]);
        console.log('user added successfully!');
      }
      else {
        console.log('Error while creating the user');
      }
    })


  }

  gotoLogin() {
    this.router.navigate(["login"])
  }
}
