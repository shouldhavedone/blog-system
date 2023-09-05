/**
 * 标签查询参数
 */
export interface BlogTagQuery {
  keywords?: string;
  status?: number;
}

/**
 * 标签类型
 */
export interface BlogTagVO {
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * ID
   */
  id?: number;
  /**
   * 名称
   */
  name?: string;
  /**
   * 描述
   */
  desc?: string;
  /**
   * 状态(1:启用；0:禁用)
   */
  status?: number;
  /**
   * 修改时间
   */
  updateTime?: Date;
}

/**
 * 标签表单类型
 */
export interface BlogTagForm {
  /**
   * 标签ID(新增不填)
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
   * 状态(1:启用；0：禁用)
   */
  status?: number;
}


/**
 * 标签下拉列表
 */
export interface BlogTagOption {
  label: string,
  value: number | string,
}