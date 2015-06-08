var blockMoreFetch = true;

var tweetFlow = {
	_sendAjaxRequest: function (rqUrl, rqData, methodType, async, success, failure, dataType, contentType) {
		$.ajax({
			url: rqUrl,
			type: methodType,
			data: rqData,
			dataType: "JSON",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			cache: false,
			async: async,
			success: function (data) {
				success(data);
			},
			error: function (err) {
				failure(err);
			}
		});
	},
	updateTweetRender: function (section) {
		var tweetSection = $('#tweet-' + section);
		tweetSection.removeAttr('id');
		if (section == 'fresh') {
			$('#tweet-list').prepend('<div id="tweet-' + section + '"><div>');
		} else {
			$('#tweet-list').append('<div id="tweet-' + section + '"><div>');
		}
	},
	fetchTweets: function (section, pageType, username, searchText) {
		var success = function (data) {
			var tweetList = data.statuses ? data.statuses : data;
			if (tweetList.length > 0) {
				blockMoreFetch = false;
				tweetReact.renderTweetData(tweetList, section);
				$('#tweet-list').removeClass('hide');
				$('#no-tweet-list, #more-tweets').addClass('hide');
				tweetFlow.updateTweetRender(section);
				$('#more-tweets').attr('maxId', tweetList[tweetList.length - 1].id - 1);
			} else {
				blockMoreFetch = true;
				$('#more-tweets').attr('maxId', '');
				if (maxId) {
					$('#more-tweets').removeClass('hide').text("That's All Folks");
				} else {
					$('#more-tweets').addClass('hide');
//          $('#tweet-list').addClass('hide').children().remove();
					$('#no-tweet-list').html('No Tweets found<br> Search for something else');
				}
			}
		}
		var failure = function (err) {
			blockMoreFetch = true;
			$('#more-tweets').attr('maxId', '');
			if (maxId) {
				$('#more-tweets').removeClass('hide').text("That's All Folks");
			} else {
				$('#more-tweets').addClass('hide');
//        $('#tweet-list').addClass('hide').children().remove();
				$('#no-tweet-list').html('No Tweets found<br> Search for something else');
			}
		}
		var maxId = $('#more-tweets').attr('maxId');
		var params = {
			q: searchText || 'JavaScript'
		};
		if (username && username !== '') {
			params.screen_name = username;
		}
		if (maxId) {
			params.max_id = maxId;
			$('#more-tweets').removeClass('hide').text('Fetching Tweets...');
			$('#no-tweet-list').addClass('hide');
		} else {
			$('#more-tweets').addClass('hide');
			$('#no-tweet-list').removeClass('hide').text('Fetching Tweets...');
		}
		blockMoreFetch = true;
		tweetFlow._sendAjaxRequest(pageType == 'home' ? urls.homeTimeline : (pageType == 'user') ? urls.userTimeline : urls.searchTweets, params, 'GET', true, success, failure);
	},
	sendTweet: function (section, pageType) {
		var textEle = $('textarea[name=status]');
		var tweetID = $('#tweetModal #tweet-btn').attr('tweetID') || '';
		if (textEle.val().length > 0 && !textEle.attr('readonly')) {
			var success = function (data) {
				console.log(data);
				if (pageType === 'home') {
					tweetReact.renderTweetData([data], section);
					tweetFlow.updateTweetRender(section);
				}
				$('#tweetModal .modal-body').addClass('hide');
				$('#tweetModal .modal-alert').removeClass('hide').html('Your Tweet has been posted');
				textEle.removeAttr('readonly');
			}
			var failure = function (data) {
				console.log(data);
				$('#tweetModal .modal-body').addClass('hide');
				$('#tweetModal .modal-alert').removeClass('hide').html('Your Tweet was not posted due to some problems <br/> Please try again');
				textEle.removeAttr('readonly');
			}
			textEle.attr('readonly', true);
			tweetFlow._sendAjaxRequest(urls.postTweet, {
				status: textEle.val(),
				in_reply_to_status_id: tweetID
			}, 'POST', true, success, failure);
		}
	},
	replyTweet: function (tweetID, tweetUsername) {
		$('#tweetModal .modal-body').removeClass('hide');
		$('#tweetModal .modal-alert').addClass('hide');
		$('#tweetModal textarea').val('@' + tweetUsername + ' ');
		$('#tweetModal #tweet-btn').attr('tweetID', tweetID);
		$('#tweetModal .tweet-chars').text((tweetUsername.length + 2) + ' / 140');
		$('#tweetModal').modal({backdrop: 'static', keyboard: true});
	},
	favoriteTweet: function (tweetID, favButton) {
		if (!favButton.hasClass('done')) {
			var success = function (data) {
				favButton.addClass('done');
			}
			var failure = function (data) {
				console.log(data);
			}
			tweetFlow._sendAjaxRequest(urls.postfavTweet, {tweetID: tweetID}, 'POST', true, success, failure);
		}
	},
	reTweet: function (tweetID, retweetButton) {
		if (!retweetButton.hasClass('done')) {
			var success = function (data) {
				retweetButton.addClass('done');
			}
			var failure = function (data) {
				console.log(data);
			}
			tweetFlow._sendAjaxRequest(urls.postRetweet, {tweetID: tweetID}, 'POST', true, success, failure);
		}
	},
	initModal: function () {
		$(document).keyup(function (e) {
			if (e.which == 27 && $('#tweetModal').is(':visible')) {
				$('#tweetModal').modal('hide');
				$('#tweetModal textarea').val('');
				$('#tweetModal .tweet-chars').text('0 / 140');
				$('#tweetModal #tweet-btn').removeAttr('tweetID')
			}
		});
		$('#tweetModal').on('shown', function () {
			$(this).find('textarea[autofocus]').focus();
		});
	},
	initTweetBox: function (section, pageType, username, searchText) {
		tweetFlow.fetchTweets(section, pageType, username, searchText);
		tweetFlow.initModal();
		$('textarea[name=status]').on('keyup keypress change', function (e) {
			$('.tweet-chars').html($(this).val().length + ' / 140');
		});
		$('#tweet-btn').on('click', function () {
			tweetFlow.sendTweet(section, pageType);
		});
		$(window).scroll(function () {
			var scrollBottom = $(window).height() + $(window).scrollTop();
			var moreTweetTop = $('#more-tweets').offset().top;
			if (scrollBottom >= moreTweetTop && !blockMoreFetch) {
				tweetFlow.fetchTweets('archive', pageType, username, searchText);
			}
		});
		$('#tweetSearch').on('keyup', function (e) {
			var text = $(this).val();
			if (e.which == 13 && text.length > 0) {
				location.href = '/search/' + encodeURIComponent(text);
			}
		});
		$('#tweet-list').on('click', '.tweet-actions .tweet-img-sprite', function () {
			var button = $(this);
			var tweetID = button.attr('data-id');
			var buttonType = button.attr('type');
			if (buttonType === 'retweet') {
				tweetFlow.reTweet(tweetID, button);
			} else if (buttonType === 'favorite') {
				tweetFlow.favoriteTweet(tweetID, button);
			} else {
				var username = button.attr('data-username');
				tweetFlow.replyTweet(tweetID, username);
			}
		});
		$('.btn[name=home]').on('click', function () {
			location.href = '/';
		});
		$('.btn[name=composeTweet]').on('click', function () {
			$('#tweetModal .modal-body').removeClass('hide');
			$('#tweetModal .modal-alert').addClass('hide');
			$('#tweetModal').modal({backdrop: 'static', keyboard: true});
		});
	}
};