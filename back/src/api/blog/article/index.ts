import { AxiosPromise } from 'axios';
import request from '@/utils/request';

/**
 * 文件上传
 *
 * @param queryParams
 */
export function uploadFile(data: FormData) {
  return request({
    url: '/api/v1/files/upload',
    method: 'post',
    data,
    headers: {
      "Content-Type": 'multipart/form-data',
    }
  });
}
