const parser = (testUrl) => {
  const indexStartQueryString = testUrl.indexOf("?") + 1;
  const queryString = testUrl.substring(indexStartQueryString);

  if (indexStartQueryString === 0 || queryString.length === 0) {
    return null;
  }
  if (queryString.indexOf("?") !== -1) {
    throw new Error("Sorry, incorrect format: more then one '?' ");
  }
  const resultObj = {};
  queryString.split("&").forEach((queryParam) => {
    parsQuery(queryParam, resultObj);
  });
  console.log(JSON.stringify(resultObj, null, 2));
  return resultObj;
};

function parsQuery(queryParam, resultObj) {
  const keyPair = queryParam.split("=");
  if (keyPair.length > 2) {
    throw new Error("Sorry, incorrect format: more then one '=' ");
  }
  const key = keyPair[0];
  const value = keyPair[1];
  if (value || value.length > 0) {
    const validateValue = checkValue(value);
    makeFinalObj(key, validateValue, resultObj);
  }
}

function makeFinalObj(key, value, resultObj) {
  const keyFragment = key.split(".");
  if (keyFragment.length === 1) {
    resultObj[key] = value;
  } else {
    if (!resultObj[keyFragment[0]]) {
      resultObj[keyFragment[0]] = {};
    }
    const secondObj = key.substring(key.indexOf(".") + 1);
    makeFinalObj(secondObj, value, resultObj[keyFragment[0]]);
  }
}

function checkValue(value) {
  if (value[0] === '"' && value[value.length - 1] === '"') {
    return value.replace(/['"]+/g, "");
  }
  if (!isNaN(Number(value))) {
    return Number(value);
  }
  if (value === "true" || value === "false") {
    return Boolean(value);
  }
  if (value.indexOf('"') !== -1) {
    throw new Error("Sorry, incorrect format: error with brackets ");
  }
  return value;
}

module.exports = parser;
