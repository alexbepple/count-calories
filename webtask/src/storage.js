const r = require("ramda");

const p = { entries: "entries", dailyLimits: "dailyLimits" };

const initIfNecessary = r.defaultTo({});
const getEntriesMap = r.pipe(initIfNecessary, r.prop(p.entries));
const getLimitsMap = r.pipe(initIfNecessary, r.prop(p.dailyLimits));

const getDailyLimit = r.curry((userId, storageData) =>
  r.pipe(() => getLimitsMap(storageData), r.prop(userId), r.defaultTo(1000))()
);

const getEntries = r.curry((userId, storageData) =>
  r.pipe(() => getEntriesMap(storageData), r.prop(userId), r.defaultTo([]))()
);
const setEntries = r.curry((userId, entries, storageData) =>
  r.assoc(
    p.entries,
    r.merge(getEntriesMap(storageData), r.objOf(userId, entries)),
    initIfNecessary(storageData)
  )
);

module.exports = {
  getEntries: getEntries,
  setEntries: setEntries,
  getDailyLimit: getDailyLimit
};
