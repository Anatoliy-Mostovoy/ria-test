const parser = require("./src/parser");
// return parser(process.argv[2]);
return parser("http://myurl.com?baz.ddd.sss=55&baz.ddd.TTT=11");
