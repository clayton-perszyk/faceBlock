function toggleButtons(disableButton, enableButton) {
  chrome.permissions.contains({
    permissions: ['notifications']
  }, function(result) {
    if (result) {
      enableButton.hide();
      disableButton.show();
    } else {
      disableButton.hide();
      enableButton.show();
    }
  });
}

$(document).ready(function(){
  var $disableButton = $('#disable_notifications');
  var $enableButton = $('#enable_notifications');

  chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status === "complete" && tabId) {
      toggleButtons($disableButton, $enableButton);
    }
  });

  chrome.tabs.onCreated.addListener(function() {
    toggleButtons($disableButton, $enableButton);
  });

  chrome.tabs.onActivated.addListener(function() {
    toggleButtons($disableButton, $enableButton);
  });

  chrome.windows.onFocusChanged.addListener(function(browserWindow) {
    if (browserWindow != chrome.windows.WINDOW_ID_NONE) {
      toggleButtons($disableButton, $enableButton);
    }
  });


  $('#disable_notifications').on('click', function(e){
    chrome.permissions.remove({
     permissions: ['notifications']
   }, function(result) {
      $disableButton.hide();
      $enableButton.show();
    });
  });

  $('#enable_notifications').on('click', function(e){
    chrome.permissions.request({
     permissions: ['notifications']
    }, function(granted) {
        $enableButton.hide();
        $disableButton.show();
    });
  });
});
