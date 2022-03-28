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

  templates: Template[] = [];
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
    this.route.queryParams.subscribe(params => {
      this.search = params.search ?? "";
      this.pagination.page = params.page ? +params.page : 1;
      this.pagination.count = this.pagination.page * this.pagination.limit;
      this.getTemplates();
    });

    
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput?.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.changeFilter();
        })
      )
      .subscribe();
  }

  changePage(page?: number): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        page: page,
        search: this.search || "",
      },
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
    this.location.replaceState(urlTree.toString());
    this.getTemplates();
  }

  changeFilter(): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        page: null,
        search: this.search || "",
      },
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
    this.location.replaceState(urlTree.toString());
    this.getTemplates();
  }


  clearFilter() {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        page: null,
        search: '',
      },
      queryParamsHandling: 'merge',
      preserveFragment: true
    });
    this.location.replaceState(urlTree.toString());
    this.search = ''
    this.getTemplates()
  }

  async getTemplates(): Promise<void> {
    this.loader.show();
    const offset = (this.pagination.page - 1) * this.pagination.limit;
    const { error, data, message } = await this.authentication.getAll('template', {
      // where: convertFilterToWhere(this.filters),
      search: this.search,
      offset,
      limit: this.pagination.limit,
      sort: [this.sort.sort()]
    });
    this.loader.hide();
    if (!!error) {
      this.toast.error(message);
      return;
    }
    this.pagination.count = data?.count || 0;
    this.templates = data?.templates || [];
  }

}
