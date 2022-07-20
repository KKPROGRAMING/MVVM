//target:string 绑定到的视图，通过querySelector(target)定位
//data:object 绑定的model(数据)
import { addProxy } from "./addProxy.js";
import { interpolation } from "./interpolation.js";
class ViewModel {
    constructor(target, data) {
        this.targetNode = document.querySelector(target);
        this.$data = data;
        this.singleBind = {};
        addProxy(this, data);
        interpolation(this);
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
setTimeout(() => {
    vm1["name"] = "hey";
}, 2000);
setTimeout(() => {
    vm1["name"] = "Sophie";
}, 3000);
