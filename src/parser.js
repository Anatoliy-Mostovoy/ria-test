// const myUrl = new URL(
//   "http://myurl.com?foo.sos=42&foo=hello&bar='true'&baz=11"
// );
// const params = {};
// console.log(myUrl.search.replace("?", "").split("&"));
// const url = myUrl.search.replace("?", "").split("&");
// url.forEach((el, elIndex) => {
//   const haveDot = el.indexOf(".");
//   if (haveDot === -1) {
//     const arr = el.split("=");
//     params[arr[0]] = arr[1];
//   }
//   return;
// });
// console.log(params);

const a = "11";
const b = Number(a);
console.log(!isNaN(b));
