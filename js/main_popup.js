// check if website in storage
  // if in storage show secondary_popup
  //else show main_popup

// In main_popup
// get limit value and website name and icon and store along with date
$(document).ready(function(){
  let tab;

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    tab = tabs[0];

    $('#save').on('click', function() {
      console.log(tab);

      chrome.storage.sync.get('website')
    });
  });



});
