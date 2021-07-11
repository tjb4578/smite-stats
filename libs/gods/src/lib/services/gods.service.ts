import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmiteService } from '../../../../../apps/smite-stats/src/app/smite.service';

@Injectable({
  providedIn: 'root'
})
export class GodsService {

  constructor(private http: HttpClient, private smiteService: SmiteService) { }

  getGods() {
    this.http.get('')
  }
}
