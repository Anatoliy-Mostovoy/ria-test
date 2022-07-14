const parser = require("./src/parser");
return parser(
  `http://myurl.com?foo.bar=42&foo.baz.rrr=hello&bar.baz=true&baz=11`
);
