// function Class1(x) {
//   console.log(x);
// }
// Class1.prototype = Object.assign(Object.create(Class1), {
//   constructor: Class1,
//   random: "some name",
//   method1: (x, y) => console.log("original", x + y),
// });
//
// function Class2(x) {
//   console.log(-x);
// }
// Class2.prototype = Object.assign(Object.create(Class1), {
//   constructor: Class2,
//   method2: (x, y) => console.log(x - y),
// });
//
// const originalMethod1 = Class1.prototype.method1;
// Class1.prototype.method1 = (x) => {
//   if (x === 2) {
//     console.log("fail");
//     return;
//   }
//   console.log("Overridden");
//   originalMethod1(2, 3);
// };
//
// const class1 = new Class1(3);
// console.log(Class1);
// class1.method1(4, 5);
// console.log(class1.random);
//
// const class2 = new Class2(3);
// class2.method2(4, 5);
// console.log(class2.__proto__.prototype.random);
//
// console.log(
//   Object.assign(Object.create(Class1), {
//     constructor: Class2,
//     method2: (x, y) => console.log(x - y),
//   })
// );
//
export {};
