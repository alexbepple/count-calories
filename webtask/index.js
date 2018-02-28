const express = require("express");
const bodyParser = require("body-parser");
const wt = require("webtask-tools");
const r = require("ramda");

const p = { entries: "entries" };
const getEntriesFromStorageData = r.pipe(
  r.defaultTo({}),
  r.prop(p.entries),
  r.defaultTo([])
);
const setEntriesInStorageData = r.assoc(p.entries);

const getEntries = (req, res) => {
  const storage = req.webtaskContext.storage;
  storage.get((err, data) => {
    const entries = getEntriesFromStorageData(data);
    res.status(200).send(entries);
  });
};

const putEntries = (req, res) => {
  const storage = req.webtaskContext.storage;
  const entries = req.body;
  storage.get((err, data) => {
    if (err) res.status(500).send(err);
    storage.set(setEntriesInStorageData(entries, data), err => {
      if (err) res.status(500).send(err);
      getEntries(req, res);
    });
  });
};

const getGreeting = (req, res) => {
  res.send({ hello: req.user.sub });
};

const resources = { entries: "/entries", greeting: "/greeting" };

module.exports = wt
  .fromExpress(
    express()
      .use(bodyParser.json())
      .get(resources.entries, getEntries)
      .put(resources.entries, putEntries)
      .get(resources.greeting, getGreeting)
  )
  .auth0({
    loginSuccess: (ctx, req, res, baseUrl) => {
      res.writeHead(302, {
        Location: `https://count-calories.netlify.com/?access_token=${
          ctx.accessToken
        }`
      });
      return res.end();
    }
  });
