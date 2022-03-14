import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserDetailspage } from 'src/app/model/models/Models.model';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userdetailsForm!: FormGroup;

  
  submitted = false;

  userdetailsObj: UserDetailspage = new UserDetailspage

  constructor(private fb: FormBuilder, private authentication: AuthenticationService) { }

  ngOnInit(): void {

    // this.userdetailsForm = this.fb.group({

    //   id: [0],
    //   role_id: ['', [Validators.required]],
    //   first_name: ['', [Validators.required]],
    //   last_name: ['', [Validators.required]],
    //   email: ['', [Validators.required]],
    //   phone_code: ['', [Validators.required]],
    //   phone: ['', [Validators.required]],
    //   password: ['', [Validators.required]],
    // },
    // {

    

    // })

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

    this.authentication.postCreateUser(Object).subscribe((res: any) => {
      console.log(res);
      if (res.message == "Created") {
        alert("Created New User Successfully")
      }

    }, (err) => {
      console.log(err);
      alert("something went wrong")
    })

  }
}
