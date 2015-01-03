var tweetConnection = require('../connections/tweetConnection');

exports.searchTweetFeed = function (params, successCallback, failureCallback) {
  tweetConnection.searchTweetFeed(params, successCallback, failureCallback);
};