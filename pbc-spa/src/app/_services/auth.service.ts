import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl =environment.apiUrl+ 'auth/';
  jwtHelpr=new JwtHelperService();
  decodedToken:any;
  constructor(private http: HttpClient) {}
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken=this.jwtHelpr.decodeToken(user.token)
          // console.log(this.decodedToken);
        }
      })
    );
  }
  register(model:any)
  {
    return this.http.post(this.baseUrl+'register',model);
  }
  lggedIn()
  {
    const token =localStorage.getItem("token")??'';
    return !this.jwtHelpr.isTokenExpired(token);
  }
}
