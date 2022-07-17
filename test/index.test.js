// const parser = require('../src/parser');
const parser = require("../src/parserNew");

const ptc = [
  {
    describe: "Super simple",
    input: "http://myurl.com?foo=bar",
    output: '{"foo":"bar"}',
  },
  {
    describe: "Many levels",
    input: "http://myurl.com?foo=bar&baz.bzz=zzb",
    output: '{"foo":"bar","baz":{"bzz":"zzb"}}',
  },
  {
    describe: "Same names",
    input: "http://myurl.com?foo=hi&bar=hello&foo=wassup",
    output: '{"foo":"wassup","bar":"hello"}',
  },
  {
    describe: "Quotes",
    input: 'http://myurl.com?foo="42"&bar="hello"&baz="true"',
    output: '{"foo":"42","bar":"hello","baz":"true"}',
  },
  {
    describe: "Datatypes",
    input: "http://myurl.com?foo=42&bar=hello&baz=true",
    output: '{"foo":42,"bar":"hello","baz":true}',
  },
  {
    describe: "Empty vals",
    input: "http://myurl.com?foo=42&bar=&baz=true",
    output: '{"foo":42,"baz":true}',
  },
  {
    describe: "Empty string 1",
    input: "http://myurl.com",
    output: null,
  },
  {
    describe: "Empty string 2",
    input: "http://myurl.com?",
    output: null,
  },
  {
    describe: "Many nested keys",
    input:
      "http://myurl.com?foo=bar&baz.bzz=zzb&bar.zbb=18&bar.baz.foo=hello&bar.baz.loo=world",
    output:
      '{"foo":"bar","baz":{"bzz":"zzb"},"bar":{"zbb":18,"baz":{"foo":"hello","loo":"world"}}}',
  },
];

const ntc = [
  {
    describe: "Wrong string 1",
    input: "http://myurl.com?foo=42?baz=true",
  },
  {
    describe: "Wrong string 2",
    input: "http://myurl.com?foo=42=18&baz=true",
  },
  {
    describe: "Wrong string 3",
    input: 'http://myurl.com?foo=42&baz="dazz',
  },
];

describe("positive test", () => {
  ptc.forEach((positiveTastCase) => {
    test(positiveTastCase.describe, () => {
      expect(parser(positiveTastCase.input)).toEqual(
        JSON.parse(positiveTastCase.output)
      );
    });
  });
});

describe("negative test", () => {
  ntc.forEach((negativeTastCase) => {
    test(negativeTastCase.describe, () => {
      expect(() => parser(negativeTastCase.input)).toThrow();
    });
  });
});
