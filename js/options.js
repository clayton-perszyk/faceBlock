$(document).ready(function(){
  $('#notifications').on('click', function(e){
    console.log("skd");
    chrome.permissions.request({
     permissions: ['notifications']
    }, function(granted) {});
  });
});
