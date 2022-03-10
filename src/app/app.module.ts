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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    EmployeeListComponent,
    ForgotPasswordComponent,
    OtpSentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule,RouterModule, BrowserAnimationsModule
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
