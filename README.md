# MVVM
a simple framework of MVVM

#### 7.21 00：34
进度：完成了插值语法的单向绑定，但是对于数据中对象的数据代理还没有完善好

#### 7.21 14：04
进度：完成了模板语法的单向绑定，对类型的注解进行了完善

#### 7.21 20：43
进度：完成了双向绑定，改进了局部内容

#### 7.22 12：03
进度：修改了展示页面，要求大致实现，待单元测试

---
## :tw-1f530:INTRO
这是一个基于发布-订阅模式实现的简单的MVVM框架。  

MVVM中包含Model\View\ViewModel，  

ViewModel作为中介与调度中心，连接分离的View与Model。  

项目着重于ViewModel的设计与实现，View与Model可由使用者提供。  


#### :tw-1f423:使用说明：
使用这一简单的MVVM框架时，大致步骤如下：
1.    提供要绑定的View与Model，创造一个ViewModel实体
2.    在View中对希望绑定的数据做一些特殊的标记，让ViewModel能够检测到

:tw-1f383:**单向绑定（插值语法）**
仅限于在文字节点中定义，格式为 {{dataName}}  

`<strong>Hello! My name is {{name}}.</strong>`

:tw-1f383:**单向绑定（模板语法）**
仅限于在属性节点中定义，格式为 bind-attributeName:dataName  

`<input type="text" id="name" bind-value="name" />`

:tw-1f383:**双向绑定（模板语法）**
仅限于在属性节点中定义，格式为 model-attributeName:dataName  

`<input type="text" id="name" model-value="age" />`

用户需要提供希望绑定的View与Model目标，并传入对应的string类型的参数。比如：
```javascript
import { ViewModel,DATA } from "./MVVM/viewModel";

//绑定的Model
let data:DATA = {
  name: "jack",
  gender: 'male',
  address: "earth"
};

//绑定的View
let element:string = "#root";

//创造并打印ViewModel实体
const vm = new ViewModel(element, data);
console.log(vm);
```
当用户希望修改Model中的数据、或者希望通过View对Model中的数据进行改动时，这一操作都会被用户创建的ViewModel实体监听并拦截，并由其完成系列操作。

#### :tw-1f424:模块构成：
**1. viewModel.ts**
创造一个ViewModel类，类中包含四个属性与一个双参数构造方法：：
   - **targetNode** 连接MVVM中的View（视图）
   - **$data**  连接或保存MVVM中的Model（数据）
   - **singleBind**  单向绑定的触发事件列表，即数据改变时作为调度中心的ViewModel要进行的操作
   - **doubleBind**  双向绑定的触发事件列表
   - **constructor(target: string, data: DATA)**  参数分别为用户希望绑定的View与Model目标
   
**2.addProxy.ts**
数据代理，不直接改变原数据$data， 而是通过直接挂载在ViewModel上的数据进行代理，方便操作。  

主要通过Object.defineProperty()方法实现。  

此外，还在各数据对应的setter中添加了遍历单向\双向绑定事件触发列表、并执行对应事件的操作。

**3.interpolation.ts**
参考vue框架中的插值语法，通过插值语法实现数据**单向绑定**，大致步骤如下：
 * 遍历View中的每个节点，直到寻找到符合目标的*文字节点*；
 * 对做了特定标记的位置进行数据的替换；
 * 将这一数据替换的操作添加入单向绑定触发事件列表中，每次Model中的数据有变化都会触发这一操作。
 
**4.template.ts**
 参考vue框架中的模板语法，通过插值语法实现数据**单向绑定**与**双向绑定**。
 这里函数的结构与插值语法的函数结构类似，大致经历以下几个步骤：
 * 1.遍历View中节点，找到符合目标的节点；
 * 2.对特定位置数据替换；
 * 3.将操作添加入触发事件列表中。
