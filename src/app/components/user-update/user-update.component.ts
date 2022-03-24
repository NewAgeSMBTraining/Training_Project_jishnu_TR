import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserDetailspage } from 'src/app/model/models/Models.model';
import { DialogResponse } from 'src/app/model/models/Models.model';
import { NbDialogRef } from '@nebular/theme';
import { ToastService } from 'src/app/toast.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DailogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  data: any;
  userdetailsObj: UserDetailspage = new UserDetailspage
  userupdateForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private ref: NbDialogRef<DialogComponent>,
    private toast: ToastService,
    private dailog: DailogService,) { }

  ngOnInit(): void {

    this.userupdateForm = this.fb.group({

      id: [''],
      role_id: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
      phone_code: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{1,3}$')]],
      phone: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}$')]],
      

    });
    let userupdate = JSON.parse(this.data)

    if (userupdate) {
      this.userupdateForm.controls['role_id'].setValue(userupdate.role_id)
      this.userupdateForm.controls['first_name'].setValue(userupdate.first_name)
      this.userupdateForm.controls['last_name'].setValue(userupdate.last_name)
      this.userupdateForm.controls['email'].setValue(userupdate.email)
      this.userupdateForm.controls['phone_code'].setValue(userupdate.phone_code)
      this.userupdateForm.controls['phone'].setValue(userupdate.phone)
      this.userdetailsObj.id = userupdate.id
    }

  }

  get formControls() {
    return this.userupdateForm.controls;
  }
  dismiss(status: boolean) {
    let result: DialogResponse = { status: status, data: {} };
    this.ref.close(result);
  }



  updateUser() {
    this.submitted = true;

    this.authentication.putEditUser(this.userupdateForm.value, this.userdetailsObj.id).subscribe((res) => {
      console.log(res);
      if (res.message == "Updated") {
        this.toast.success("User Details updated successfully")

      }
    }, (err) => {
      this.toast.error(err)

    })


  }
}


