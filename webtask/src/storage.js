const r = require("ramda");

const p = { entries: "entries" };

const initIfNecessary = r.defaultTo({});
const getEntriesMap = r.pipe(initIfNecessary, r.prop(p.entries));

const getEntries = (userId, storageData) =>
  r.pipe(() => getEntriesMap(storageData), r.prop(userId), r.defaultTo([]))();
const setEntries = (userId, entries, storageData) =>
  r.assoc(
    p.entries,
    r.merge(getEntriesMap(storageData), r.objOf(userId, entries)),
    initIfNecessary(storageData)
  );

module.exports = {
  getEntries: getEntries,
  setEntries: setEntries
};
