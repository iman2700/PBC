import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { User } from '../_model/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
 

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl?:string;
   
  constructor(public authService: AuthService,private alertify:AlertifyService,private router: Router) {}

  ngOnInit(): void {

    this.authService.crrentPhotoUrl.subscribe(photourl => this.photoUrl=photourl);
  
  }
  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success("logged in successfully");
      },
      (error) => {
         this.alertify.error("login error");
      },()=> 
      {
       this.router.navigate(['/members']);
      }
    );
  }
  loggedIn()
  {
    // const token=localStorage.getItem("token");
    // return !!token;
   return this.authService.lggedIn();
  }
  logout()
  {
    let user:User;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken=null;
    // this.authService.currentUser=User:{};
    this.alertify.message('logout');
    this.router.navigate(['/home'])
  }
}
 
