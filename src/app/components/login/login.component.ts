import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Loginpage } from 'src/app/model/models/Models.model';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  submitted = false;
  loading = false;
  LoginObj: Loginpage = {
  };
  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: ['',[Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
      password: ['',[Validators.required,Validators.pattern('^[A-Za-z0-9]{6,10}$')]]
    })
    // this.title = JSON.parse(localStorage.getItem('Token')!);;


  }

  get formControls() {
    return this.loginform.controls;
  }


  // title !:string;
  //  Authorization!:string;
  login(data: any) {
    this.submitted = true;
    // this.title="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2MjI1Yzg4Y2Y0ZDZmMjA4NjQxMmJkYTciLCJ1c2VySWQiOjEsImlhdCI6MTY0NjY0MzM0MCwiZXhwIjoxNjQ2NzI5NzQwfQ.eKWCc3-P4T9vP-LDhRp6-G9ixXErqAEqWVN58iYRBio"
    // localStorage.setItem("Authorization",this.title)

    const Object = {
      username: data.value.username,
      password: data.value.password
    }

    //   if (this.loginform.invalid) {
    //     return;
    // }
    this.authentication.postLogin(Object).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('Authorization', 'Bearer ' + res.data.token)

        // if (res.message == "Login Success") {
          alert("login successfully")
          this.router.navigate(['/employee-list']);

        // }

        // else {
        //   alert("no data found")
        // }

      },
      (err) => {
        console.log(err);
        alert("error")

      })

  }
}
