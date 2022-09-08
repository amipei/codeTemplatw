import { ref } from "vue"

interface Options {
  //可以取消选中（默认不可以）
  deselectable?: boolean;
  //表示改变单选组数据后，能不能重置选中值（默认可以）
  canReset?: boolean;
}

const defaultOptions: Options = {
  deselectable: false,
  canReset: true
}

/**
 * 使用单选组
 */
const useRadioGroup = <D>(data: Array<D>, options?: Options) => {
  /**最终的选项/配置 */
  const finalOptions = Object.assign({}, defaultOptions, options);
  const { deselectable, canReset } = finalOptions;

  /**单选组数据 */
  const radioGroup = ref<D[]>(data);
  /**选中的项 */
  const selected = ref<D | null>();

  /**改变选中的项 */
  const change = (data: D) => {
    //空值直接赋值
    if (!selected.value) { 
      selected.value = data;return; 
    }
    //不相等赋值
    if (selected.value !== data) {
      selected.value = data;return;
    }
    //默认相等（TODO: 不确定是否需要再判断一次)
    if (deselectable) {
      //有开启可取消选择
      selected.value = null
    }
  }

  /**设置新的单选组数据 */
  const changeRadioGroup = (list: D[]) => {
    radioGroup.value = list as any[];
    if (canReset) {
      selected.value = null;
    }
  }

  return {
    radioGroup, selected, actions: {
      change, changeRadioGroup
    }
  }
}


export default useRadioGroup