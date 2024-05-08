import { Ref, isRef, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import { isBrowser } from '../../utils/index'

import { UseTitleOptions } from './index.d'

const defaultOptions: UseTitleOptions = {
  restoreOnUnmount: false,
}

function useTitle(title: Ref<string> | string, options: UseTitleOptions = defaultOptions) {
  const titleRef = ref(isBrowser ? document.title : '')

  if (isRef(title)) {
    watch(title, () => {
      document.title = title.value
    })
  } else {
    document.title = title
  }

  onMounted(() => {
    document.title = unref(title)
  })

  onUnmounted(() => {
    if (options.restoreOnUnmount) {
      document.title = unref(titleRef)
    }
  })
}

export default useTitle