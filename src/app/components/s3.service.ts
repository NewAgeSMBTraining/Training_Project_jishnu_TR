import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';
import { makeUID } from 'src/app/util.function'
import { s3UploadCustomeFile } from 'src/app/model/s3';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  constructor() { }
  upload({ file, options = {} }: { file: s3UploadCustomeFile; options?: S3.ManagedUpload.ManagedUploadOptions; }): S3.ManagedUpload {
    const contentType = file.file?.type;
    const bucket = new S3({
      accessKeyId: environment.S3_ACCESS_KEY_ID,
      secretAccessKey: environment.S3_SECRET_ACCESS_KEY_ID,
      region: environment.S3_REGION,
    });
    const params: S3.PutObjectRequest = {
      Bucket: environment.S3_BUCKET_NAME,
      Key: file?.file_name ? file.file_name + '_' + makeUID(5)  + '.' + file.type : Date.now().toString() + '_' + makeUID(5) + '.' + file.type,
      Body: file.file,
      ACL: 'public-read',
      ContentType: contentType
    };
    return bucket.upload(params, options);
  }
}
