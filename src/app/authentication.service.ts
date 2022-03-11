import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { forgotPassword, Loginpage, otpVerification, resetpassword } from './model/models/Models.model';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token !:string;

  header = new HttpHeaders({
    // 'Authorization' :"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2MjI1Yzg4Y2Y0ZDZmMjA4NjQxMmJkYTciLCJ1c2VySWQiOjEsImlhdCI6MTY0NjY0MzM0MCwiZXhwIjoxNjQ2NzI5NzQwfQ.eKWCc3-P4T9vP-LDhRp6-G9ixXErqAEqWVN58iYRBio"
    "Authorization" : localStorage.getItem('Authorization') || ""
  })
  data!:Loginpage[];

  constructor(private httpclient: HttpClient) { }

  postLogin(data: Loginpage) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/local", data).pipe(map((res => {
          return res
        })))

  }

  postCreateUser(data: any) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/user", data,{ headers : this.header}).pipe(map((res => {
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

  postForgotPassword(data: forgotPassword) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/password/forgot", data).pipe(map((res => {
          return res
        }),
        catchError((error) => {
          return throwError('Something went wrong!', error);
        })
      ));

  }

  postVerifyOTP(data: otpVerification) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/otp/verify", data).pipe(map((res => {
          return res
        }),
        catchError((error) => {
          return throwError('Something went wrong!', error);
        })
      ));

  }

  postResetPassword(data: resetpassword) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/password/reset", data).pipe(map((res => {
          return res
        }),
        catchError((error) => {
          return throwError('Something went wrong!', error);
        })
      ));

  }

  

  
  


}
