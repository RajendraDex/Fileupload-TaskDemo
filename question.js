// sum(1)(2)(3)(4)...() //10 output

// const sum  = function (a) {
//     return function (b) {
//         if (b) {
//         return sum(a+b); 
//         }
//         return a;
//     }
//     };




// ES6 
const sum=a=>b=>b?sum1(a*b):a
console.log(sum(1)(2)(3)(4)())