const css = require('./index.css');
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



