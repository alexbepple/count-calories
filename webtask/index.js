const app = new (require("express"))();
const wt = require("webtask-tools");

app.get("/", function(req, res) {
  res.end("Hello, world!");
});

module.exports = wt.fromExpress(app);
