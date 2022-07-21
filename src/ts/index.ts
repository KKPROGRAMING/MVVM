import { addProxy } from "./addProxy.js";
import { interpolation } from "./interpolation.js";
import { template } from "./template.js";

export type VM = ViewModel;
export type DATA = {[key:string]:any};

//targetNode 绑定到的视图，通过querySelector(target)定位
//data 绑定的model(数据)
//singleBind 触发事件列表 [数据单向绑定]
//doubleBind 触发事件列表 [数据双向绑定]

class ViewModel {
  public targetNode: Element; //View(订阅者)
  public $data: object; //Model（订阅者）
  public singleBind: { [notice: string]: Array<Function> }; //需要进行的操作
  public doubleBind: { [notice: string]: Array<Function> }; //需要进行的操作

  constructor(target: string, data: DATA) {
    this.targetNode = document.querySelector(target);
    this.$data = data;
    this.singleBind = {};
    this.doubleBind = {};
    addProxy(this, data);
    interpolation(this);
    template(this);
  }
}


let data = {
  name: "jack",
  age: 18,
  address: {
    school: "HDU",
    place: "hangzhou",
  },
};

const vm1 = new ViewModel("#root", data);
console.log(vm1);

// setTimeout(() => {
//   vm1["name"] = "hey";
// }, 2000);

// setTimeout(() => {
//   vm1["name"] = "Sophie";
// }, 4000);

// setTimeout(() => {
//     vm1["name"] = "may";
//   }, 6000);
