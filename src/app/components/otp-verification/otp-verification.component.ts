
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication.service';
import { forgotPassword, otpVerification } from 'src/app/model/models/Models.model';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  otpVerifyform!: FormGroup;
  submitted = false;
  otpVerifyObj: otpVerification = {
  };
  getSessionId!: string;



  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

    console.log(history.state)
    this.getSessionId = history.state.data;

    this.otpVerifyform = this.fb.group({

      session_id: [''],
      otp: ['', [Validators.required]],

    },
      {



      })
  }


  get formControls() {
    return this.otpVerifyform.controls;
  }

  verifyOTP(data: any) {
    this.submitted = true;


    const Object = {
      session_id: this.getSessionId,
      otp: data.value.otp
    }
    if (this.otpVerifyform.valid) {

      this.authentication.postVerifyOTP(Object).subscribe(
        (res) => {
          console.log("OTP VALUE", res)


          if (res.message == "OTP verified") {
            alert("OTP verified Successfully")
            this.router.navigate(['/reser-password'], { state: { data: this.getSessionId } });


          }

          else {
            alert("please check OTP is correct or not")
          }

        },
        (err) => {
          console.log(err);
          alert("error")
        });
    }

  }

}
