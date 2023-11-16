/**
 * 编辑文章表单
 */
export interface BlogArticleEdit {
  /**
   * ID
   */
  id?: number,
  /**
   * 标题
   */
  title?: string,
  /**
   * 内容
   */
  content?: string,
  /**
   * 标签
   */
  tags?: number | string,
  /**
   * 封面图片
   */
  imgUrl?: string,
  /**
   * 摘要
   */
  desc?: string,
  /**
   * 状态
   */
  status?: number,
  /**
   * 阅读量
   */
  view?: number,
  /**
   * 点赞量
   */
  like?: number,
  /**
   * 更新时间
   */
  updateTime?: string,
  /**
   * 创建时间
   */
  createTime?: string,
}


/**
 * 文章查询参数
 */
export interface BlogArticleQuery extends PageQuery {
  /**
   * 关键字
   */
  keywords?: string;
  /**
   * 状态
   */
  status?: number;
}


/**
 * 文章列表分页对象
 */
export interface BlogArticlePageVO {
  /**
   * ID
   */
  id: number;
  /**
   * 标题
   */
  title: string;
  /**
   * 内容
   */
  content?: string,
  /**
   * 标签
   */
  tags?: number | string,
  /**
   * 封面图片
   */
  imgUrl?: string,
  /**
   * 摘要
   */
  desc?: string,
  /**
   * 状态
   */
  status?: number,
}

/**
 * 字典分页项类型声明
 */
export type BlogArticlePageResult = PageResult<BlogArticlePageVO[]>;
