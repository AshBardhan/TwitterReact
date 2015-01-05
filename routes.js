var urls = require('./app/enums/urlConstants').urls;
module.exports = function (app) {
  var tweetController = require('./app/controllers/tweetController');
  app.get(urls.API.SEARCH_TWEETS, tweetController.searchTweetFeed);
  app.get(urls.API.HOME_TIMELINE, tweetController.searchHomeTimelineFeed);
  app.post(urls.API.POST_TWEET, tweetController.sendStatusUpdate);
  app.post(urls.API.POST_RETWEET, tweetController.retweetStatusUpdate);
  app.post(urls.API.FAV_TWEET, tweetController.favoriteTweet);
  app.get(urls.WEB.HOME_PAGE, tweetController.showHomePage);

  var testController = require('./app/controllers/testController');
  app.get(urls.WEB.TEST_REACT_JSX, testController.showTestReactJSX);
  app.get(urls.WEB.TEST_REACT_JS, testController.showTestReactWithoutJSX);
  app.get(urls.WEB.TEST_TWITTER, testController.showTestTwitter);

};