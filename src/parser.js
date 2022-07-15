const parser = (testUrl) => {
  const url = new URL(testUrl);

  if (!validURL(url)) {
    throw new Error("Invalid URL");
  }
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
      const secondObj = arrWithDot.reduce((acc, item) => {
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

//* validation
function validURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
}
//* validation

module.exports = parser;
