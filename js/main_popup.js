$(document).ready(function(){
  let tab,
      site,
      limit,
      icon,
      storageObj;

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    tab = tabs[0];
    site = ('lm-' + getDomain(tab.url));

    // check if website in storage
    chrome.storage.sync.get(site, function(items) {
      // if in storage show secondary_popup
        //else show main_popup
      console.log(site);
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
