const matchLeft = "{{";
const matchRight = "}}";
export function interpolation(vm) {
    SearchInterpolation.call(vm, vm.targetNode);
}
function SearchInterpolation(targetNode) {
    for (let item of targetNode.childNodes) {
        if (item.childNodes.length !== 0) {
            SearchInterpolation.call(this, item);
        }
        else if (item.nodeType === 3) {
            if (item.nodeValue !== null) {
                let content = item.nodeValue.toString();
                let start = content.indexOf(matchLeft);
                let end = content.indexOf(matchRight);
                if (start !== -1 && end !== -1) {
                    let bindData = content.slice(start + matchLeft.length, end);
                    DoInterpolation.call(this, item, bindData);
                }
            }
        }
    }
}
function DoInterpolation(item, bindData) {
    if (this[bindData] !== null && this[bindData] !== undefined) {
        if (this.singleBind[bindData] === (null || undefined)) {
            this.singleBind[bindData] = [];
        }
        let content = item.nodeValue.toString();
        let mark_start = content.indexOf(matchLeft);
        let mark_end = mark_start + this[bindData].length;
        item.nodeValue = content.replace("{{" + bindData + "}}", this[bindData]);
        content = item.nodeValue.toString();
        this.singleBind[bindData].push(function () {
            item.nodeValue =
                item.nodeValue.toString().substring(0, mark_start) +
                    this[bindData] +
                    item.nodeValue.toString().substring(mark_end);
            mark_end = mark_start + this[bindData].length;
            content = item.nodeValue.toString();
        });
    }
}
