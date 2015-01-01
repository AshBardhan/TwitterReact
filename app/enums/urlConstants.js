var API_VERSION = {
  v1: '/api/v1',
  v2: '/api/v2'
};

exports.urls = {
  API: {
    FETCH_TWEETS: API_VERSION.v1 + '/tweet/fetch',
    POST_TWEET: API_VERSION.v1 + '/tweet/post',
    RE_TWEET: API_VERSION.v1 + '/tweet/RT'
  },
  WEB: {
    HOME_PAGE: '/'
  }
}

