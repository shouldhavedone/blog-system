export interface UseToggleActions<D> {
  toggle: () => void
  set: (value: D) => void
  setLeft: () => void
  setRight: () => void
}