import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { DialogComponent } from '../dialog/dialog.component';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogResponse } from 'src/app/model/models/Models.model';
import { ToastService } from 'src/app/toast.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userdetailsForm!: FormGroup;
  submitted = false;
  constructor(protected ref: NbDialogRef<DialogComponent>,
    private fb: FormBuilder,
    private authentication: AuthenticationService,
    private toast: ToastService) { }

  ngOnInit(): void {

    this.userdetailsForm = this.fb.group({

      id: [''],
      role_id: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
      phone_code: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{1,3}$')]],
      phone: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}$')]],
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]]
  
    })
  }

  dismiss(status: boolean) {
    let result: DialogResponse = { status: status, data: {} };
    this.ref.close(result);
  }

  get formControls() {
    return this.userdetailsForm.controls;
  }
  
  createUser(data: any) {
    this.submitted = true;

    const Object = {
      role_id: data.value.role_id,
      first_name: data.value.first_name,
      last_name: data.value.last_name,
      email: data.value.email,
      phone_code: data.value.phone_code,
      phone: data.value.phone,
      password: data.value.password,
    }

    if (this.userdetailsForm.valid) {


      this.authentication.postCreateUser(Object).subscribe((res: any) => {
        console.log(res);
        if (res.message == "Created") {
          this.toast.success("Created New User Successfully")
          this.userdetailsForm.reset();
         
        }

      }, (err) => {
        this.toast.error(err)
        // alert("something went wrong")
      })

    }

    
  }

}


