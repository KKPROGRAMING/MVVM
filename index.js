//target:string 绑定到的视图，通过querySelector(target)定位
//data:object 绑定的model(数据)
import { addProxy } from './ts/ts/addProxy.js';
import { interpolation } from './ts/ts/interpolation.js';
class ViewModel {
    constructor(target, data) {
        this.targetNode = document.querySelector(target);
        this.$data = data;
        addProxy(this, data);
    }
    ;
}
let data = {
    name: 'jack',
    age: 18,
    address: {
        school: 'HDU',
        place: 'hangzhou'
    }
};
const vm1 = new ViewModel('#root', data);
console.log(vm1);
console.log(Object.keys(vm1));
console.log(vm1['name']);
interpolation(vm1);
// console.log(data);
// console.log(vm1.$data);
// console.log(data === vm1.$data);
// console.log(vm1.$data['name'] === vm1['name']);
// setTimeout(()=>{
//     vm1['name'] = 'linda';
// },2000);
vm1['name'] = 'hey';
vm1['name'] = 'bye!';
vm1['name'] = 'linda';
// const text = document.getElementById('watched');
// text.setAttribute('value',vm1['name']);
// Object.defineProperty(vm1,'name',{
//     get(){
//         return vm1.$data['name'];
//     },
//     set(newValue){
//         document.getElementById('watched').setAttribute('value',newValue);
//         vm1.$data['name'] = vm1['name'] = newValue;
//     }
// })
// setTimeout(()=>{
//     vm1['name'] = 'wowow'
// },2000);
// let data2 = {
//     name:'linda',
//     age:12,
//     address:{
//         school:'UUU',
//         place:'earth'
//     }
// }
// const vm2 = new ViewModel('#root',data2);
// console.log(vm1);
// console.log(vm2);
// console.log(vm1);
// const vm = new ViewModel('#root',{
//     name:'jack',
//     age:18,
//     school:{
//         hello:'HDU',
//         address:'hangzhou'
//     }
// });
//console.log(vm);
// let text = vm['targetNode'].childNodes[3];
// console.log(text.value);
// text.value = vm['name'];
// let text:HTMLElement = document.getElementById('watched');
// Object.defineProperty(text,'value',{
//     get(){
//         console.log('getting text now!');
//         return text;
//     },
//     set(newValue){
//         console.log('setting...');
//     }
// })
// const hello = document.getElementById('watched');
// console.log(hello.getAttribute('value'));
// // let value = hello.getAttribute('value');
// Object.defineProperty(vm,'age',{
//     get(){
//         return vm['age'];
//     },
//     set(newValue){
//         hello.setAttribute('value',newValue);
//         vm['age'] = newValue;
//     }
// })
// setTimeout(()=>{
//     vm['age'] = 21;
// },1000);
// console.log(typeof hello === 'object');
// Object.defineProperty(hello,value,{
//     get(){
//         return vm;
//     },
//     set(newValue){
//         console.log('setting!');
//         console.log(newValue);
//     }
// })
// hello.addEventListener('change',()=>{
//     hello.setAttribute('value','wow!');
// })
