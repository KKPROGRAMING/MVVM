const css = require('./index.css');
import { ViewModel } from "./MVVM/viewModel";
let data = {
    name: "jack",
    gender: 'male',
    address: "earth"
};
let element = "#root";
const vm = new ViewModel(element, data);
console.log(vm);
