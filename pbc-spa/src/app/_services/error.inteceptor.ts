import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
 
import { Observable, throwError } from "rxjs";
import { catchError, retry, tap } from "rxjs/operators";

@Injectable()
export  class ErrorInteceptor implements HttpInterceptor 
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        throw new Error("Method not implemented.");
    }
    
    
    }
    export const ErrorInterceptorProvider={
        provide:HTTP_INTERCEPTORS,
        useClass:ErrorInteceptor,
        multi:true
    }