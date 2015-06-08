var tweetService = require('../services/tweetService');

exports.showHomePage = function (req, res) {
	res.render('home', {title: 'Twitter | Your Home Timeline', pageType: 'home'});
};

exports.showUserPage = function (req, res) {
	var username = req.params.username;
	res.render('user', {title: 'Twitter | ' + username + '\'s Timeline', pageType: 'user', username: username});
};

exports.showSearchPage = function (req, res) {
	var search = decodeURIComponent(req.params.search);
	res.render('search', {
		title: 'Twitter | Searching for Tweets with text \'' + search + '\'',
		pageType: 'search',
		search: search
	});
};

exports.searchTweetFeed = function (req, res) {
	var options = {'count': 10, 'result_type': 'recent'};
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
};

exports.searchHomeTimelineFeed = function (req, res) {
	var options = {'count': 10, 'result_type': 'recent'};
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
	tweetService.searchHomeTimelineFeed(options, success, failure);
};

exports.searchUserTimelineFeed = function (req, res) {
	var options = {'count': 10, 'result_type': 'recent'};
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
	tweetService.searchUserTimelineFeed(options, success, failure);
};

exports.sendStatusUpdate = function (req, res) {
	var options = {};
	var body = req.body;
	if (typeof body !== 'undefined') {
		for (var prop in body) {
			options[prop] = body[prop];
		}
	}
	var success = function (data) {
		res.json(data);
	}
	var failure = function (err) {
		res.status(500).json(err || {status: 'failure'});
	}
	tweetService.sendStatusUpdate(options, success, failure);
};

exports.retweetStatusUpdate = function (req, res) {
	var tweetID = req.body.tweetID;
	var success = function (data) {
		res.json(data);
	}
	var failure = function (err) {
		res.status(500).json(err || {status: 'failure'});
	}
	tweetService.retweetStatusUpdate(tweetID, success, failure);
};


exports.favoriteTweet = function (req, res) {
	var params = {
		id: req.body.tweetID
	};
	var success = function (data) {
		res.json(data);
	}
	var failure = function (err) {
		res.status(500).json(err || {status: 'failure'});
	}
	tweetService.favoriteTweet(params, success, failure);
};