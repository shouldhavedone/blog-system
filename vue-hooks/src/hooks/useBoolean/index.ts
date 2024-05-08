
import useToggle from '../useToggle'

import { UseBooleanActions, UseBooleanResult } from './index.d'

function useBoolean(defaultValue = false): UseBooleanResult {
  const [state, { set, toggle }] = useToggle(defaultValue)

  const actions: UseBooleanActions = {
    toggle,
    set: (value: boolean) => set(!value),
    setTrue: () => set(true),
    setFalse: () => set(false),
  }

  return [state, actions]
}

export default useBoolean