import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router,private alerify:AlertifyService){}
  canActivate(): boolean  {
    if(this.authService.lggedIn())
    {
      return true;
    }
    this.alerify.error('you shall not pass');
    this.router.navigate(['/home']);
    return false;
    
  }
  
}
