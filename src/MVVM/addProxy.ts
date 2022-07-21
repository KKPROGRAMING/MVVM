import { VM } from "./viewModel.js";
import { DATA } from "./viewModel.js";

/**
 * 数据代理，不直接改变原数据$data，
 * 而是通过直接挂载在ViewModel上的数据进行代理，方便操作
 * this.$data[key]===this[key] => true
 */

export function addProxy(vm: VM | DATA, data: DATA): void {
  if (data === null) {
    return;
  }
  let keys: Array<string> = Object.keys(data);
  for (let i: number = 0; i < keys.length; i++) {
    let key = keys[i];
    /**
     * 对对象的处理还没有做好，所以视图中要插入对象值时呈现的效果是[object Object],
     * 需要考虑与解决的问题如下：
     * （1）如何判断当前值是否为一个对象？
     * （2）如何生成定位到当前值的路径？
     */
    Object.defineProperty(vm, key, {
      enumerable: true,
      get() {
        return this.$data[key];
      },
      set(newValue) {
        this.$data[key] = newValue;
        /**单向&双向绑定，通过触发事件列表中的记录进行控制操作，
         * 达到View与Model之间数据绑定的效果
         * */
        if (this.singleBind[key] !== (null || undefined)) {
          for (let tmp of this.singleBind[key]) {
            tmp.call(this);
          }
        }
        if (this.doubleBind[key] !== (null || undefined)) {
          for (let tmp of this.doubleBind[key]) {
            tmp.call(this);
          }
        }
      },
    });
  }
}
