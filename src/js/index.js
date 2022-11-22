import "../scss/index.scss";
import "../index.html";

console.log("hello world");

let arr = [1, 2, 3];

// ES6 arraow function, Babel 會幫我們轉譯
arr.map((obj) => {
  console.log("obj", obj);
});

// ES6 解構 / rest operator , Babel 會幫我們轉譯
const [a, b, ...c] = [1, 2, 3, 4];

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
