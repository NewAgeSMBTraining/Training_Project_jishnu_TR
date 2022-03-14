import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class KeyPessValidations{
    keyPressAlpha(event:any){
        let k;
        document.all ? k=event.keyCode : k=event.which;
        
    }
}