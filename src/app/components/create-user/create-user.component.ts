import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserDetailspage } from 'src/app/model/models/Models.model';
import { AuthenticationService } from 'src/app/authentication.service';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userdetailsForm = new FormGroup({
    employeeName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    designation: new FormControl("", [Validators.required]),
    grade: new FormControl("", [Validators.required]),
    division: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    middleName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    telephone: new FormControl("", [Validators.required]),
    mobile: new FormControl("", [Validators.required]),
    emergencyContact: new FormControl("", [Validators.required]),
    maritalStatus: new FormControl("", [Validators.required]),
    DOB: new FormControl("", [Validators.required]),
    nationality: new FormControl("", [Validators.required]),
    religion: new FormControl("", [Validators.required]),
    height: new FormControl("", [Validators.required]),
    weight: new FormControl("", [Validators.required]),
    Qualification: new FormControl("", [Validators.required]),
    dateOfJoining: new FormControl("", [Validators.required]),
    validPassport: new FormControl("", [Validators.required]),
    passportNumber: new FormControl("", [Validators.required]),
    validUpto: new FormControl("", [Validators.required]),
    role_id: new FormControl("", [Validators.required]),

  })
  userdetailsObj: UserDetailspage = new UserDetailspage;
  submitted =false;

  constructor(private fb: FormBuilder, private authentication: AuthenticationService) { }

  ngOnInit(): void {



  }


  // get f() { return this.userdetailsForm.controls; }

  createUser() {
    this.submitted=true;
    let userdetailsObj=this.userdetailsForm.value
    this.authentication.postCreateUser(userdetailsObj).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (err) => {
        console.log(err);
        alert("error")
      },
      complete: () => {
        console.log("complete");
        alert("user registration successful");
      }

    })

  }

}
