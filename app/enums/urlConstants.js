var API_VERSION = {
  v1: '/api/v1',
  v2: '/api/v2'
};

exports.urls = {
  API: {
    SEARCH_TWEETS: API_VERSION.v1 + '/tweet/search',
    POST_TWEET: API_VERSION.v1 + '/tweet/post',
    RE_TWEET: API_VERSION.v1 + '/tweet/RT'
  },
  WEB: {
    HOME_PAGE: '/',
    TEST_REACT_JS: '/test/reactJS',
    TEST_REACT_JSX: '/test/reactJSX',
    TEST_TWITTER: '/test/twitter'
  }
};

