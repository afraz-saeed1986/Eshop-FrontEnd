import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DomainName } from './pathTools';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EshopInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService){}
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    const token = this.cookieService.get('eshop-cookie');

  const myRequest = req.clone({
    url: DomainName + req.url,
    headers: req.headers.set('Authorization', 'Bearer '+ token)
    //   .set('Content-Type', 'application/json')
    //  .set('Access-Control-Allow-Headers', '*')
    //   .set('Access-Control-Allow-Methods', '*')
    //  .set('Access-Control-Allow-Origin', '*')
    // headers: new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Authorization': 'Bearer '+ token,
    //   'Access-Control-Allow-Origin': '*'
    // })
  });

    return next.handle(myRequest);
  }
}
