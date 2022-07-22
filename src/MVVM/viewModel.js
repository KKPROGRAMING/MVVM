import { addProxy } from "./addProxy.js";
import { interpolation } from "./interpolation.js";
import { template } from "./template.js";
export class ViewModel {
    constructor(target, data) {
        this.targetNode = document.querySelector(target);
        this.$data = data;
        this.singleBind = {};
        this.doubleBind = {};
        addProxy(this, data);
        interpolation(this);
        template(this);
    }
}
