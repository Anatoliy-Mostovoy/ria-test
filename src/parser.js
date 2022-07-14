const parser = (testUrl) => {
  console.log(testUrl);
  const myUrl = new URL(testUrl);

  const arr = myUrl.search.replace("?", "").split("&");

  const obj = arr.reduce((acc, item) => {
    let itemArr = item.split("=");
    const isDot = itemArr[0].indexOf(".");
    if (isDot === -1) {
      const key = itemArr[0];
      const value = itemArr[1];
      switch (true) {
        case !value:
          break;
        case !isNaN(Number(value)):
          acc = {
            ...acc,
            [key]: Number(value),
          };
          break;
        case value[0] === '"' && value[value.length - 1] === '"':
          acc = {
            ...acc,
            [key]: value.replace(/['"]+/g, ""),
          };
          break;
        case value === "true":
          acc = {
            ...acc,
            [key]: true,
          };
          break;
        case value === "false":
          acc = {
            ...acc,
            [key]: false,
          };
          break;
        default:
          acc = {
            ...acc,
            [key]: value,
          };
          break;
      }
    }

    return acc;
  }, {});
  console.log("JSON:", JSON.stringify(obj, null, 2));
  return Object.keys(obj)[0] ? obj : null;
};

module.exports = parser;
