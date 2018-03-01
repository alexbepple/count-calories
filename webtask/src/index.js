const express = require("express");
const bodyParser = require("body-parser");
const wt = require("webtask-tools");
const r = require("ramda");
const sdT = require("./storage");

const getUserId = req => r.defaultTo("fooId", req.user && req.user.sub);

const getEntries = (req, res) => {
  const storage = req.webtaskContext.storage;
  storage.get((err, data) => {
    const entries = sdT.getEntries(getUserId(req), data);
    res.status(200).send(entries);
  });
};

const putEntries = (req, res) => {
  const storage = req.webtaskContext.storage;
  const entries = req.body;
  storage.get((err, data) => {
    if (err) res.status(500).send(err);
    storage.set(sdT.setEntries(getUserId(req), entries, data), err => {
      if (err) res.status(500).send(err);
      getEntries(req, res);
    });
  });
};

const resources = { entries: "/entries" };

const isDevEnv = () => process.env.NODE_ENV === "development";

const secureWithAuth0 = wtApp =>
  wtApp.auth0({
    loginSuccess: (ctx, req, res, baseUrl) => {
      const homeWithAccessToken = `https://count-calories.netlify.com/?access_token=${
        ctx.accessToken
      }`;
      res.writeHead(302, { Location: homeWithAccessToken });
      return res.end();
    }
  });

module.exports = r.pipe(
  () =>
    express()
      .use(bodyParser.json())
      .get(resources.entries, getEntries)
      .put(resources.entries, putEntries),
  wt.fromExpress,
  r.when(r.complement(isDevEnv), secureWithAuth0)
)();
