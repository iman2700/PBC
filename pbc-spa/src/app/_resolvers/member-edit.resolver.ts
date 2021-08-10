import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_model/user";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";
@Injectable()
export class MemberEditResolver implements Resolve<User>
{
    constructor(private userService:UserService,private router:Router,private alertify:AlertifyService,private authService:AuthService)
    {

    }
 
    resolve(route: ActivatedRouteSnapshot) : Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(err => of('error', err)
            )
        )
    }
}