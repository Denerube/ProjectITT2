/*jshint esversion: 8 */
const express = require('express');
const auth = require("../routes/auth");
const flessen = require("../routes/flessen");
const merken= require("../routes/merken");
const personen=require("../routes/personen");
const users= require("../routes/users");
const error=require("../middleware/error");




module.exports = function(app) {
  app.use(express.json());
  app.use("/api/auth",auth);
  app.use("/api/flessen",flessen);
  app.use("/api/merken",merken);
  app.use("/api/personen",personen);
  app.use("/api/users",users);
  app.use(error);
}