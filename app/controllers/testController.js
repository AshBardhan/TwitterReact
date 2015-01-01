exports.showTestReactJSX = function (req, res) {
  res.render('test/testReact', {title: 'ReactJS'});
};

exports.showTestReactWithoutJSX = function (req, res) {
  res.render('test/testReact2', {title: 'ReactJS'});
};