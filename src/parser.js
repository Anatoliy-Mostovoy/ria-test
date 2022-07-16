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

    const arrWithDot = name.split(".");

    if (arrWithDot.length === 2) {
      switch (true) {
        case value[0] === '"' && value[value.length - 1] === '"':
          return (urlParams[arrWithDot[0]] = {
            ...urlParams[arrWithDot[0]],
            [arrWithDot[1]]: value.replace(/['"]+/g, ""),
          });
        case !isNaN(Number(value)):
          return (urlParams[arrWithDot[0]] = {
            ...urlParams[arrWithDot[0]],
            [arrWithDot[1]]: Number(value),
          });
        case value === "true":
          return (urlParams[arrWithDot[0]] = {
            ...urlParams[arrWithDot[0]],
            [arrWithDot[1]]: true,
          });
        case value === "false":
          return (urlParams[arrWithDot[0]] = {
            ...urlParams[arrWithDot[0]],
            [arrWithDot[1]]: false,
          });
        default:
          return (urlParams[arrWithDot[0]] = {
            ...urlParams[arrWithDot[0]],
            [arrWithDot[1]]: value,
          });
      }
    }

    if (arrWithDot.length === 3) {
      const secondObj = arrWithDot.reduce((acc) => {
        switch (true) {
          case value[0] === '"' && value[value.length - 1] === '"':
            return {
              ...acc,
              [arrWithDot[1]]: {
                [arrWithDot[2]]: value.replace(/['"]+/g, ""),
              },
            };
          case !isNaN(Number(value)):
            return {
              ...acc,
              [arrWithDot[1]]: {
                ...acc[arrWithDot[1]],
                [arrWithDot[2]]: Number(value),
              },
            };

          case value === "true":
            return {
              ...acc,
              [arrWithDot[1]]: {
                [arrWithDot[2]]: true,
              },
            };

          case value === "false":
            return {
              ...acc,
              [arrWithDot[1]]: {
                [arrWithDot[2]]: false,
              },
            };

          default:
            return {
              ...acc,
              [arrWithDot[1]]: {
                [arrWithDot[2]]: value,
              },
            };
        }
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
