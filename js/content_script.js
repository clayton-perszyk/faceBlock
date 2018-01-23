$(document).ready(function(){
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "showOverlay") {
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
          console.log("asdfkllk");
          if (e.target.id == 'el') return;
          e.preventDefault();
          e.stopPropagation();
        }
      });
    }
  });
});
