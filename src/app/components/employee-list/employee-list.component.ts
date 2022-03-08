import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  userData:any=[];

  constructor(private authentication: AuthenticationService) { }



  ngOnInit(): void {
    
    this.authentication.getGetUser().subscribe(data=>{
      console.log(data)
      this.userData=data;
    })
  }

}
