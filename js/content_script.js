$(document).ready(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    let overlay = $("#my-limit-overlay");
    if (request.action === "showOverlay" && overlay.length === 0) {
      $("body").prepend(
        `<div id="my-limit-overlay">
          <div id="my-limit-content">
            <p id="my-limit-text">You have reached your daily limit for ${getDomain(request.displaySite)}</p>
          </div>
        </div>`
      );

      $('body').on({
        "mousewheel": function(e) {
          if (e.target.id == 'el') return;
          e.preventDefault();
          e.stopPropagation();
        },
        "keydown": function(e) {
          if (e.target.id == 'el') return;
          e.preventDefault();
          e.stopPropagation();
        }
      });
    }
  });
});
