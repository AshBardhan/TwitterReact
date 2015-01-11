var urls = require('./app/enums/urlConstants').urls;

module.exports = function (app) {
  var tweetController = require('./app/controllers/tweetController');
  app.get(urls.API.SEARCH_TWEETS, tweetController.searchTweetFeed);
  app.get(urls.API.HOME_TIMELINE, tweetController.searchHomeTimelineFeed);
  app.get(urls.API.USER_TIMELINE, tweetController.searchUserTimelineFeed);
  app.post(urls.API.POST_TWEET, tweetController.sendStatusUpdate);
  app.post(urls.API.POST_RETWEET, tweetController.retweetStatusUpdate);
  app.post(urls.API.FAV_TWEET, tweetController.favoriteTweet);
  app.get(urls.WEB.HOME_PAGE, tweetController.showHomePage);
  app.get(urls.WEB.USER_PAGE, tweetController.showUserPage);
  app.get(urls.WEB.SEARCH_PAGE, tweetController.showSearchPage);

  var testController = require('./app/controllers/testController');
  app.get(urls.WEB.TEST_REACT_JSX, testController.showTestReactJSX);
  app.get(urls.WEB.TEST_REACT_JS, testController.showTestReactWithoutJSX);
  app.get(urls.WEB.TEST_TWITTER, testController.showTestTwitter);
};