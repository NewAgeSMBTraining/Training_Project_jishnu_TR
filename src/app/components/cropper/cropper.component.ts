import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/toast.service';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {

  @Input() image: string | undefined;
  @Output() imageChanged = new EventEmitter<Object>();
  showCropper = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: any;
  constructor(
    private _toast: ToastService
  ) { }

  ngOnInit(): void {
    this.croppedImage = this.image;
  }
  async fileChangeEvent(event: any) {
    if (!event.target.files?.length) return;
    this.imageChangedEvent = event;
    this.showCropper = true;
    this.croppedImage = await this.getBase64(event.target.files[0])
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  base64ToFile(data: any, filename: any) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  loadImageFailed() {
    this._toast.error('Upload a valid image file');
    this.showCropper = false;
  }

  cropperCancel() {
    this.showCropper = false;
  }

  cropperSave() {
    this.image = this.croppedImage;
    this.file = base64ToFile(this.croppedImage);
    let data = {
      image: this.croppedImage,
      file: this.file
    }
    this.imageChanged.emit(data);
    this.showCropper = false;
  }




  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
