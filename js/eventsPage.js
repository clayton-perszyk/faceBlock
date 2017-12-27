function updateData() {
  let tab,
      site,
      storedDate,
      currentDate,
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
          items[site].views++;
          updatedStorage[site] = {limit: items[site].limit, views: items[site].views, icon: items[site].icon, date: items[site].date};
          chrome.storage.sync.set(updatedStorage);
          if (items[site].views >= items[site].limit) {
            alert("reached yo limit");
          } else {
            alert("you have " + (items[site].limit - items[site].views)+ " views left.");
          }
        } else {
          updatedStorage[site] = {limit: items[site].limit, views: 0, icon: items[site].icon, date: new Date().toDateString()};
        }
      }
    });
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (info.status === "complete") {
    updateData();
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
  updateData();
});

chrome.tabs.onActivated.addListener(function(object, activeInfo) {
  updateData();
});
