import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import moment = require('moment');
import { concatMap, map, switchMap } from 'rxjs/operators';
import { SmiteService } from '../auth/smite.service';

@Injectable()
export class SmiteApiService {
  constructor(private http: HttpService, private service: SmiteService) {}
  
  ping() {
    console.log('[SmiteApiService] PING');
    return this.http.get(this.service.prefix + 'pingjson').pipe(map(res => res.data));
  }

  getGods(lang: string) {
    console.log('[SmiteApiService] GetGods with lang code: ' + lang);
    return this.service.buildUrl('getgods').pipe(
      switchMap(url => {
        url = `${url}/${lang}`;
        console.log('[SmiteApiService] Url: ' + url)
        return this.http.get(url).pipe(map(res => res.data))
      })
    );
  }

  testSession() {
    console.log('[SmiteApiService] Test Session');
    return this.service.buildUrl('testsession').pipe(
      switchMap(url => {
        console.log('[SmiteApiService] Url: ' + url)
        return this.http.get(url).pipe(map(res => res.data));
      })
    );
  }

  // Get one match for now
  getMatches() {
    console.log('[SmiteApiService] Get Matches');
    return this.service.buildUrl('getmatchidsbyqueue').pipe(
      switchMap(url => {
        const date = moment().format('yyyyMMDD');
        console.log(date);
        url = `${url}/426/${date}/15,40`;
        return this.http.get(url).pipe(
          switchMap(idResponse => { 
            console.log(idResponse.data); 
            const ids = idResponse.data[0].Match;
            return this.getMatchDetails(ids) 
          })
        )
      })
    )
  }

  getMatchDetails(id: string) {
    return this.service.buildUrl('getmatchdetails').pipe(
      switchMap(url => {
        url = `${url}/${id}`;
        return this.http.get(url).pipe(map(res => res.data));
      })
    )
  }

  getMatchId() {
    console.log('[SmiteApiService] Get Match Id');
    return this.service.buildUrl('getmatchidsbyqueue').pipe(
      switchMap(url => {
        const date = moment().format('yyyyMMDD');
        console.log(date);
        url = `${url}/426/20210716/1`;
        console.log(url);
        return this.http.get(url).pipe(
          map(res => res.data)
        )
      })
    )
  }

  dataUsed() {
    return this.service.buildUrl('getdataused').pipe(
      switchMap(url => {
        url = `${url}`;
        return this.http.get(url).pipe(map(res => res.data));
      })
    )
  }
}
