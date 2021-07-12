import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GodsService {

  constructor(private http: HttpClient) { }

  getGods() {
    return this.http.get('/api/gods?languageCode=1').subscribe((res: any) => res.subscribe((uh: any) => console.log(uh)));
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
