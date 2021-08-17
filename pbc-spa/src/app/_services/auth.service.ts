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
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user',JSON.stringify(user.user));
          this.decodedToken=this.jwtHelpr.decodeToken(user.token)
          this.currentUser=user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
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
