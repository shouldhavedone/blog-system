import { Ref, UnwrapRef, computed, ref, shallowReadonly } from "vue";
import { UseToggleActions } from './index.d'

function useToggle<D = boolean>(): [Ref<D>, UseToggleActions<D>]

function useToggle<D = boolean>(defaultValue: D): [Ref<D>, UseToggleActions<D>]

function useToggle<D, R>(defaultValue: D, reverseValue: R): [Ref<D | R>, UseToggleActions<D | R>]

function useToggle<D, R>(defaultValue: D = (false as unknown) as D, reverseValue?: R) {

  const state = ref<D | R>(defaultValue)

  const actions = computed(() => {
    const reverseValueOrign = (reverseValue === undefined ? !defaultValue : reverseValue) as UnwrapRef<D> | UnwrapRef<R>

    const toggle = () => {
      state.value = state.value === defaultValue ? reverseValueOrign : (defaultValue as UnwrapRef<D>)
    }

    const set = (value: UnwrapRef<D> | UnwrapRef<R>) => state.value = value

    const setLeft = () => (state.value = defaultValue as UnwrapRef<D>)

    const setRight = () => (state.value = reverseValue as UnwrapRef<R>)

    return {
      toggle,
      set,
      setLeft,
      setRight,
    }

  })

  return [shallowReadonly(state), { ...actions.value }]
}

export default useToggle