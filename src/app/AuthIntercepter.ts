import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let headers = new Headers({'content-language': 'en' }); 
    //headers.set("Authorization","Basic dXNlcjp1c2Vy");
    const authReq = req.clone({headers: req.headers.set('Authorization', 'Basic dXNlcjp1c2Vy')});
    return next.handle(authReq);
  }
}