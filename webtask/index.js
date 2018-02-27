const app = new (require("express"))();
const wt = require("webtask-tools");

app.get("/entries", function(req, res) {
  const entries = [
    { id: "rkXObM7Of", datetime: new Date(), description: "foo", kcal: 5 },
    { id: "BkemuWfmuM", datetime: new Date(), description: "bar", kcal: 11 }
  ];
  res.json(entries);
});

module.exports = wt.fromExpress(app);
