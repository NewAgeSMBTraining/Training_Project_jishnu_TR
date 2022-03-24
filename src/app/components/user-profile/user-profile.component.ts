import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import {  UserProfilespage} from 'src/app/model/models/Models.model';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  loggedUserData: any =[];
 
  userprofileObj: UserProfilespage = new UserProfilespage

 
  
  submitted = false;
  

  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router, private _route: ActivatedRoute, private _location: Location,) { }

  ngOnInit(): void {

    this.UserProfile()
  }

  

  userprofileForm=this.fb.group({
    id: [''],
    role_id: [''],
    first_name: [''],
    last_name: [''],
    full_name:[''],
    email:[''],
    phone_code: [''],
    phone: [''],
   
    
  })

  get formControls() {
    return this.userprofileForm.controls;
  }

  UserProfile(){
    
    this.authentication.userLoginDetails().subscribe((res)=>{
     
      this.loggedUserData = res;
      console.log(this.loggedUserData);
      
    },(err)=>{
      alert(err)
    })
  }
  edit(data:any){
   
  
    this.userprofileForm.controls["role_id"].setValue(data.role_id)
    this.userprofileForm.controls["first_name"].setValue(data.first_name)
    this.userprofileForm.controls["last_name"].setValue(data.last_name)
    this.userprofileForm.controls["email"].setValue(data.email)
    this.userprofileForm.controls["phone_code"].setValue(data.phone_code)
    this.userprofileForm.controls["phone"].setValue(data.phone)
    
  }
  
  updateUserData() {
  
    this.userprofileObj.role_id = this.userprofileForm.value.role_id;
    this.userprofileObj.first_name = this.userprofileForm.value.first_name;
    this.userprofileObj.last_name = this.userprofileForm.value.last_name;
    this.userprofileObj.email = this.userprofileForm.value.email;
    this.userprofileObj.phone_code = this.userprofileForm.value.phone_code;
    this.userprofileObj.phone = this.userprofileForm.value.phone;
  
    this.authentication.updateuserLoginDetails(this.userprofileObj).subscribe((res) => {
      if (res.message == "Updated") {
        alert("User Profile updated successfully")
        this.UserProfile()
      }    
    },(err)=>{
      alert("error" + err)
    })
  
  }

  logoutUser(){
    alert("signout successfully")
    this.router.navigateByUrl('/login')
  }

  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }

  // imageChanged(event: any) {
  //   this.s3File = {
  //     file: event.file,
  //     type: event.file?.type?.split('/').pop() || '',
  //     file_name: toEntityString(this.user?.full_name || "")
  //   }
  // }  
  

}
