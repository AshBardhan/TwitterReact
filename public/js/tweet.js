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
      if(data.statuses.length > 0) {
        console.log(data.statuses);
        tweetReact.renderTweetData(data.statuses);
      }
    }
    var failure = function (err) {
      console.log(err);
    }
    tweetFlow._sendAjaxRequest(urls.searchTweets, {q: text || 'John Doe'}, 'GET', true, success, failure);
  }
};