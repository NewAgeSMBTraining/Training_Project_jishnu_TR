import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserDetailspage } from 'src/app/model/models/Models.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userdetailsForm!:FormGroup;
  userdetailsObj: UserDetailspage = new UserDetailspage;

  constructor() { }

  ngOnInit(): void {
  }

}
