$(document).ready(function(){
  let tab,
      site,
      limit,
      icon,
      storageObj,
      $main = $("#primary-content")
      $secondary = $("#secondary-content");

  $main.hide();
  $secondary.hide();

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    tab = tabs[0];
    site = ('lm-' + getDomain(tab.url));

    chrome.storage.sync.get(site, function(items) {
      if (items[site]) {
        $main.hide();
        $secondary.show();
      } else {
        $secondary.hide();
        $main.show();
      }
    });

    $('#save').on('click', function() {
      limit = $('#limit').val();
      icon = tab.favIconUrl;
      storageObj = {};
      storageObj[site] = {'limit': limit, 'icon': icon, 'date': new Date().toDateString()};

      chrome.storage.sync.set(storageObj);
    });
  });
});
