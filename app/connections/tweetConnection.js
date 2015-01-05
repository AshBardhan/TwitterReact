var twitter = require('twitter'),
    config = require('../appConfig').twitterAPI;

var tweet =  new twitter(config);

exports.searchTweetFeed = function(params, successCallback, failureCallback){
  tweet.get('search/tweets', params, function(err, data, response) {
    if(err){
      failureCallback(err);
    }
    successCallback(data);
  });
};

exports.searchHomeTimelineFeed = function(params, successCallback, failureCallback){
  tweet.get('statuses/home_timeline', params, function(err, data, response) {
    if(err){
      failureCallback(err);
    }
    successCallback(data);
  });
};

exports.sendStatusUpdate = function(params, successCallback, failureCallback){
  tweet.post('statuses/update', params, function(err, data, response) {
    if(err){
      failureCallback(err);
    }
    successCallback(data);
  });
};

exports.retweetStatusUpdate = function(tweetID, successCallback, failureCallback){
  tweet.post('statuses/retweet/'+tweetID, {}, function(err, data, response) {
    if(err){
      failureCallback(err);
    }
    successCallback(data);
  });
};

exports.favoriteTweet = function(params, successCallback, failureCallback){
  tweet.post('favorites/create', params, function(err, data, response) {
    if(err){
      failureCallback(err);
    }
    successCallback(data);
  });
};