const parser = require("./src/parser");
// return parser(process.argv[2]);
return parser('http://myurl.com?foo=42&foo.rrr=hello&bar="true"&baz=11');
