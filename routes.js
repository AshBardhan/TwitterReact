/*
 * GET home page.
 */

var urls = require('./app/enums/urlConstants').urls;
module.exports = function (app) {
  var tweetController = require('./app/controllers/tweetController');
  app.get(urls.WEB.HOME_PAGE, tweetController.showHomePage);

  var testController = require('./app/controllers/testController');
  app.get(urls.WEB.TEST_REACT_JSX, testController.showTestReactJSX);
  app.get(urls.WEB.TEST_REACT_JS, testController.showTestReactWithoutJSX);

};