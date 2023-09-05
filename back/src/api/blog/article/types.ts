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
  tag?: number | string,
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
