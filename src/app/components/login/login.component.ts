import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  LoginObj: Loginpage={};
  constructor(private fb: FormBuilder, private authentication: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      username: [''],
      password: ['']
    })


  }
  login() {
    this.submitted = true;
    this.LoginObj.username = this.loginform.value.username;
    this.LoginObj.password = this.loginform.value.password;
    if (this.loginform.invalid) {
      return;
  }
    this.authentication.postLogin(this.LoginObj).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (err) => {
        console.log(err);
        alert("error")
      },
      complete: () => {
        console.log("complete");
        alert("Login successful");
        this.router.navigate(['/employee-list']);
      }

    })

   
  }
}
