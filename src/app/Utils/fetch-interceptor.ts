import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class FetchInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const fetchReq = req.clone({ headers: req.headers.set('X-Requested-With', 'Fetch') });
    return next.handle(fetchReq);
  }
}