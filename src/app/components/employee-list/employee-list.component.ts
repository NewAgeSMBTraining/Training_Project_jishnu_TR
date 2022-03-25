import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserDetailspage, Pagination, UserFilter, DialogResponse } from 'src/app/model/models/Models.model';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { ToastService } from 'src/app/toast.service';
import { DailogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  userData: any[] = [];
  userdetailsObj: UserDetailspage = new UserDetailspage
  // userdetailsForm!: FormGroup;
  submitted = false;
  // searchValue! : string;
  //  userData : user = []
  first_name: any;

  search?: string = '';
  filters: UserFilter = {
    active: '',
    role_id: {
      $notIn: [1],
    },
  };


  pagination: Pagination = {
    page: 1,
    limit: environment.PAGINATION_LIMIT,
    count: 0,
  };


  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private router: Router, private _route: ActivatedRoute, private _location: Location,
    private toast:ToastService,
    private dailog:DailogService,) { }
  // totalLength :any;
  // p:number=1;




  ngOnInit(): void {
    this.getUser();
    // this._route.queryParams.subscribe((params) => {
    //   this.search = params.search ?? '';
    //   this.filters.active = params.active || '';
    //   this.pagination.page = params['page'] ? +params['page'] : 1;
    //   this.pagination.count = this.pagination.page * this.pagination.limit;
    //   this.getUser();
    // });


  }
  
  
  userdetailsForm = this.fb.group({

    id: [''],
    role_id: ['', [Validators.required]],
    first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
    phone_code: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{1,3}$')]],
    phone: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}$')]],
    password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,10}$')]]

  })

  changePage(page: number): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        page: page,
        search: this.search || '',
        active: this.filters.active || '',
      },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
    this._location.replaceState(urlTree.toString());
    this.getUser();
  }

  async getUser(): Promise<void> {
    // this.authentication.getGetUser().subscribe(data=>{
    //   console.log(data)
    //   this.userData=data;
    //   this.totalLength =data.length;
    // })
    const offset = (this.pagination.page - 1) * this.pagination.limit;
    const { error, data, message } =
      await this.authentication.getGetUser('user', {
        // where: convertFilterToWhere(this.filters),
        search: this.search,
        offset,
        limit: this.pagination.limit,
        populate: ['role'],
      });
    if (!!error) {
      return message;

    }
    this.pagination.count = data?.count || 0;
    this.userData = data?.users || []

    console.log(data);

  }


  get formControls() {
    return this.userdetailsForm.controls;
  }

  createuser(){
    this.dailog.openRef(UserCreateComponent).onClose.subscribe(()=>{
      this.getUser()
    })
  }

  updateuser(data:any){
    this.dailog.openRef(UserUpdateComponent, data).onClose.subscribe(()=>{
      this.getUser()
      
      
    })
           
  }

  // createUser(data: any) {
  //   this.submitted = true;

  //   const Object = {
  //     role_id: data.value.role_id,
  //     first_name: data.value.first_name,
  //     last_name: data.value.last_name,
  //     email: data.value.email,
  //     phone_code: data.value.phone_code,
  //     phone: data.value.phone,
  //     password: data.value.password,
  //   }

  //   if (this.userdetailsForm.valid) {


  //     this.authentication.postCreateUser(Object).subscribe((res: any) => {
  //       console.log(res);
  //       if (res.message == "Created") {
  //         alert("Created New User Successfully")
  //         this.userdetailsForm.reset();
  //         this.getUser();
  //       }

  //     }, (err) => {
  //       console.log(err);
        
  //     })

  //   }
  // }

    // updateDetails(data: any) {


    //   this.userdetailsForm.controls["role_id"].setValue(data.role_id)
    //   this.userdetailsForm.controls["first_name"].setValue(data.first_name)
    //   this.userdetailsForm.controls["last_name"].setValue(data.last_name)
    //   this.userdetailsForm.controls["email"].setValue(data.email)
    //   this.userdetailsForm.controls["phone_code"].setValue(data.phone_code)
    //   this.userdetailsForm.controls["phone"].setValue(data.phone)
    //   this.userdetailsForm.controls["password"].setValue(data.password)
    //   this.userdetailsObj.id = data.id;

    // }

    // updateUser() {
    //   this.submitted = true;

    //   this.userdetailsObj.role_id = this.userdetailsForm.value.role_id;
    //   this.userdetailsObj.first_name = this.userdetailsForm.value.first_name;
    //   this.userdetailsObj.last_name = this.userdetailsForm.value.last_name;
    //   this.userdetailsObj.email = this.userdetailsForm.value.email;
    //   this.userdetailsObj.phone_code = this.userdetailsForm.value.phone_code;
    //   this.userdetailsObj.phone = this.userdetailsForm.value.phone;

    //   this.authentication.putEditUser(this.userdetailsObj, this.userdetailsObj.id).subscribe((res) => {
    //     console.log(res);
    //     if (res.message == "Updated") {
    //       alert("User Details updated successfully")
    //       this.getUser();

    //     }
    //   })


    // }



    deleteDetails(data: any) {
      this.dailog.open({text:'Are you sure you want to delete?'})
      .subscribe((result:DialogResponse)=>{
        
          if(result.status==true){ 
            this.authentication.deleteDeleteUser(data.id).subscribe((res) => {
             console.log(res);
            if (res.message == "Deleted") {
              this.toast.info("User details deleted successfully")
              this.getUser();
            }}, (err) => {
              this.toast.error("Error" + err)
            })}
       
    })}

    logoutUser(){
      this.toast.info("signout successfully")
      this.router.navigateByUrl('/login')
    }


  }


