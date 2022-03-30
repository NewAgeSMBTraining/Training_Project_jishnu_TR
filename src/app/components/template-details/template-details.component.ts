import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { LoaderService } from 'src/app/loader.service';
import { ToastService } from 'src/app/toast.service';
import { Template } from 'src/app/model/template';
import { AngularEditorConfig } from '@kolkov/angular-editor';



@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.scss']
})
export class TemplateDetailsComponent implements OnInit {

  checked!: boolean;
  templateDetailsform!:FormGroup

  editorConfig: AngularEditorConfig = {
    sanitize: false,
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['undo', 'redo'],
      ['textColor', 'backgroundColor'],
      ['unlink', 'insertImage', 'insertVideo', 'insertHorizontalRule']
    ],
  };


  constructor(private fb:FormBuilder,private authentication: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,

    private loader: LoaderService,
    private toast: ToastService,) { }

  ngOnInit(): void {
    this.edit()
    this.templateDetailsform = this.fb.group({
      id: [''],
      name: [''],
      title: [''],
      send_email:[''],
      email_subject: [''],
      email_body: [''],
      send_sms:[''],
      sms_body: [''],

    })
  }

  edit(){
    
    this.authentication.template(this.route.snapshot.params['id']).subscribe((res)=>{
      console.log(res)

      this.templateDetailsform.controls['name'].setValue(res.data.template.name)
      this.templateDetailsform.controls['title'].setValue(res.data.template.title)
      // this.templateDetailsform.controls['send_email'].setValue(res.data.template.send_email)
      this.templateDetailsform.controls['email_subject'].setValue(res.data.template.email_subject)
      this.templateDetailsform.controls['email_body'].setValue(res.data.template.email_body)
      // this.templateDetailsform.controls['send_sms'].setValue(res.data.template.send_sms)
      this.templateDetailsform.controls['sms_body'].setValue(res.data.template.sms_body)
     
  
    })
    
  }

  updateDetails(){
    this.authentication.updatetemplateList(this.templateDetailsform.value, this.route.snapshot.params['id']).subscribe((res)=>{
      console.log(res);
      if(res.message=="Updated"){
        this.toast.primary("Data updated")
        this.router.navigateByUrl("/email-template-list")
      }
      
    },(err)=>{
      this.toast.error(err.error.message)
    })
  }

}
