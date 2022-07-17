const parser = (testUrl) => {
  const indexStartQueryString = testUrl.indexOf("?") + 1;
  const queryString = testUrl.substring(indexStartQueryString);
  console.log(queryString);
  const resultObj = {};
  queryString.split("&").forEach((queryParam) => {
    parsQuery(queryParam, resultObj);
  });
  console.log(resultObj);
  return resultObj;
};

function parsQuery(queryParam, resultObj) {
  const keyPair = queryParam.split("=");
  const key = keyPair[0];
  const value = keyPair[1];
  makeFinalObj(key, value, resultObj);
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

module.exports = parser;
