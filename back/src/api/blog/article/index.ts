import { AxiosPromise } from 'axios';
import request from '@/utils/request';
import { BlogArticlePageResult, BlogArticleQuery, BlogArticleEdit } from './types';

/**
 * 分页列表
 *
 * @param queryParams
 */
export function getBlogArticlePage(queryParams: BlogArticleQuery): AxiosPromise<BlogArticlePageResult> {
  return request({
    url: '/api/v1/blog/article/page',
    method: 'get',
    params: queryParams
  });
}

/**
 * 新增标签
 *
 * @param data
 */
export function addBlogArticle(data: any) {
  return request({
    url: '/api/v1/blog/article',
    method: 'post',
    data: data
  });
}

/**
 * 获取详情
 *
 * @param id
 */
export function getBlogArticleForm(id: number | string): AxiosPromise<BlogArticleEdit> {
  return request({
    url: '/api/v1/blog/article/' + id + '/form',
    method: 'get'
  });
}

/**
 * 删除
 *
 * @param ids
 */
export function deleteBlogArticle(ids: string) {
  return request({
    url: '/api/v1/blog/article/' + ids,
    method: 'delete'
  });
}


/**
 * 修改状态
 *
 * @param id
 * @param status
 */
export function updateStatus(id: number, status: number) {
  return request({
    url: '/api/v1/blog/article/' + id + '/status',
    method: 'patch',
    params: { status: status }
  });
}