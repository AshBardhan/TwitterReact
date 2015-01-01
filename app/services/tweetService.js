var tweetConnection = require('../connections/tweetConnection');

exports.showTweetFeed = function (successCallback, failureCallback) {
  tweetConnection.showTweetFeed(successCallback, failureCallback);
};