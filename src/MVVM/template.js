//用于识别绑定数据的特殊标记
const match_single = "bind-";
const match_double = "model-";
/**
 * 参考vue框架中的模板语法，通过插值语法实现数据单向绑定与双向绑定。
 * 这里函数的结构与插值语法的函数结构类似，大致经历以下几个步骤：
 * 1.遍历View中节点，找到符合目标的节点；
 * 2.对特定位置数据替换；
 * 3.将操作添加入触发事件列表中
 */
export function template(vm) {
    SearchTemplate_bind.call(vm, vm.targetNode); //单向绑定
    SearchTemplate_model.call(vm, vm.targetNode); //双向绑定
}
//单向绑定
function SearchTemplate_bind(targetNode) {
    if (targetNode.firstChild !== null) {
        //对孩子节点的属性进行检查
        SearchTemplate_bind.call(this, targetNode.firstChild);
    }
    if (targetNode.nextSibling !== null) {
        //对兄弟节点的属性进行检查
        SearchTemplate_bind.call(this, targetNode.nextSibling);
    }
    if (targetNode.attributes !== undefined) {
        //对自身的属性进行检查
        for (let attribute of targetNode.attributes) {
            if (attribute.name.indexOf(match_single) === 0) {
                //在调用时用call指定this，使得this始终指向当前的ViewModel实体
                if (attribute.name.length === match_single.length) {
                    DoTemplate_bind.call(this, targetNode, "value", attribute.value);
                }
                else {
                    DoTemplate_bind.call(this, targetNode, attribute.name.slice(match_single.length), attribute.value);
                }
            }
        }
    }
}
function DoTemplate_bind(item, attribute, bindData) {
    if (this[bindData] !== null && this[bindData] !== undefined) {
        //如果针对当前数据的触发事件列表不存在，则先初始化
        if (this.singleBind[bindData] === (null || undefined)) {
            this.singleBind[bindData] = [];
        }
        //将函数添加入触发事件列表前，先将数据放入指定属性中
        item[attribute] = this[bindData];
        //将函数添加入触发事件列表
        this.singleBind[bindData].push(function () {
            item[attribute] = this[bindData];
        });
    }
}
//双向绑定
function SearchTemplate_model(targetNode) {
    if (targetNode.firstChild !== null) {
        SearchTemplate_model.call(this, targetNode.firstChild);
    }
    if (targetNode.nextSibling !== null) {
        SearchTemplate_model.call(this, targetNode.nextSibling);
    }
    if (targetNode.attributes !== undefined) {
        for (let attribute of targetNode.attributes) {
            if (attribute.name.indexOf(match_double) === 0) {
                if (attribute.name.length === match_double.length) {
                    DoTemplate_model.call(this, targetNode, "value", attribute.value);
                }
                else {
                    DoTemplate_model.call(this, targetNode, attribute.name.slice(match_double.length), attribute.value);
                }
            }
        }
    }
}
function DoTemplate_model(item, attribute, bindData) {
    if (this[bindData] !== null && this[bindData] !== undefined) {
        if (this.doubleBind[bindData] === (null || undefined)) {
            this.doubleBind[bindData] = [];
        }
        item[attribute] = this[bindData];
        //from view to model
        item.addEventListener("change", () => {
            /**
             * 添加监听器，当View中的数据有变化时同步到ViewModel中的数据
             * 使用箭头函数，保持this指向ViewModel实体
             */
            this[bindData] = item[attribute];
        });
        //from model to view
        this.doubleBind[bindData].push(function () {
            item[attribute] = this[bindData];
        });
    }
}
