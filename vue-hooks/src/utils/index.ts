/**
 * 判断数字
 * @param value 
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number'

/**
 * 判断布尔
 * @param value 
 */
export const isBoolean = (value: unknown): value is number => typeof value === 'boolean'

/**
 * 判断字符串
 * @param value 
 */
export const isString = (value: unknown): value is number => typeof value === 'string'

/**
 * 判断对象
 * @param value 
 */
export const isObject = (value: unknown): value is Record<any, any> => value !== null && typeof value === 'object'

/**
 * 判断函数
 * @param value 
 */
export const isFunction = (value: unknown): value is Function => typeof value === 'function'

/**
 * 判断undefined
 * @param value 
 */
export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined'

/**
 * 判断浏览器
 */
export const isBrowser = !!(!isUndefined(window) && window.document && window.document.createElement)



