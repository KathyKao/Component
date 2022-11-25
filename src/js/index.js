import "index.scss";
// import "index.html";
import item from "item";

console.log($("#box"));
console.log("jQuery", jQuery("#box"));
console.log("window.jQuery", window.jQuery("#box"));
console.log(item);
console.log("hello world");

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const p1 = new Person("Kathy", 34);

// ES6 解構 / rest operator , Babel 會幫我們轉譯
const [a, b, ...c] = [1, 2, 3, 4];

// ES6 arraow function, Babel 會幫我們轉譯
// map API 則需要透過 babel-polyfill
const arr = [1, 2, 3];
arr.map((obj) => {
  console.log("obj", obj);
});

// promise / async await 則需要透過 babel-polyfill
function testPromise() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("promise");
      resolve("success");
    }, 5000);
  });

  return promise;
}
const test = async () => {
  const p = await testPromise();
  console.log(p);
};

test();
