import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Loginpage } from './model/models/Models.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  header = new HttpHeaders({
    'Authentication' :"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2MjI1Yzg4Y2Y0ZDZmMjA4NjQxMmJkYTciLCJ1c2VySWQiOjEsImlhdCI6MTY0NjY0MzM0MCwiZXhwIjoxNjQ2NzI5NzQwfQ.eKWCc3-P4T9vP-LDhRp6-G9ixXErqAEqWVN58iYRBio"
  })
  data!:Loginpage[];

  constructor(private httpclient: HttpClient) { }

  postLogin(data: Loginpage) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/local", data).pipe(map((res => {
          return res
        })))

  }

  postCreateUser(data: any) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/user", data).pipe(map((res => {
          return res
        })))

  }

  getGetUser() {
    return this.httpclient.get<any>("http://web.newagesme.com:3636/user",{ 
     headers : this.header
    }).pipe(map((res => {
          return res.data.users
        })))

  }
}
