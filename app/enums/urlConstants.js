var API_VERSION = {
  v1: '/api/v1',
  v2: '/api/v2'
};

exports.urls = {
  API: {
    SEARCH_TWEETS: API_VERSION.v1 + '/tweet/search',
    POST_TWEET: API_VERSION.v1 + '/tweet/post',
    POST_RETWEET: API_VERSION.v1 + '/tweet/RT/post',
    FAV_TWEET: API_VERSION.v1 + '/tweet/fav/post',
    HOME_TIMELINE: API_VERSION.v1 + '/tweet/timeline/home',
    USER_TIMELINE: API_VERSION.v1 + '/tweet/timeline/user'
  },
  WEB: {
    HOME_PAGE: '/',
    USER_PAGE: '/user/:username',
    SEARCH_PAGE: '/search/:search',
    TEST_REACT_JS: '/test/reactJS',
    TEST_REACT_JSX: '/test/reactJSX',
    TEST_TWITTER: '/test/twitter'
  }
};

