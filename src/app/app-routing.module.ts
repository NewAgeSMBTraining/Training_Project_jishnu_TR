import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsDetailsComponent } from './components/cms-details/cms-details.component';
import { CmsManagementListComponent } from './components/cms-management-list/cms-management-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EmailTemplateListComponent } from './components/email-template-list/email-template-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ReserPasswordComponent } from './components/reser-password/reser-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TemplateDetailsComponent } from './components/template-details/template-details.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [ 
  { path:'',redirectTo:'login' ,pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'create-user', component:CreateUserComponent},
  {path:'employee-list', component:EmployeeListComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'otp-verification', component:OtpVerificationComponent},
  {path:'reser-password', component:ReserPasswordComponent} ,
  {path:'user-profile', component:UserProfileComponent},
  {path:'update-password', component:UpdatePasswordComponent},
  {path:'email-template-list', component:EmailTemplateListComponent},
  {path:'template-details/:id', component:TemplateDetailsComponent},
  {path:'cms-management-list', component:CmsManagementListComponent},
  {path:'cms-details/:id', component:CmsDetailsComponent},
  {path:'cms-details', component:CmsDetailsComponent},
  {path:'cms-management-list/:id', component:CmsManagementListComponent},
  {path:'settings', component:SettingsComponent},
  {path:'settings/:id', component:SettingsComponent},
  

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
