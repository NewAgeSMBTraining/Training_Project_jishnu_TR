import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { forgotPassword, Loginpage, otpVerification, paginationData, resetpassword, UserDetailspage } from './model/models/Models.model';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token !:string;

  generateQueryUrl(path: string, options?: paginationData) {
    let url = `${this.apiBaseUrl}/${path}?`;
    if (typeof options === 'undefined') { return url; }
    if (!isNaN(Number(options.limit))) { url += 'limit=' + options.limit + '&'; }
    if (!isNaN(Number(options.offset))) { url += 'offset=' + options.offset + '&'; }
    if (options.search) { url += 'search=' + options.search + '&'; }
    if (options.sort && Array.isArray(options.sort)) { url += 'sort=' + JSON.stringify(options.sort) + '&'; }
    if (options.where && typeof options.where === 'object') { url += 'where=' + JSON.stringify(options.where) + '&'; }
    if (options.filters && typeof options.filters === 'object') { url += 'filters=' + JSON.stringify(options.filters) + '&'; }
    if (options.select && Array.isArray(options.select)) { url += 'select=' + JSON.stringify(options.select) + '&'; }
    if (options.populate && Array.isArray(options.populate)) { url += 'populate=' + JSON.stringify(options.populate) + '&'; }
    if (options.data && typeof options.data === 'object') {
      for (const key in options.data) {
        if (options.data.hasOwnProperty(key)) {
          url += `${key}=${options.data[key]}&`;
        }
      }
    }
    return url;
  }

  header = new HttpHeaders({
    // 'Authorization' :"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2MjI1Yzg4Y2Y0ZDZmMjA4NjQxMmJkYTciLCJ1c2VySWQiOjEsImlhdCI6MTY0NjY0MzM0MCwiZXhwIjoxNjQ2NzI5NzQwfQ.eKWCc3-P4T9vP-LDhRp6-G9ixXErqAEqWVN58iYRBio"
    "Authorization" : localStorage.getItem('Authorization') || ""
  })
  data!:Loginpage[];
  private apiBaseUrl =  environment.API_ENDPOINT;
  

  constructor(private httpclient: HttpClient,private httpservice:HttpService) { }

  

  postLogin(data: Loginpage) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/auth/local", data).pipe(map((res => {
          return res
        })))

  }

  postCreateUser(data: UserDetailspage) {
    return this.httpclient.post<any>("http://web.newagesme.com:3636/user", data,{ headers : this.header}).pipe(map((res => {
          return res
        })))

  }

  // getGetUser(url: string, options?: paginationData, auth: boolean = true) {
  //   return this.httpclient.get<any>("http://web.newagesme.com:3636/user",{ 
  //     headers : this.header
  //   }).pipe(map((res => {
  //         return res.data.users
  //       })))

  // }

  
  async getGetUser(url: string, options?: paginationData, auth: boolean = true) {
    try {
      const response = await this.httpservice.get(this.generateQueryUrl(url, options),{headers : this.header});
      return response;
    } catch (e) {
      return this.errorHandler(e);
    }
  }

  errorHandler(e: any): any {
    if (e instanceof HttpErrorResponse) {
      return e.status ? { error: e.error, message: e.error?.message || 'network error' } : { error: e, message: 'network error' };
    } else {
      return { error: e, message: e.message || 'error' };
    }
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

  putEditUser(data: any, id: number) {

    return this.httpclient.put<any>("http://web.newagesme.com:3636/user/" + id,data,{ 
      headers:this.header 
    }).pipe(
      map(
        (res) => {
          return res
        }))
  }

  deleteDeleteUser(id: number) {
    return this.httpclient.delete<any>("http://web.newagesme.com:3636/user/"+id, {headers:this.header}).pipe(
      map(
        (res) => {
          return res
        }))
  }

  

  
  


}
