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

    chrome.storage.sync.get(site, function(items) {;
      if (items[site]) {
        $('#views').text(items[site].views);
        $('#get-limit').text(items[site].limit);
        console.log($("#limit").val());
        $main.hide();
        $secondary.show();
      } else {
        $secondary.hide();
        $main.show();
      }
    });

    $('#save').on('click', function() {
      limit = parseInt($('#set-limit').val());
      icon = tab.favIconUrl;
      storageObj = {};
      storageObj[site] = {limit: limit, views: 0, icon: icon, date: new Date().toDateString()};
      chrome.storage.sync.set(storageObj);
      $main.hide();
      $secondary.show();
    });
  });
});
