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
  fetchTweets: function () {
    var success = function(data) {
      console.log(data);
    }
    var failure = function(err) {
      console.log(err);
    }
    tweetFlow._sendAjaxRequest(urls.searchTweets,{q : 'Real Madrid'},'GET',true,success,failure);
  }
};