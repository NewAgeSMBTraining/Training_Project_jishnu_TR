import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { LoaderService } from 'src/app/loader.service';
import { DialogResponse } from 'src/app/model/models/Models.model';
import { ToastService } from 'src/app/toast.service';
import { DailogService } from 'src/app/dialog.service';

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
    private toast: ToastService, private dailog: DailogService) { }

  ngOnInit(): void {

    this.getCMSList();
  }

  getCMSList(){
    this.authentication.cmsList().subscribe((res)=>{
      this.templates = res.data.pages
      console.log(res);
      
    })
  }

  deleteDetails(data: any) {
    this.dailog.open({ text: 'Are you sure you want to delete?' })
      .subscribe((result: DialogResponse) => {

        if (result.status == true) {
          this.authentication.deleteCMSdata(data.id).subscribe((res) => {
            console.log(res);
            if (res.message == "Deleted") {
              this.toast.info("CMS details deleted successfully")
              this.getCMSList();;
            }
          }, (err) => {
            this.toast.error("Error" + err)
          })
        }

      })
  }

  logoutUser(){
    this.toast.info("signout successfully")
    this.router.navigateByUrl('/login')
  }

}
