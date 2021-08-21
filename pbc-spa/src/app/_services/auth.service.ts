import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl =environment.apiUrl+ 'auth/';
  jwtHelpr=new JwtHelperService();
  decodedToken:any;
  currentUser!: User;
  photoUrl=new BehaviorSubject<string>('../../assets/user.png');
  crrentPhotoUrl=this.photoUrl.asObservable();
  constructor(private http: HttpClient) {}
  changeMemberPhoto(phtourl:string)
  {
    this.photoUrl.next(phtourl);
  }
  login(user: User) {
    debugger;
    return this.http.post(this.baseUrl + 'login', user).pipe(
      map((response: any) => {
        const userData = response;
        if (userData) {
          localStorage.setItem('token', userData.token);
          localStorage.setItem('user',JSON.stringify(userData.user));
          this.decodedToken=this.jwtHelpr.decodeToken(userData.token)
          this.currentUser=userData.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }
  register(user:User)
  {
    return this.http.post(this.baseUrl+'register',user);
  }
  lggedIn()
  {
    const token =localStorage.getItem("token")??'';
    return !this.jwtHelpr.isTokenExpired(token);
  }
}
