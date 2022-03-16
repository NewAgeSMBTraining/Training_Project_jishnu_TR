import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserDetailspage } from 'src/app/model/models/Models.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  userData:any[]=[];
  userdetailsObj: UserDetailspage = new UserDetailspage
  // userdetailsForm!: FormGroup;
  submitted = false;
  searchValue! : string;
  //  userData : user = []
  first_name :any;


  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router) { }
  totalLength :any;
  p:number=1;
  


 
  ngOnInit(): void {
    this.getUser();
   
  }

  userdetailsForm = this.fb.group({

    id: [''],
    role_id: ['', [Validators.required]],
    first_name: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
    last_name: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
    email: ['', [Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
    phone_code: ['', [Validators.required,Validators.pattern('^\\+?[0-9]{1,3}$')]],
    phone: ['', [Validators.required,Validators.pattern('[6-9]\\d{9}$')]],
    password: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9]{6,10}$')]]

  })

  getUser(){
    this.authentication.getGetUser().subscribe(data=>{
      console.log(data)
      this.userData=data;
      this.totalLength =data.length;
    })

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
        this.userdetailsForm.reset();
        this.getUser();
      }

    }, (err) => {
      console.log(err);
      // alert("something went wrong")
    })

  }

  updateDetails(data: any) {

   
    this.userdetailsForm.controls["role_id"].setValue(data.role_id)
    this.userdetailsForm.controls["first_name"].setValue(data.first_name)
    this.userdetailsForm.controls["last_name"].setValue(data.last_name)
    this.userdetailsForm.controls["email"].setValue(data.email)
    this.userdetailsForm.controls["phone_code"].setValue(data.phone_code)
    this.userdetailsForm.controls["phone"].setValue(data.phone)
    this.userdetailsForm.controls["password"].setValue(data.password)
    this.userdetailsObj.id = data.id;

  }

  updateUser() {
    this.submitted = true;

    this.userdetailsObj.role_id = this.userdetailsForm.value.role_id;
    this.userdetailsObj.first_name = this.userdetailsForm.value.first_name;
    this.userdetailsObj.last_name = this.userdetailsForm.value.last_name;
    this.userdetailsObj.email = this.userdetailsForm.value.email;
    this.userdetailsObj.phone_code = this.userdetailsForm.value.phone_code;
    this.userdetailsObj.phone = this.userdetailsForm.value.phone;

    this.authentication.putEditUser(this.userdetailsObj,this.userdetailsObj.id).subscribe((res) => {
      console.log(res);
      if (res.message == "Updated") {
        alert("User Details updated successfully")
        this.getUser();

      }
    })


  }

  deleteDetails(data: any) {
    this.authentication.deleteDeleteUser(data.id).subscribe((res) => {
      console.log(res);
      if (res.message == "Deleted") {
        alert("User details deleted successfully")
        this.getUser();
      }
    }, (err) => {
      alert("Error" + err)
    })
  }

  logoutUser(){
    alert("signout successfully")
    this.router.navigateByUrl('/login')
  }

  search(){
    if(this.first_name == "")
    {
      this.ngOnInit();
    }
    else{
      this.userData = this.userData.filter((res : any)=>{
        return res.first_name.toLocaleLowerCase().match(this.first_name.toLocaleLowerCase())
      })
    }
  }

}
