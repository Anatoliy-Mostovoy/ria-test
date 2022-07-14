const parser = require("./src/parser");
return parser(
  `http://myurl.com?foo.bar=42&foo.baz=555&bar.baz=888&baz=161&aaa=11&zzz=151`
);
