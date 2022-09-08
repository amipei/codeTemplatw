import { ref, reactive, isRef, computed } from "vue";
import type { Ref, UnwrapNestedRefs } from 'vue'

const useSelectedCompare = <T>(selected: Ref<T> | UnwrapNestedRefs<T>, success: string, fail: string) => {

  const getSelectedResult = (data: T) => {
    if (isRef(selected)) {
      return selected.value === data ? success : fail
    }
    return selected === data ? success : fail
  }

  const getSelectedResultComputed = (data: T) => {
    return computed(() => getSelectedResult(data))
  }

  return {
    getSelectedResult, getSelectedResultComputed
  }
}

export default useSelectedCompare