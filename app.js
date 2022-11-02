"use strict";

/** Simple demo Express app. */

const express = require("express");
const app = express();

const stats = require("./stats")

const utils = require("./utils")

// const fs = require("fs")

// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  // check query has data at all
  let strNums = req.query.nums;
  let nums = utils.convertStrNums(strNums);

  const result = stats.findMean(nums);
  return res.json({ operation: "mean", result })

});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  let strNums = req.query.nums;
  let nums = utils.convertStrNums(strNums);

  const result = stats.findMedian(nums);
  return res.json({ operation: "median", result });
});

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {

  let strNums = req.query.nums;
  let nums = utils.convertStrNums(strNums);

  const result = stats.findMode(nums);
  return res.json({ operation: "mode", result });

});

/** Finds mean, median, and mode for the qs:
 * 
 * returns:
 * {
 *    operation: "all",
 *    mean: meanResult,
 *    median: medianResult,
 *    mode: modeResult 
 * } 
 */
app.get("/all", function (req, res) {

  let strNums = req.query.nums;
  let nums = utils.convertStrNums(strNums);

  const medianResult = stats.findMedian(nums);
  const meanResult = stats.findMean(nums);
  const modeResult = stats.findMode(nums);

  const result = res.json({
    operation: "all",
    mean: meanResult,
    median: medianResult,
    mode: modeResult,
  });


  // if (Bool(req.query.save) === true) {
  //   //writeFileSync?
  //   fs.writeFile("./results.json", result, "utf8")
  // }
  return result

});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;