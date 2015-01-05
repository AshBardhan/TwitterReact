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
  updateTweetRender : function(section) {
    var tweetSection = $('#tweet-'+ section);
    tweetSection.removeAttr('id');
    if(section == 'fresh'){
      $('#tweet-list').prepend('<div id="tweet-'+ section +'"><div>');
    } else {
      $('#tweet-list').append('<div id="tweet-'+ section +'"><div>');
    }
  },
  fetchTweets: function (section, text) {
    var success = function (data) {
      if (data.statuses.length > 0) {
        blockMoreFetch = false;
        tweetReact.renderTweetData(data.statuses, section);
        $('#tweet-list').removeClass('hide');
        $('#no-tweet-list, #more-tweets').addClass('hide');
        tweetFlow.updateTweetRender(section);
        $('#more-tweets').attr('maxId',data.statuses[data.statuses.length - 1].id - 1);
      } else {
        blockMoreFetch = true;
        $('#more-tweets').attr('maxId','');
        if(maxId) {
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
      $('#more-tweets').attr('maxId','');
      if(maxId) {
        $('#more-tweets').removeClass('hide').text("That's All Folks");
      } else {
        $('#more-tweets').addClass('hide');
//        $('#tweet-list').addClass('hide').children().remove();
        $('#no-tweet-list').html('No Tweets found<br> Search for something else');
      }
    }
    var maxId = $('#more-tweets').attr('maxId');
    var params = {
      q: text || 'John Doe'
    };
    if(maxId) {
      params.max_id = maxId;
      $('#more-tweets').removeClass('hide').text('Fetching Tweets...');
      $('#no-tweet-list').addClass('hide');
    } else {
      $('#more-tweets').addClass('hide');
      $('#no-tweet-list').removeClass('hide').text('Fetching Tweets...');
    }
    blockMoreFetch = true;
    tweetFlow._sendAjaxRequest(urls.searchTweets, params, 'GET', true, success, failure);
  },
  sendTweet: function (section) {
    var textEle = $('textarea[name=status]');
    if (textEle.val().length > 0 && !textEle.attr('readonly')) {
      var success = function(data){
        console.log(data);
        tweetReact.renderTweetData([data], section);
        tweetFlow.updateTweetRender(section);
        textEle.removeAttr('readonly');
      }
      var failure = function(data){
        console.log(data);
        textEle.removeAttr('readonly');
      }
      textEle.attr('readonly',true);
      tweetFlow._sendAjaxRequest(urls.postTweet, {status: textEle.val()}, 'POST', true, success, failure);
    }
  },
  initTweetBox: function (section) {
    tweetFlow.fetchTweets(section);
    $('textarea[name=status]').on('keyup keypress change', function (e) {
      $('.tweet-chars').html($(this).val().length + ' / 140');
    });
    $('#tweet-btn').on('click', function () {
      tweetFlow.sendTweet(section);
    });
    $(window).scroll(function(){
      var scrollBottom = $(window).height() + $(window).scrollTop();
      var moreTweetTop = $('#more-tweets').offset().top;
      if(scrollBottom >= moreTweetTop && !blockMoreFetch) {
        tweetFlow.fetchTweets('archive');
      }
    });
  }
};