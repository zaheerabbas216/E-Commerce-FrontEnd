import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieStore } from '../../shared/helpers/CookieStrore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _baseURL = "http://localhost:4000/user";
  _baseURLREQ = "http://localhost:4000";

  constructor(private http: HttpClient, private router: Router) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refresh-token', token);
  }

  getToken(): String | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    console.log('got token', localStorage.getItem('token'));
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }


  loginUser(paylaod: any) {
    return this.http.post(this._baseURL + "/login", paylaod);
  }

  signupUser(paylaod: any) {
    return this.http.post(this._baseURL + "/register", paylaod);
  }

  sendRequest(payload: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${CookieStore.getToken()}`)
    return this.http.post(this._baseURLREQ + "/request/newrequest", payload, ({ headers }))
  }

  getAllRequests() {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${CookieStore.getToken()}`)
    return this.http.get(this._baseURLREQ + "/request/getrequest", ({ headers }))
  }

  getRequestById(id: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${CookieStore.getToken()}`)
    return this.http.get(`${this._baseURLREQ}/request/${id}`, ({ headers }))
  }

}
