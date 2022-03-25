import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from 'src/app/model/models/Models.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { NbDialogRef } from '@nebular/theme';
import { DialogResponse } from 'src/app/model/models/Models.model';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  changepassdObj: ChangePassword = new ChangePassword
  submitted = false;
  changepasswordform!: FormGroup;

  constructor(private authentication: AuthenticationService, private fb: FormBuilder, private router: Router, @Optional() private ref: NbDialogRef<DialogComponent>, protected toast: ToastService) {

  }

  ngOnInit(): void {
    this.changepasswordform = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]],
      old_password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]]
    },
      {
        validators: this.mustMatch('password', 'old_password')

      }
    )

  }

  // changepasswordform = this.fb.group({
  //   password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]],
  //   old_password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]]
  // })

  get formControls() {
    return this.changepasswordform.controls;
  }

  changePassword() {
    this.submitted = true;
    this.changepassdObj.password = this.changepasswordform.value.password;
    this.changepassdObj.old_password = this.changepasswordform.value.old_password;

    this.authentication.updateUserPassword(this.changepassdObj).subscribe((res) => {
      if (res.message == "Password changed") {
        this.toast.success("Password changed successfully")
        this.changepasswordform.reset();
        this.router.navigateByUrl('/user-profile')
      }
    }, (err) => {
      this.toast.error("somwthing went wrong" + err)
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      }
      else {
        matchingControl.setErrors(null)
      }
    }

  }

}
