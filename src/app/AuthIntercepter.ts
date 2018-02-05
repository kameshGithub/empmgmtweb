import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let basicAuthValue = btoa("admin:admin"); //username:pass    
    // const authReq = req.clone({headers: req.headers.set('Authorization', 'Basic '+ basicAuthValue)});
    // return next.handle(authReq);
    return next.handle(req);    
  }
}