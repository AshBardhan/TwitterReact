var tweetConnection = require('../connections/tweetConnection');

exports.searchTweetFeed = function (params, successCallback, failureCallback) {
  tweetConnection.searchTweetFeed(params, successCallback, failureCallback);
};

exports.sendStatusUpdate = function (params, successCallback, failureCallback) {
  tweetConnection.sendStatusUpdate(params, successCallback, failureCallback);
};