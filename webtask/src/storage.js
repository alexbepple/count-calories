const r = require("ramda");

const p = { entries: "entries", dailyLimits: "dailyLimits" };

const initIfNecessary = r.defaultTo({});
const getEntriesMap = r.pipe(initIfNecessary, r.prop(p.entries));
const getLimitsMap = r.pipe(initIfNecessary, r.prop(p.dailyLimits));

const getDailyLimit = r.curry((userId, storageData) =>
  r.pipe(() => getLimitsMap(storageData), r.prop(userId), r.defaultTo(1000))()
);
const setDailyLimit = r.curry((userId, limit, storageData) =>
  r.assocPath([p.dailyLimits, userId], limit, initIfNecessary(storageData))
);

const getEntries = r.curry((userId, storageData) =>
  r.pipe(() => getEntriesMap(storageData), r.prop(userId), r.defaultTo([]))()
);
const setEntries = r.curry((userId, entries, storageData) =>
  r.assocPath([p.entries, userId], entries, initIfNecessary(storageData))
);

module.exports = {
  getEntries: getEntries,
  setEntries: setEntries,
  getDailyLimit: getDailyLimit,
  setDailyLimit: setDailyLimit
};
