import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/authentication.service';
import { resetpassword } from 'src/app/model/models/Models.model';

@Component({
  selector: 'app-reser-password',
  templateUrl: './reser-password.component.html',
  styleUrls: ['./reser-password.component.scss']
})
export class ReserPasswordComponent implements OnInit {
  resetPassform!: FormGroup;
  submitted = false;
  resetPassObj: resetpassword = {
  };
  getSessionId!: string;

  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

    console.log(history.state)
    this.getSessionId = history.state.data;

    this.resetPassform = this.fb.group({

      session_id: [''],
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]],
      // [Validators.required,Validators.pattern('^[A-Za-z0-9]{6,10}$')],
      cofirmpassword: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]]
      // Validators.required,Validators.pattern('^[A-Za-z0-9]{6,10}$')

    },
      {


      })
  }
  saveform() {

  }

  get formControls() {
    return this.resetPassform.controls;
  }


  resetPassword(data: any) {
    this.submitted = true;



    const Object = {
      session_id: this.getSessionId,
      password: data.value.password
    }
    if (this.resetPassform.valid) {
      this.authentication.postResetPassword(Object).subscribe(
        (res) => {
          console.log("Result", res)


          if (res.message == "Password changed") {
            alert("password updated Successfully")
            this.router.navigate(['/login'], { state: { data: this.getSessionId } });


          }

          else {
            alert("please check any errors")
          }

        },
        (err) => {
          console.log(err);
          alert("error")
        });

    }

  }

}
