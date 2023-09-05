import { AxiosPromise } from 'axios';
import { BlogTagForm, BlogTagQuery, BlogTagVO, BlogTagOption } from './types';
import request from '@/utils/request';

/**
 * 标签树形表格
 *
 * @param queryParams
 */
export function listBlogTags(queryParams?: BlogTagQuery): AxiosPromise<BlogTagVO[]> {
  return request({
    url: '/api/v1/blog/tag/page',
    method: 'get',
    params: queryParams
  });
}

/**
 * 获取标签详情
 *
 * @param id
 */
export function getBlogTagForm(id: number): AxiosPromise<BlogTagForm> {
  return request({
    url: '/api/v1/blog/tag/' + id + '/form',
    method: 'get'
  });
}

/**
 * 新增标签
 *
 * @param data
 */
export function addBlogTag(data: BlogTagForm) {
  return request({
    url: '/api/v1/blog/tag',
    method: 'post',
    data: data
  });
}

/**
 *  修改标签
 *
 * @param id
 * @param data
 */
export function updateBlogTag(id: number, data: BlogTagForm) {
  return request({
    url: '/api/v1/blog/tag/' + id,
    method: 'put',
    data: data
  });
}

/**
 * 删除标签
 *
 * @param ids
 */
export function deleteBlogTag(ids: string) {
  return request({
    url: '/api/v1/blog/tag/' + ids,
    method: 'delete'
  });
}

/**
 * 标签下拉列表
 */
export function listTagOptions(): AxiosPromise<BlogTagOption[]> {
  return request({
    url: '/api/v1/blog/tag/options',
    method: 'get'
  });
}
