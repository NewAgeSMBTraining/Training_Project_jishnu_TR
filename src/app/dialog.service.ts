import { Injectable } from '@angular/core';
import { NbDialogConfig, NbDialogRef, NbDialogService } from '@nebular/theme';
import { DialogData,DialogResponse } from './model/models/Models.model';
import { from, Observable } from 'rxjs';
import { DialogComponent } from './components/dialog/dialog.component'; 
@Injectable({
  providedIn: 'root'
})
export class DailogService {
  config = new NbDialogConfig({
    closeOnBackdropClick: false,
    autoFocus: true,
    hasBackdrop: true,
  })
  constructor(private dailogservice:NbDialogService) { }
  open(data?: DialogData): Observable<DialogResponse> {

    return this.dailogservice.open(DialogComponent, {
      ...this.config,
      context: {
        data: JSON.stringify(data)
      }
    }).onClose;
  }


  openRef(ref: any, data?: any): NbDialogRef<unknown> {
    return this.dailogservice.open(ref, {
      ...this.config,
      context: {
        data: JSON.stringify(data)
      }
    });
  }
}
