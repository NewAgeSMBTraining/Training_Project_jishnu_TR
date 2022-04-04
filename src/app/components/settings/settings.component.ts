import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Pagination, } from 'src/app/model/models/Models.model';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { SortableDirective,SortEvent } from 'src/app/directives/sortable.directive';
import { ToastService } from 'src/app/toast.service';
import { DailogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // settingsForm!: FormGroup;  
 
  submitted = false;
  templates: any = [];
  sort: SortEvent;

  pagination: Pagination = {
    page: 1,
    limit: environment.PAGINATION_LIMIT,
    count: 0,
  };

  constructor(private fb:FormBuilder,private authentication: AuthenticationService, private router: Router, private _route: ActivatedRoute, private _location: Location,
    private toast: ToastService,
    private dailog: DailogService,) { this.sort = new SortEvent({ column: 'created_at', direction: 'asc' });}

  ngOnInit(): void {
    this.getAllSetting();
  }

  // settingsForm = this.fb.group({  

  //   id: [''],
  //   name: [''],
  //   display_name: [''],
  //   value: [''],
    
   
    
  // });

  getAllSetting(){
    this.authentication.getSettingsList().subscribe((res)=>{
      this.templates = res.data.templates
      console.log(res);
      
    })
  }

  

 

}
