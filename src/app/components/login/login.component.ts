import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service'; 
import { Loginpage } from 'src/app/model/models/Models.model';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform!:FormGroup;
  LoginObj: Loginpage = new Loginpage;
  constructor(private fb:FormBuilder, private authentication:AuthenticationService) { }

  ngOnInit(): void {
    this.loginform=this.fb.group({
      email:[''],
      password:['']
    })

   
  }
  login(){
    this.LoginObj.email = this.loginform.value.email;
    this.LoginObj.password = this.loginform.value.password;
    this.authentication.postLogin(this.LoginObj).subscribe({next:(data)=>{
      console.log(data);
      
    },
  error:(err)=>{
    console.log(err);
    alert("error")
  },
  complete:()=>{
    console.log("complete");
    alert("Login successful");
  }

  })

  }
}
