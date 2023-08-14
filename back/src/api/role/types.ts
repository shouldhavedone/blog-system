/**
 * 标签查询参数
 */
export interface BlogTagQuery extends PageQuery {
  keywords?: string;
}

/**
 * 标签分页对象
 */
export interface BlogTagPageVO {
  /**
   * 标签ID
   */
  id?: number;
  /**
   * 标签名称
   */
  name?: string;
  /**
   * 描述
   */
  desc?: string;
  /**
   * 标签状态
   */
  status?: number;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 修改时间
   */
  updateTime?: Date;
}

/**
 * 标签分页
 */
export type BlogTagPageResult = PageResult<BlogTagPageVO[]>;

/**
 * 标签表单对象
 */
export interface BlogTagForm {
  /**
   * ID
   */
  id?: number;

  /**
   * 描述
   */
  desc: string;
  /**
   * 数据权限
   */
  dataScope?: number;

  /**
   * 标签名称
   */
  name: string;
  /**
   * 标签状态(1-正常；0-停用)
   */
  status?: number;
}
