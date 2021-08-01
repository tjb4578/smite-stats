import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GodsEntity } from '../+state/gods.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GodsService {

  constructor(private http: HttpClient) { }

  getGods(): Observable<GodsEntity[]> {
    return this.http.get<GodsEntity[]>('/api/gods');
  }

  ping() {
    return this.http.get('/api/').subscribe((res: any) => console.log(res.msg));
  }

  testSession() {
    return this.http.get('/api/test').subscribe((res: any) => console.log(res));
  }

  testSample() {
    return this.http.get('/api/sample').subscribe((res: any) => console.log(res));
  }
}
