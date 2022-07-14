const parser = (testUrl) => {
  const url = new URL(testUrl);

  const urlParams = {};

  url.searchParams.forEach((value, name) => {
    if (!value) {
      return;
    }

    const haveDot = name.indexOf(".");
    if (haveDot === -1) {
      switch (true) {
        case value[0] === '"' && value[value.length - 1] === '"':
          return (urlParams[name] = value.replace(/['"]+/g, ""));
        case !isNaN(Number(value)):
          return (urlParams[name] = Number(value));
        case value === "true":
          return (urlParams[name] = true);
        case value === "false":
          return (urlParams[name] = false);
        default:
          return (urlParams[name] = value);
      }
    }
  });
  console.log(JSON.stringify(urlParams, null, 2));

  return Object.keys(urlParams)[0] ? urlParams : null;
};

module.exports = parser;

// const parser = (testUrl) => {
//   console.log(testUrl);
//   const myUrl = new URL(testUrl);

//   const arr = myUrl.search.replace("?", "").split("&");
//   console.log(arr);
//   const obj = arr.reduce((acc, item) => {
//     let itemArr = item.split("=");
//     const isDot = itemArr[0].indexOf(".");
//     const value = itemArr[1];

//     if (isDot === -1) {
//       const key = itemArr[0];

//       switch (true) {
//         case !value:
//           break;
//         case !isNaN(Number(value)):
//           acc = {
//             ...acc,
//             [key]: Number(value),
//           };
//           break;
//         case value[0] === '"' && value[value.length - 1] === '"':
//           acc = {
//             ...acc,
//             [key]: value.replace(/['"]+/g, ""),
//           };
//           break;

//         case value === "true":
//           acc = {
//             ...acc,
//             [key]: true,
//           };
//           break;
//         case value === "false":
//           acc = {
//             ...acc,
//             [key]: false,
//           };
//           break;
//         default:
//           acc = {
//             ...acc,
//             [key]: value,
//           };
//           break;
//       }
//     }

//     const arrWithDot = itemArr[0].split(".");

//     if (arrWithDot.length === 2) {
//       const firstKey = arrWithDot[0];
//       const secondKey = arrWithDot[1];

//       switch (true) {
//         case !value:
//           break;
//         case value[0] === '"' && value[value.length - 1] === '"':
//           acc = {
//             ...acc,
//             [firstKey]: { [secondKey]: value.replace(/['"]+/g, "") },
//           };
//           break;

//         case !isNaN(Number(value)):
//           acc = {
//             ...acc,
//             [firstKey]: { [secondKey]: Number(value) },
//           };
//           break;
//         case value === "true":
//           acc = {
//             ...acc,
//             [firstKey]: { [secondKey]: true },
//           };
//           break;
//         case value === "false":
//           acc = {
//             ...acc,
//             [firstKey]: { [secondKey]: false },
//           };
//           break;

//         default:
//           acc = { ...acc, [firstKey]: { [secondKey]: value } };
//           break;
//       }
//     }

//     if (arrWithDot.length === 3) {
//       const firstKey = arrWithDot[0];
//       const secondKey = arrWithDot[1];
//       const thirdKey = arrWithDot[2];

//       switch (true) {
//         case !value:
//           break;
//         case value[0] === '"' && value[value.length - 1] === '"':
//           acc = {
//             ...acc,
//             [firstKey]: {
//               [secondKey]: { [thirdKey]: value.replace(/['"]+/g, "") },
//             },
//           };
//           break;
//         case !isNaN(Number(value)):
//           acc = {
//             ...acc,
//             [firstKey]: { [secondKey]: { [thirdKey]: Number(value) } },
//           };
//           break;
//         case value === "true":
//           acc = {
//             ...acc,
//             [firstKey]: { [secondKey]: { [thirdKey]: true } },
//           };
//           break;
//         case value === "false":
//           acc = {
//             ...acc,
//             [firstKey]: { [secondKey]: { [thirdKey]: false } },
//           };
//           break;
//         default:
//           acc = {
//             ...acc,
//             [firstKey]: { [secondKey]: { [thirdKey]: value } },
//           };
//           break;
//       }
//     }

//     return acc;
//   }, {});

//   console.log("JSON:", JSON.stringify(obj, null, 2));
//   return Object.keys(obj)[0] ? obj : null;
// };

// module.exports = parser;
