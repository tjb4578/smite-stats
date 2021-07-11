import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { mergeMap } from 'rxjs/operators';
import { SmiteService } from '../auth/smite.service';

@Injectable()
export class SmiteApiService {
  constructor(private http: HttpService, private service: SmiteService) { }

  getGods(lang: string) {
    return this.service.buildUrl('getgods').pipe(
      mergeMap(url => this.http.get(url + `/${lang}`))
    )
  }
}
