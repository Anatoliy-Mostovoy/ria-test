const parser = require("./src/parser");
// return parser(process.argv[2]);
return parser("http://myurl.com?foo.bar=42&foo.baz=hello&bar.baz=true&baz=11");
