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
  fetchTweets: function (text) {
    var success = function (data) {
      if (data.statuses.length > 0) {
        tweetReact.renderTweetData(data.statuses);
        $('#tweet-list').removeClass('hide');
        $('#no-tweet-list').addClass('hide');
      } else {
        $('#tweet-list').addClass('hide').children().remove();
        $('#no-tweet-list').html('No Tweets found<br> Search for something else');
      }
    }
    var failure = function (err) {
      $('#tweet-list').addClass('hide').children().remove();
      $('#no-tweet-list').html('No Tweets found<br> Search for something else');
    }
    $('#no-tweet-list').removeClass('hide').text('Fetching Tweets...');
    tweetFlow._sendAjaxRequest(urls.searchTweets, {q: text || 'John Doe'}, 'GET', true, success, failure);
  },
  sendTweet: function () {
    var textEle = $('textarea[name=status]');
    if (textEle.val().length > 0) {
      var success = function(data){
        console.log(data);
        tweetReact.renderTweetData([data]);
      }
      var failure = function(data){
        console.log(data);
      }
      tweetFlow._sendAjaxRequest(urls.postTweet, {status: textEle.val()}, 'POST', true, success, failure);
    }
  },
  initTweetBox: function () {
    tweetFlow.fetchTweets();
    $('textarea[name=status]').on('keyup keypress change', function (e) {
      $('.tweet-chars').html($(this).val().length + ' / 140');
    });
    $('#tweet-btn').on('click', function () {
      tweetFlow.sendTweet();
    });
  }
};