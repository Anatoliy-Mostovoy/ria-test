// const parser = require("./src/parser");
const parser = require("./src/parserNew");

// return parser(process.argv[2]);
return parser(
  "http://myurl.com?foo.bar.www=33&foo.bar.zzz=42&foo.baz=hello&bar.baz=true&baz=11"
);
