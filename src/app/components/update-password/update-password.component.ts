import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from 'src/app/model/models/Models.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  changepassdObj: ChangePassword = new ChangePassword
  submitted = false;

  constructor(private authentication: AuthenticationService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
  }

  changepasswordform = this.fb.group({
    password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]],
    old_password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]]
  })

  get formControls() {
    return this.changepasswordform.controls;
  }

  changePassword() {
    this.submitted = true;
    this.changepassdObj.password = this.changepasswordform.value.password;
    this.changepassdObj.old_password = this.changepasswordform.value.old_password;

    this.authentication.updateUserPassword(this.changepassdObj).subscribe((res) => {
      if (res.message == "Password changed") {
        alert("Password changed successfully")
        this.changepasswordform.reset();
        this.router.navigateByUrl('/user-profile')
      }
    }, (err) => {
      alert("Error" + err)
    })
  }

}
