/*** @jsx React.DOM */

var tweetReact = {
  renderTweetData : function(tweets) {
    var Tweet = React.createClass({
      render : function(){
        return (
            <div className='row tweet-item'>
              <div className='col-xs-2 col-sm-1'>
                <div className='tweet-img'>
                  <img src={this.props.imgUrl} />
                </div>
              </div>
              <div className='col-xs-10 col-sm-11'>
                <div className='tweet-user'>@{this.props.username}</div>
                <div className='tweet-msg'>{this.props.text}</div>
              </div>
            </div>
            )
      }
    });

    var TweetList = React.createClass({
      render : function(){
        var tweetItem = this.props.data.map(function(tweet){
          return <Tweet text={tweet.text} username={tweet.user.screen_name} imgUrl={tweet.user.profile_image_url} />
        });
        return (
          <div id='tweet-list'>
            {tweetItem}
          </div>
        )
      }
    });

    React.renderComponent(<TweetList data={tweets} />, document.getElementById('example'));
  }
};