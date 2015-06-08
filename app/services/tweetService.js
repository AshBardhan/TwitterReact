var tweetConnection = require('../connections/tweetConnection'),
	twitterURL = require('../enums/urlConstants').urls.TWITTER;

exports.searchTweetFeed = function (params, successCallback, failureCallback) {
	tweetConnection.getTweetRequest(twitterURL.SEARCH, params, successCallback, failureCallback);
};

exports.searchHomeTimelineFeed = function (params, successCallback, failureCallback) {
	tweetConnection.getTweetRequest(twitterURL.HOME_TIMELINE, params, successCallback, failureCallback);
};

exports.searchUserTimelineFeed = function (params, successCallback, failureCallback) {
	tweetConnection.getTweetRequest(twitterURL.USER_TIMELINE, params, successCallback, failureCallback);
};

exports.sendStatusUpdate = function (params, successCallback, failureCallback) {
	tweetConnection.postTweetRequest(twitterURL.TWEET, params, successCallback, failureCallback);
};

exports.retweetStatusUpdate = function (tweetID, successCallback, failureCallback) {
	tweetConnection.postTweetRequest(twitterURL.RETWEET + tweetID, {}, successCallback, failureCallback);
};

exports.favoriteTweet = function (params, successCallback, failureCallback) {
	tweetConnection.postTweetRequest(twitterURL.FAVORITE, params, successCallback, failureCallback);
};