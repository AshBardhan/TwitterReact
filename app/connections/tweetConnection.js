var twitter = require('twitter'),
    config = require('../appConfig');

var tweet =  new twitter({
  consumer_key: config.twitterAPI.consumer_key,
  consumer_secret: config.twitterAPI.consumer_secret,
  access_token_key: config.twitterAPI.access_token_key,
  access_token_secret: config.twitterAPI.access_token_secret
});

exports.showTweetFeed = function(successCallback, failureCallback){
  tweet.get('search/tweets', { q: 'chelsea', count: 10 }, function(err, data, response) {
    if(err){
      failureCallback(err);
    }
    successCallback(data);
  });
}