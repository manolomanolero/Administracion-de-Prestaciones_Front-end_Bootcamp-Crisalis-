import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService:LoginService, private router:Router){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.loginService.getToken();
        console.log(token);
        if(token != null){
            authReq = authReq.clone({
                setHeaders : {Authorization:`Bearer ${token}`}
            })
        }
        return next.handle(authReq).pipe(
            catchError((err) => {
                if(err instanceof HttpErrorResponse){
                    if (err.status === 401){
                        this.loginService.logout();
                        this.router.navigate(['login']);
                    }
                }
                return throwError(err);
            })
        );
    }
}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]