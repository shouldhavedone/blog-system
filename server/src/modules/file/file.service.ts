import { Injectable } from "@nestjs/common";
import * as qiniu from 'qiniu';
import qiniuConfig from '../../config/qiniu.config'

@Injectable()
export class FileService {
  private readonly qiniuMac: qiniu.auth.digest.Mac;
  private readonly qiniuPutPolicy: qiniu.rs.PutPolicy;
  private readonly qiniuUploadToken: string;

  constructor() {
    this.qiniuMac = new qiniu.auth.digest.Mac(qiniuConfig.key.accessKey, qiniuConfig.key.secretKey)
    this.qiniuPutPolicy = new qiniu.rs.PutPolicy(qiniuConfig.option)
    this.qiniuUploadToken = this.qiniuPutPolicy.uploadToken(this.qiniuMac)
  }

  /**
   * 上传凭证
   */
  async getUplaodToken() {
    return this.qiniuUploadToken
  }

  /**
   * 上传文件
   */
  async uploadFile(filename: string, buffer: string): Promise<string> {
    const formUploader = new qiniu.form_up.FormUploader();
    const putExtra = new qiniu.form_up.PutExtra();
    return new Promise<string>((resolve, reject) => {
      formUploader.put(
        this.qiniuUploadToken,
        filename,
        buffer,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            reject(respErr);
          }
          if (respInfo.statusCode === 200) {
            const fileUrl = `http://${qiniuConfig.domain}/${filename}`;
            resolve(fileUrl);
          } else {
            reject(respBody);
          }
        }
      );
    });
  }

}