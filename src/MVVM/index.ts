import { ViewModel } from "./viewModel.js";

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

// setTimeout(() => {
//   vm1["name"] = "hey";
// }, 2000);

// setTimeout(() => {
//   vm1["name"] = "Sophie";
// }, 4000);

// setTimeout(() => {
//     vm1["name"] = "may";
//   }, 6000);
