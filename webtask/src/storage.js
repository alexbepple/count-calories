const r = require("ramda");

const p = { entries: "entries" };
const getEntriesFromStorageData = r.pipe(
  r.defaultTo({}),
  r.prop(p.entries),
  r.defaultTo([])
);
const setEntriesInStorageData = r.assoc(p.entries);

module.exports = {
  getEntries: getEntriesFromStorageData,
  setEntries: setEntriesInStorageData
};
