chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "showOverlay") {
    alert("limit reached!");
  }
});
