const match_single = "bind-";
const match_double = "model-";
export function template(vm) {
    SearchTemplate_bind.call(vm, vm.targetNode);
    SearchTemplate_model.call(vm, vm.targetNode);
}
function SearchTemplate_bind(targetNode) {
    if (targetNode.firstChild !== null) {
        SearchTemplate_bind.call(this, targetNode.firstChild);
    }
    if (targetNode.nextSibling !== null) {
        SearchTemplate_bind.call(this, targetNode.nextSibling);
    }
    if (targetNode.attributes !== undefined) {
        for (let attribute of targetNode.attributes) {
            if (attribute.name.indexOf(match_single) === 0) {
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
        if (this.singleBind[bindData] === (null || undefined)) {
            this.singleBind[bindData] = [];
        }
        item[attribute] = this[bindData];
        this.singleBind[bindData].push(function () {
            item[attribute] = this[bindData];
        });
    }
}
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
        item.addEventListener("change", () => {
            this[bindData] = item[attribute];
        });
        this.doubleBind[bindData].push(function () {
            item[attribute] = this[bindData];
        });
    }
}
