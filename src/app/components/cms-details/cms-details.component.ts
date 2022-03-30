import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toast.service';
import { LoaderService } from 'src/app/loader.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-cms-details',
  templateUrl: './cms-details.component.html',
  styleUrls: ['./cms-details.component.scss']
})
export class CmsDetailsComponent implements OnInit {

  cmsdetailsForm!:FormGroup ;
  checked!: boolean;
  Obj: any;


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
    this.cmsdetailsForm = this.fb.group({
      id:[''],
      name:[''],
      title:[''],
      content:[''],
      allow_html:['']
    })
  }

  edit(){
    this.authentication.cmstemplate(this.route.snapshot.params['id']).subscribe((res)=>{
     console.log(res)
     this.Obj = res.data.page
     this.cmsdetailsForm.controls['name'].setValue(this.Obj.name)
     this.cmsdetailsForm.controls['title'].setValue(this.Obj.title)
     this.cmsdetailsForm.controls['content'].setValue(this.Obj.content)
      
    })
  }
  cmsdetailsUpdate(){
    this.authentication.cmsupdatedlist(this.cmsdetailsForm.value,this.route.snapshot.params['id']).subscribe((res)=>{
      console.log(res);
     
      if(res.message=="Updated"){
        
        this.toast.primary("Updated")
        this.router.navigateByUrl("/cms-management-list")
        
      }
      
    },(err)=>{
      this.toast.error(err.error.message)
    })
  }

  CreateNew(cmsdetailsForm:any){
    const data ={
      name:cmsdetailsForm.value.name,
      title:cmsdetailsForm.value.title,
      content:cmsdetailsForm.value.content,
      allow_html:cmsdetailsForm.value.allow_html
    }
   this.authentication.createCmsRecord(data).subscribe((res)=>{
     console.log(res);
     if(res.message == "Created")
     {
       this.toast.primary("Page added")
       this.cmsdetailsForm.reset()
       this.router.navigateByUrl("/cms-management-list")    
     }
     
   },(err)=>{
     this.toast.error(err.error.message)
   })
  }

}
