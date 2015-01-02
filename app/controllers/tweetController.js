var tweetService = require('../services/tweetService');

exports.showTweetFeed = function (req, res) {
  var success = function (tweets) {
    res.json(tweets);
  }
  var failure = function (err) {
    res.status(500).json(err || {status: 'failure'});
  }
  tweetService.showTweetFeed(success, failure);
}