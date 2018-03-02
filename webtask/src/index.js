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

const getEntries = (req, res, next) =>
  getStorageData(req)
    .then(sdT.getEntries(getUserId(req)))
    .then(res.send.bind(res));

const putEntries = (req, res, next) =>
  getStorageData(req)
    .then(sdT.setEntries(getUserId(req), req.body))
    .then(setStorageData(r.__, req))
    .then(() => getEntries(req, res, next));

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
    express().use(
      promiseRouter()
        .use(bodyParser.json())
        .get(resources.entries, getEntries)
        .put(resources.entries, putEntries)
    ),
  wt.fromExpress,
  r.when(r.complement(isDevEnv), secureWithAuth0)
)();