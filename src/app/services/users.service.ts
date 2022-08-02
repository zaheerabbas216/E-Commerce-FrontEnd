import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _baseURL = "http://localhost:4000/user";

  constructor(private http: HttpClient) { }

  loginUser(paylaod: any) {
    return this.http.post(this._baseURL + "/login", paylaod);
  }

  signupUser(paylaod: any) {
    return this.http.post(this._baseURL + "/register", paylaod);
  }

}
