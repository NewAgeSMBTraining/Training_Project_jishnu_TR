import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication.service';
import { forgotPassword } from 'src/app/model/models/Models.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpassform!: FormGroup;
  cardSwitch: boolean = true;
  invalidOtpMsg: boolean = false;
  submitted = false;
  forgotObj: forgotPassword = {
  };
  getSessionId!: string;



  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.forgotpassform = this.fb.group({
      email: [''],
      session_id: [''],
      otp: ['']

    })
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



  verifyOTP(data: any) {
   
  
    const Object = {
      session_id: this.getSessionId,
      otp: data.value.otp


    }
    this.authentication.postVerifyOTP(Object).subscribe(
      (res) => {
        console.log("OTP VALUE", res)
        

        if (res.session_id == this.getSessionId) {
          alert("verified")
          

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

  
}
