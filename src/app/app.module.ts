import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OtpSentComponent } from './components/otp-sent/otp-sent.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ReserPasswordComponent } from './components/reser-password/reser-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { NbThemeModule,NbAlertModule } from '@nebular/theme';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { NbLayoutModule, NbToastrModule, NbDialogModule, NbCardModule } from '@nebular/theme';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { EmailTemplateListComponent } from './components/email-template-list/email-template-list.component';
import { SortableDirective } from './directives/sortable.directive';
import { TemplateDetailsComponent } from './components/template-details/template-details.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    EmployeeListComponent,
    ForgotPasswordComponent,
    OtpSentComponent,
    OtpVerificationComponent,
    ReserPasswordComponent,
    UserProfileComponent,
    UpdatePasswordComponent,
    DialogComponent,
    UserCreateComponent,
    UserUpdateComponent,
    EmailTemplateListComponent,
    SortableDirective,
    TemplateDetailsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule,RouterModule, BrowserAnimationsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,NgbModule,NgbPaginationModule, NbThemeModule.forRoot({name:'default'}),NbAlertModule,
    
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbCardModule,NbLayoutModule
    
    
    
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
