var m = require('mithril');

var xhrConfig = function(xhr) {
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Accept', 'application/vnd.lichess.v1+json');
};

function uncache(url) {
  return url + '?_=' + new Date().getTime();
}

module.exports = {

  reload: function(baseUrl, id, chapterId) {
    var url = '/' + baseUrl + '/' + id;
    if (chapterId) url += '/' + chapterId;
    return m.request({
      method: 'GET',
      url: uncache(url),
      config: xhrConfig,
      background: true
    });
  },

  variants: function() {
    return m.request({
      method: 'GET',
      url: '/variant',
      config: xhrConfig,
      background: true
    });
  },

  glyphs: function() {
    return m.request({
      method: 'GET',
      url: '/glyphs',
      config: xhrConfig,
      background: true
    });
  },

  chapterConfig: function(studyId, chapterId) {
    return m.request({
      method: 'GET',
      url: uncache(['/study', studyId, chapterId, 'meta'].join('/')),
      config: xhrConfig,
      background: true
    });
  },

  practiceComplete: function(chapterId, nbMoves) {
    return m.request({
      method: 'POST',
      url: ['/practice/complete', chapterId, nbMoves].join('/'),
      config: xhrConfig,
      background: true
    });
  }
};
