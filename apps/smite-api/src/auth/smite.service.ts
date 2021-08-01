import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Md5 } from 'ts-md5/dist/md5';
import { KEYS } from './config';
import { HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface SessionInfo {
  ret_msg: string,
  session_id: string,
  timestamp: string
}

@Injectable({providedIn: 'root'})
export class SmiteService {
  private session: SessionInfo = {
    ret_msg: '',
    session_id: '',
    timestamp: ''
  }

  constructor(private http: HttpService) { }

  prefix = 'https://api.smitegame.com/smiteapi.svc/';

  generateSignature(methodName: string) {
    // Need an MD5 Hash from {{devId + methodName + authKey + currentTimeStamp }}
    return Md5.hashStr(KEYS.devId + methodName + KEYS.authKey + this.getTimeStamp());
  }

  getSession() {
    if (!this.isValidSession()) {
      // Generate a new session
      console.log(`[SmiteService] No valid sessionId found.  Generating new one`)
      const methodName = 'createsession'
      const url = this.prefix + 
                  methodName + 
                  'Json/' + 
                  KEYS.devId + 
                  '/' + 
                  this.generateSignature(methodName) + 
                  '/' +
                  this.getTimeStamp();

      console.log(`[SmiteService] Session request to ${url}`)

      return this.http.get<SessionInfo>(url).pipe(map(
        res => { 
          console.log(`[SmiteService] Received session data {sessionId: [${res.data.session_id}] | timestamp: [${res.data.timestamp}] | msg: [${res.data.ret_msg}]`);
          this.session = res.data as SessionInfo; 
          console.log(`[SmiteService] Cached session data.  SessionId {${this.session.session_id}} should equal {${res.data.session_id}}`);
          return res.data.session_id; 
        },
        err => console.log(`[SmiteService] Could not retrieve session data. ${err}`)
      ));
    }
    console.log(`[SmiteService] Valid sessionId found: ${this.session.session_id}`);
    return of(this.session.session_id);
  }

  /**
   * First fetches the sessionId asynchonously, then builds a correctly formatted API url
   * @param methodName 
   * @returns 
   */
  buildUrl(methodName: string): Observable<string> {
    console.log(`[SmiteService] Building URL with methodname: [${methodName}]`)
    //const urlSubject = new ReplaySubject<string>();
    return this.getSession().pipe(
      map(sessionId => {
        console.log(`[SmiteService] returning sessionId: [${sessionId}]`)
        return this.prefix + 
                methodName + 
                'json/' + 
                KEYS.devId + 
                '/' + 
                this.generateSignature(methodName) + 
                '/' + 
                sessionId +
                '/' +
                this.getTimeStamp();
      })
    );
  }

  private getTimeStamp() {
    console.log('[SmiteService] getting timestamp')
    return moment().utc().format('yyyyMMDDHHmmss');
  }

  /**
   * Check if the session id exists and hasn't expired.
   * Smite api sessions expire after 15 minutes
   * @returns boolean
   */
  private isValidSession(): boolean {
    if (this.session.session_id) {
      const currentTimeStamp = moment().utc();
      const sessionTimeStamp = moment(this.session.timestamp).utc().subtract(moment.duration(4, 'hours'));
      console.log(`[ISVALIDSESSION] Current: ${currentTimeStamp} | Session: ${sessionTimeStamp}`)
      const elapsedTime = currentTimeStamp.diff(sessionTimeStamp, 'minutes');
      console.log(`[SmiteService] Elapsed session time: {${elapsedTime}}`)

      return elapsedTime < 15;
    }
    console.log('THIS SHIT AINT BEING SAVED CHIEF')
    return false;
  }
}
