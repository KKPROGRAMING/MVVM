import { VM } from "./index.js";

let matchLeft: string = "{{";
let matchRight: string = "}}";

export function interpolation(vm: VM) {
  SearchInterpolation.call(vm, vm.targetNode);
}

function SearchInterpolation(targetNode: HTMLElement | ChildNode): void {
  for (let item of targetNode.childNodes) {
    if (item.childNodes.length !== 0) {
      SearchInterpolation.call(this, item);
    } 
    else if (item.nodeType === 3) {
      /**nodeType=3 : text
       * 参照vue中的插值语法，对文字节点的内容进行检查
       * */
      if (item.nodeValue !== null) {
        //查找目标内容，并作标记以定位到要替换的部分
        let content: string = item.nodeValue.toString();
        let start: number = content.indexOf(matchLeft);
        let end: number = content.indexOf(matchRight);

        if (start !== -1 && end !== -1) {
          let bindData: string = content.slice(start + matchLeft.length, end);
          DoInterpolation.call(this, item, bindData);
        }
      }
    }
  }
}

function DoInterpolation(
  item: HTMLElement | ChildNode,
  bindData: string
): void {
  if (this[bindData] !== null && this[bindData] !== undefined) {
    if (this.singleBind[bindData] === (null || undefined)) {
      this.singleBind[bindData] = [];
    }

    let content: string = item.nodeValue.toString();
    let mark_start: number = content.indexOf(matchLeft); //被替换的内容的起始索引值
    let mark_end: number = mark_start + this[bindData].length; //终止处索引值

    //将函数添加入触发事件列表前，先将已有的内容放入模板中
    item.nodeValue = content.replace("{{" + bindData + "}}", this[bindData]);

    content = item.nodeValue.toString();

    //将函数添加入触发事件列表
    this.singleBind[bindData].push(function () {
      //只替换模板中的内容，避免污染了无关的部分
      item.nodeValue =
        item.nodeValue.toString().substring(0, mark_start) +
        this[bindData] +
        item.nodeValue.toString().substring(mark_end, content.length);

        //更新标记值，方便下一次进行数据的替换
        mark_end = mark_start + this[bindData].length;
        content = item.nodeValue.toString();
    });
  }
}
