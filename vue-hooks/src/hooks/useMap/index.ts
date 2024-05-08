import { markRaw, ref } from "vue";


function useMap(initialValue) {

  const getInitValue = () => {
    return initialValue ? new Map(initialValue) : new Map()
  }

  const state = ref(getInitValue())

  const actions = {
    set: (key, value) => {
      state.value.set(key, value)
    },
    get: (key) => {
      return state.value.get(key)
    },
    remove: (key) => state.value.delete(key),
    clear: () => state.value.clear(),
    has: (key) => state.value.has(key),
    setAll: newMap => {
      state.value = new Map(newMap)
    },
    reset: () => {
      state.value = getInitValue()
    }
  }

  return [state, markRaw(actions)]
}

export default useMap