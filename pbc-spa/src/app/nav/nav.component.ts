import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
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
  constructor(public authService: AuthService,private alertify:AlertifyService,private router: Router) {}

  ngOnInit(): void {}
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
    localStorage.removeItem('token');
    this.alertify.message('logout');
    this.router.navigate(['/home'])
  }
}
