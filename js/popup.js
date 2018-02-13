function togglePages(page1, page2, site, displayName) {
  chrome.storage.sync.get(site, function(items) {
    if (items[site]) {
      $('#views').text(items[site].views);
      $('#get-limit').text(items[site].limit);
      $('.site-name').text(displayName);
      page1.hide();
      page2.show();
    } else {
      page2.hide();
      page1.show();
    }
  });
}


$(document).ready(function(){
  let tab,
      site,
      limit,
      icon,
      storageObj,
      currentDate,
      $main = $("#primary-content")
      $secondary = $("#secondary-content");

  $main.hide();
  $secondary.hide();


  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    tab = tabs[0];
    site = ('lm-' + getDomain(tab.url));
    displayName = getDomain(tab.url);

    togglePages($main, $secondary, site, displayName);
    $('.site-name').text(displayName);
    $('#save').on('click', function() {
      limit = parseInt($('#set-limit').val());
      icon = tab.favIconUrl;
      storageObj = {};
      storageObj[site] = {limit: limit, views: 1, icon: icon, date: new Date().toDateString()};
      chrome.storage.sync.set(storageObj);
      togglePages($main, $secondary, site, displayName);
    });
  });
});
