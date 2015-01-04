/*** @jsx React.DOM */

var tweetReact = {
  renderTweetData : function(tweets) {
    var Tweet = React.createClass({
      render : function(){
        return (
            <li class='tweet-item'>
              <h2>@{this.props.username}</h2>
              <div class='tweet-msg'>{this.props.text}</div>
            </li>
            )
      }
    });

    var TweetList = React.createClass({
      render : function(){
        var tweetItem = this.props.data.map(function(tweet){
          return <Tweet text={tweet.text} username={tweet.user.screen_name} />
        });
        return (
          <ul id='tweet-list'>
            {tweetItem}
          </ul>
        )
      }
    });

    React.renderComponent(<TweetList data={tweets} />, document.getElementById('example'));
  }
};