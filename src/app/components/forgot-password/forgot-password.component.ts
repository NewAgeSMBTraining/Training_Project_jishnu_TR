import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication.service';
import { forgotPassword } from 'src/app/model/models/Models.model';
// import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpassform!: FormGroup;
  submitted = false;
  forgotObj: forgotPassword = {
  };
  getSessionId!: string;



  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.forgotpassform = this.fb.group({
      email: ['',[Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
      session_id: [''],
      // otp: ['',[Validators.required]],
      // password:['',[Validators.required,[Validators.required,Validators.pattern('^[A-Za-z0-9]{6,10}$')]]],
      // cofirmpassword:['',[Validators.required,Validators.required,Validators.pattern('^[A-Za-z0-9]{6,10}$')]]
    },
    {

    // Validator:ConfirmedValidator('password','cofirmpassword')

    })
  }
  saveform(){

  }
  get formControls() {
    return this.forgotpassform.controls;
  }

  requestEmail(data: any) {
    this.submitted = true;

    const Object = {
      email: data.value.email,
    }

    this.authentication.postForgotPassword(Object).subscribe(
      (res) => {
        console.log("email", res)
        this.getSessionId=res.data.session_id
        // localStorage.setItem("QWER",res.data.session_id)
        
        if (res.message == "OTP sent") {
          alert("OTP Send successfully")
          this.router.navigate(['/otp-verification'],{state: {data : this.getSessionId}});

        }

        else {
          alert("please check email is correct or not")
        }

      },
      (err) => {
        console.log(err);
        alert("error")
      });

  }



  // verifyOTP(data: any) {
   
  
  //   const Object = {
  //     session_id: this.getSessionId,
  //     otp: data.value.otp
  //   }
  //   this.authentication.postVerifyOTP(Object).subscribe(
  //     (res) => {
  //       console.log("OTP VALUE", res)
        

  //       if (res.message == "OTP verified") {
  //         alert("OTP verified Successfully")
          

  //       }

  //       else {
  //         alert("please check OTP is correct or not")
  //       }

  //     },
  //     (err) => {
  //       console.log(err);
  //       alert("error")
  //     });

  // }

  // resetPassword(data: any) {
   
  
  //   const Object = {
  //     session_id: this.getSessionId,
  //     password: data.value.password
  //   }
  //   this.authentication.postResetPassword(Object).subscribe(
  //     (res) => {
  //       console.log("Result", res)
        

  //       if (res.message == "Password changed") {
  //         alert("password updated Successfully")
          

  //       }

  //       else {
  //         alert("please check any errors")
  //       }

  //     },
  //     (err) => {
  //       console.log(err);
  //       alert("error")
  //     });

  // }



  
}
