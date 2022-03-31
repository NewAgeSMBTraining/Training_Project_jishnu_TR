import { S3 } from './s3';

describe('S3', () => {
  it('should create an instance', () => {
    expect(new S3()).toBeTruthy();
  });
});
