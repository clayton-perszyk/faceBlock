$(document).ready(function(){
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "showOverlay") {
      $("body").prepend(
        `<div id="my-limit-overlay">
          <div id="my-limit-content">
            <p id="my-limit-text">You Have reached your limit for facebook.com</p>
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
