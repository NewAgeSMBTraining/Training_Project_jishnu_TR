import { Component, OnInit } from '@angular/core';
import { ElementRef,QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortableDirective,SortEvent } from 'src/app/directives/sortable.directive';
import { Pagination } from 'src/app/model/models/Models.model';
import { Template,TemplateFilter } from 'src/app/model/template';
import { AuthenticationService } from 'src/app/authentication.service';
import { LoaderService } from 'src/app/loader.service';
import { ToastService } from 'src/app/toast.service' ;
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
// import { convertFilterToWhere } from 'src/app/helpers/helpers.function';
import { from, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
// import { convertFilterToWhere } from 'src/app/helpers.function';

@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.scss']
})
export class EmailTemplateListComponent implements OnInit {

  templates: any[] = [];
  search?: string = '';
  filters: TemplateFilter = {};
  sort: SortEvent;
  pagination: Pagination = {
    page: 1,
    limit: environment.PAGINATION_LIMIT,
    count: 0,
  };
  searchInput: any;

  constructor(private authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loader: LoaderService,
    private toast: ToastService,) {
      this.sort = new SortEvent({ column: 'created_at', direction: 'asc' });
    }

  ngOnInit(): void {
    this.getList();
    

  }

 
  getList(){
    this.authentication.templateList().subscribe((res)=>{
      this.templates = res.data.templates
      console.log(res);
      
    })
  }
  
}
