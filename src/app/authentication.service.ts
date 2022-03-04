import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpclient: HttpClient) { }

  postLogin(data: any) {
    return this.httpclient.post<any>("http://web.newagesme.com:3010/user/login", data).pipe(map((res => {
          return res
        })))

  }
}
