import { Ref } from "vue";

export interface UseBooleanActions {
  toggle: () => void;
  set: (value: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
}

export type UseBooleanResult = [Readonly<Ref<boolean>>, UseBooleanActions]