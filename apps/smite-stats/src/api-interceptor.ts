/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import * as moment from 'moment';
import { Md5 } from 'ts-md5/dist/md5';


import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private prefix = 'https://api.smitegame.com/smiteapi.svc/';
  private devId = '3990';
  private authKey = 'FF0EF34CE82B4B5995251A69C3D7D263';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timestamp = moment().format('yyyyMMddHHmmss');
    const signature = this.generateSignature(req.url, timestamp);
    const url = this.prefix + req.url + 'Json/' + this.authKey + '/' + signature + '/' + timestamp;

    const reqClone = req.clone({url: url})
    return next.handle(reqClone);
  }

  generateSignature(methodName: string, timestamp: string) {
    // Need an MD5 Hash from {{devId + methodName + authKey + currentTimeStamp }}
    return Md5.hashStr(this.devId + methodName + this.authKey + timestamp);
  }
}