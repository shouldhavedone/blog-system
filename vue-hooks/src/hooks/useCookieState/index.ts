import Cookies from 'js-cookie'
import { readonly, ref } from 'vue'
import { isFunction, isUndefined } from '../../utils/index'

export type UseCookieStateType = string | undefined

export interface UseCookieStateOptions extends Cookies.CookieAttributes {
  defaultValue?: UseCookieStateType | (() => UseCookieStateType)
}

function useCookieState(cookieKey: string, options: UseCookieStateOptions = {}) {

  const defaultValue = () => {
    const cookieValue = Cookies.get(cookieKey)

    if (typeof cookieKey === 'string') return cookieValue

    if (isFunction(options.defaultValue)) {
      return options.defaultValue() as UseCookieStateType | (() => UseCookieStateType)
    }

    return options.defaultValue as UseCookieStateType | (() => UseCookieStateType)
  }

  const state = ref(defaultValue())

  const updateState = (
    newValue: UseCookieStateType | ((prevState: UseCookieStateType) => UseCookieStateType),
    newOptions: Cookies.CookieAttributes = {}
  ) => {
    const { defaultValue, ...resetOptions } = { ...options, ...newOptions }

    const getValue = () => {

      const value = isFunction(newValue) ? newValue(state.value) : newValue

      if (isUndefined(value)) {
        Cookies.remove(cookieKey)
      } else {
        Cookies.set(cookieKey, value, resetOptions)
      }

      return value;
    }
    state.value = getValue()
  }

  return [readonly(state), updateState] as const
}

export default useCookieState