var tweetService = require('../services/tweetService');

exports.showTweetFeed = function (req, res) {
  var success = function (tweets) {
    res.json(tweets);
    console.log(tweets);
  }
  var failure = function () {
    res.status(500).json({status: 'failure'});
  }
  tweetService.showTweetFeed(success, failure);
}