import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  status: boolean = false;
  message: string = '';

  show(message?: string): void {
    this.message = message || '';
    this.status = true;
  }

  hide(): void {
    this.status = false;
  }
}
