import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
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
}
