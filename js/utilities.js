function getDomain(url) {
  var start = url.indexOf('/') + 2;
  var end = url.length
  var domain = '';
  var urlArray = url.substr(start, end).split('');

  for (var i = 0; i < urlArray.length; i++) {
     if (urlArray[i] !== '/') {
      domain += urlArray[i];
    } else {
      return domain;
    }
  }

  return domain;
}
