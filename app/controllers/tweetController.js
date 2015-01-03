var tweetService = require('../services/tweetService');

exports.searchTweetFeed = function (req, res) {
  var options = {'count': 10, 'q' : 'Man Utd'};
  var query = req.query;
  if (typeof query !== 'undefined') {
    for (var prop in query) {
      options[prop] = query[prop];
    }
  }
  var success = function (tweets) {
    res.json(tweets);
  }
  var failure = function (err) {
    res.status(500).json(err || {status: 'failure'});
  }
  tweetService.searchTweetFeed(options, success, failure);
}