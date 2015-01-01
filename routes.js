/*
 * GET home page.
 */

var urls = require('./app/enums/urlConstants').urls;
module.exports = function (app) {
  var tweetController = require('./app/controllers/tweetController');
  app.get(urls.WEB.HOME_PAGE, tweetController.showHomePage);

};