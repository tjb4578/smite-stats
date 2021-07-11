import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Md5 } from 'ts-md5/dist/md5';

interface SessionInfo {
  ret_msg: string,
  session_id: string,
  timestamp: string
}

@Injectable({
  providedIn: 'root'
})
export class SmiteService {
  private session: SessionInfo = {
    ret_msg: '',
    session_id: '',
    timestamp: ''
  }

  constructor(private http: HttpClient) { 
    this.generateSession();
  }

  prefix = 'https://api.smitegame.com/smiteapi.svc/';
  devId = '3990';
  authKey = 'FF0EF34CE82B4B5995251A69C3D7D263';

  get sessionId(): string {
    return this.session.session_id;
  }

  generateSignature(methodName: string) {
    // Need an MD5 Hash from {{devId + methodName + authKey + currentTimeStamp }}
    return Md5.hashStr(this.devId + methodName + this.authKey + this.getTimeStamp());
  }

  generateSession() {
    const methodName = 'createsessionjson/';
    const url = this.prefix + methodName + this.devId + '/' + this.generateSignature(methodName) + '/' + this.getTimeStamp();
    this.http.get<SessionInfo>(url).subscribe(
      (json: SessionInfo) => this.session = json, 
      error => console.log('[Could not get session info] ' + error)
    );
  }

  private getTimeStamp() {
    return moment().format('yyyyMMddHHmmss');
  }
}


// When I access the sessionId property, I want the app to check if it exists and if it has timed out.
// If it has timed out, I want the property access to stall until the app fetches a new session.

// Solutions
// 1. Return a promise instead of a string?  What extra work would that entail in the feature services?
// 2. Always keep the sessionId updated in this service.  When it expires, retrieve a new one.  Just return the string when property is accessed
      // Could lead to an error if the user tries to get data while a new sessionId is being fetched


// Eureka!  I need an api gateway