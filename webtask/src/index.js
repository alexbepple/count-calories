const express = require("express");
const promiseRouter = require("express-promise-router");
const bodyParser = require("body-parser");
const wt = require("webtask-tools");
const r = require("ramda");
const sdT = require("./storage");
const promisify = require("util.promisify");

const getUserId = req => r.defaultTo("fooId", req.user && req.user.sub);

const getStorage = req => req.webtaskContext.storage;
const promisifiedFromStorage = (methodName, object) =>
  promisify(object[methodName].bind(object));
const getStorageData = req => promisifiedFromStorage("get", getStorage(req))();
const setStorageData = r.curry((data, req) =>
  promisifiedFromStorage("set", getStorage(req))(data)
);

const getDailyLimit = (req, res, next) =>
  getStorageData(req)
    .then(sdT.getDailyLimit(getUserId(req)))
    .then(res.json.bind(res));

const putDailyLimit = (req, res, next) =>
  getStorageData(req)
    .then(sdT.setDailyLimit(getUserId(req), req.body))
    .then(setStorageData(r.__, req))
    .then(() => getDailyLimit(req, res, next));

const getEntries = (req, res, next) =>
  getStorageData(req)
    .then(sdT.getEntries(getUserId(req)))
    .then(res.send.bind(res));

const putEntries = (req, res, next) =>
  getStorageData(req)
    .then(sdT.setEntries(getUserId(req), req.body))
    .then(setStorageData(r.__, req))
    .then(() => getEntries(req, res, next));

const getMe = (req, res) => {
  res.json(req.user);
};

const resources = {
  entries: "/entries",
  dailyLimit: "/daily-limit",
  me: "/me"
};

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
    express().use(
      promiseRouter()
        .use(bodyParser.json({ strict: false }))
        .get(resources.entries, getEntries)
        .put(resources.entries, putEntries)
        .get(resources.dailyLimit, getDailyLimit)
        .put(resources.dailyLimit, putDailyLimit)
        .get(resources.me, getMe)
    ),
  wt.fromExpress,
  r.when(r.complement(isDevEnv), secureWithAuth0)
)();
