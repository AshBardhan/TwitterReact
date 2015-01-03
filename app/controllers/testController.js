exports.showTestReactJSX = function (req, res) {
  res.render('test/testReact', {title: 'ReactJS'});
};

exports.showTestReactWithoutJSX = function (req, res) {
  res.render('test/testReact2', {title: 'ReactJS'});
};

exports.showHomePage = function (req, res) {
  res.render('home', {title: 'Hello World!'});
};

exports.showTestTwitter = function (req, res) {
  res.render('test/testTwitter', {title: 'Twitter API!'});
};