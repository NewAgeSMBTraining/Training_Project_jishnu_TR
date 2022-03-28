import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { LoaderService } from 'src/app/loader.service';
import { ToastService } from 'src/app/toast.service' ;
import { Template } from 'src/app/model/template';


@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss']
})
export class TemplateDetailsComponent implements OnInit {

  constructor(private authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loader: LoaderService,
    private toast: ToastService,) { }

  ngOnInit(): void {
  }

}
