import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [ 
  { path:'',redirectTo:'login' ,pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'create-user', component:CreateUserComponent},
  {path:'employee-list', component:EmployeeListComponent},
  {path:'forgot-password', component:ForgotPasswordComponent} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
