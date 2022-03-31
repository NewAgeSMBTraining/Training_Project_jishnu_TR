import * as S3 from 'aws-sdk/clients/s3';
export interface S3Response {
  Bucket?: string;
  ETag?: string;
  Key?: string;
  Location?: string;
}

export interface s3UploadCustomeFile {
  file?: any;
  file_name?: string;
  type?: string;
  s3File?: S3Response
}
