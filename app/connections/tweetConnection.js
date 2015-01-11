var twitter = require('twitter'),
    config = require('../appConfig').twitterAPI;

var tweet =  new twitter(config);

exports.getTweetRequest = function(url, params, successCallback, failureCallback){
  tweet.get(url, params, function(err, data, response) {
    if(err){
      failureCallback(err);
    }
    successCallback(data);
  });
};

exports.postTweetRequest = function(url, params, successCallback, failureCallback){
  tweet.post(url, params, function(err, data, response) {
    if(err){
      failureCallback(err);
    }
    successCallback(data);
  });
};