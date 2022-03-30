import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { LoaderService } from 'src/app/loader.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-cms-management-list',
  templateUrl: './cms-management-list.component.html',
  styleUrls: ['./cms-management-list.component.scss']
})
export class CmsManagementListComponent implements OnInit {

  templates: any = [];

  constructor(private authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    private toast: ToastService) { }

  ngOnInit(): void {

    this.getCMSList();
  }

  getCMSList(){
    this.authentication.cmsList().subscribe((res)=>{
      this.templates = res.data.pages
      console.log(res);
      
    })
  }

  logoutUser(){
    this.toast.info("signout successfully")
    this.router.navigateByUrl('/login')
  }

}
