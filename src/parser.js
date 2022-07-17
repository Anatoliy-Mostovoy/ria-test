const parser = (testUrl) => {
  if (!validURL(testUrl)) {
    throw new Error("Invalid URL");
  }

  const url = new URL(testUrl);

  const urlParams = {};

  url.searchParams.forEach((value, name) => {
    if (!value) {
      return;
    }
    const checkedValue = checkValue(value);
    const haveDot = name.indexOf(".");

    if (haveDot === -1) {
      return (urlParams[name] = checkedValue);
    }

    const arrWithDot = name.split(".");

    if (arrWithDot.length === 2) {
      return (urlParams[arrWithDot[0]] = {
        ...urlParams[arrWithDot[0]],
        [arrWithDot[1]]: checkedValue,
      });
    }

    if (arrWithDot.length === 3) {
      const secondObj = arrWithDot.reduce((acc) => {
        return {
          ...acc,
          [arrWithDot[1]]: {
            [arrWithDot[2]]: checkedValue,
          },
        };
      }, {});

      return (urlParams[arrWithDot[0]] = {
        ...urlParams[arrWithDot[0]],
        ...secondObj,
      });
    }
  });

  console.log(JSON.stringify(urlParams, null, 2));

  return Object.keys(urlParams)[0] ? urlParams : null;
};

//* check type of value
function checkValue(value) {
  if (value[0] === '"' && value[value.length - 1] === '"') {
    return value.replace(/['"]+/g, "");
  } else if (!isNaN(Number(value))) {
    return Number(value);
  } else if (value === "true" || value === "false") {
    return Boolean(value);
  }
  return value;
}
//*

//* validation NEW
function validURL(str) {
  let result = true;

  const parsUrl = str.substring(str.indexOf("?") + 1);
  //* check more then one "?"
  if (parsUrl.includes("?")) {
    return (result = false);
  }

  parsUrl.split("&").forEach((el) => {
    //*check more then one "="
    if (el.split("").filter((e) => e === "=").length > 1) {
      return (result = false);
    }
    //*check on " or '
    const firstSymbol = el.indexOf("=") + 1;
    if (
      el[firstSymbol] === '"' ||
      el[firstSymbol] === "'" ||
      el[el.length - 1] === '"' ||
      el[el.length - 1] === "'"
    ) {
      if (el[firstSymbol] !== el[el.length - 1]) {
        return (result = false);
      }
    }
  });

  return result;
}
//* validation

module.exports = parser;
