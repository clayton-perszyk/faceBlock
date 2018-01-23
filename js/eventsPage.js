function showNotification(items, site, tab) {
  notificationOptions = {
    type: "basic",
    title: "Views updated!",
    message: "you have " + (items[site].limit - items[site].views)+ " views left today for " + getDomain(tab.url) + ".",
    iconUrl: "../temp_logo.png",
    buttons: [{title: "Disable Notifications"}]
  };

  chrome.notifications.create("updated site views", notificationOptions, function(notificationId) {
    chrome.notifications.clear(notificationId);
  });
}

function updateData() {
  let tab,
      site,
      storedDate,
      currentDate,
      notificationOptions,
      updatedStorage = {};

  // chrome.storage.sync.clear();

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    tab = tabs[0];
    site = ('lm-' + getDomain(tab.url));

    chrome.storage.sync.get(site, function(items) {
      if (items[site]) {
        currentDate = new Date().toDateString();
        storedDate = items[site].date;

        if (currentDate === storedDate) {

          if (items[site].views >= items[site].limit) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "showOverlay", displaySite: tab.url}, function(){});
          } else {
            items[site].views++;
            updatedStorage[site] = {limit: items[site].limit, views: items[site].views, icon: items[site].icon, date: items[site].date};
            chrome.storage.sync.set(updatedStorage);

            chrome.permissions.contains({ permissions: ['notifications']}, function(result) {
                if (result) {
                  showNotification(items, site, tab);
                }
            });

          }
        } else {
          updatedStorage[site] = {limit: items[site].limit, views: 0, icon: items[site].icon, date: new Date().toDateString()};
          chrome.storage.sync.set(updatedStorage);
          showNotification(items, site, tab);
        }
      }
    });
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status === "complete" && tabId) {
    updateData();
  }
});

chrome.tabs.onCreated.addListener(function() {
  updateData();
});

chrome.tabs.onActivated.addListener(function() {
  updateData();
});

chrome.windows.onFocusChanged.addListener(function(browserWindow) {
  if (browserWindow != chrome.windows.WINDOW_ID_NONE) {
    updateData();
  }
});

chrome.permissions.contains({ permissions: ['notifications']}, function(result) {
    if (result) {
      chrome.notifications.onButtonClicked.addListener(function(){
        chrome.permissions.remove({
              permissions: ['notifications'],
            }, function(removed) {});
      });
    }
});
