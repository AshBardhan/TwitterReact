exports.showHomePage = function (req, res) {
  res.render('home', {title: 'Hello World!'});
};