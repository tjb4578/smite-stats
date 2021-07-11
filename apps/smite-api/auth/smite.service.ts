import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Md5 } from 'ts-md5/dist/md5';
import { KEYS } from './config';
import { HttpService } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

interface SessionInfo {
  ret_msg: string,
  session_id: string,
  timestamp: string
}

@Injectable()
export class SmiteService {
  private session: SessionInfo = {
    ret_msg: '',
    session_id: '',
    timestamp: ''
  }

  constructor(private http: HttpService) { 
    this.getSession();
  }

  prefix = 'https://api.smitegame.com/smiteapi.svc/';

  get sessionId(): string {
    return this.session.session_id;
  }

  generateSignature(methodName: string) {
    // Need an MD5 Hash from {{devId + methodName + authKey + currentTimeStamp }}
    return Md5.hashStr(KEYS.devId + methodName + KEYS.authKey + this.getTimeStamp());
  }

  getSession() {
    let idSubject = new Subject<string>();
    if (!this.isValidSession()) {
      // Generate a new session
      const methodName = 'createsession'
      const url = this.prefix + 
                  methodName + 
                  'json/' + 
                  KEYS.devId + 
                  '/' + 
                  this.generateSignature(methodName) + 
                  '/' + 
                  this.session.session_id +
                  '/' +
                  this.getTimeStamp();

      this.http.get<SessionInfo>(url).subscribe(
        res => {
          this.session = res.data; 
          idSubject.next(res.data.session_id);
        }
      )
    } else {
      idSubject.next(this.session.session_id);
    }

    return idSubject.asObservable();
  }

  /**
   * First fetches the sessionId asynchonously, then builds a correctly formatted API url
   * @param methodName 
   * @returns 
   */
  buildUrl(methodName: string): Observable<string> {
    let urlSubject = new Subject<string>();
    this.getSession().subscribe(sessionId => {
      urlSubject.next(
        this.prefix + 
           methodName + 
           'json/' + 
           KEYS.devId + 
           '/' + 
           this.generateSignature(methodName) + 
           '/' + 
           sessionId +
           '/' +
           this.getTimeStamp()
      )
    });
    return urlSubject.asObservable();
  }

  private getTimeStamp() {
    return moment().format('yyyyMMddHHmmss');
  }

  /**
   * Check if the session id exists and hasn't expired.
   * Smite api sessions expire after 15 minutes
   * @returns boolean
   */
  private isValidSession(): boolean {
    if (!!this.session.session_id) {
      const currentTimeStamp = moment();
      const sessionTimeStamp = moment(this.session.timestamp);
      const elapsedTime = currentTimeStamp.diff(sessionTimeStamp, 'minutes');

      return elapsedTime > 15;
    }
    return false;
  }
}
