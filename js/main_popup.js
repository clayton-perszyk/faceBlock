// In main_popup
// get limit value and website name and icon and store along with date

// websites : [
//     {name: facebook, limit: 2, icon: "http://...", date: '12/21/2001'},
//     {name: facebook, limit: 2, icon: "http://...", date: '12/21/2001'},
//     {name: facebook, limit: 2, icon: "http://...", date: '12/21/2001'}
// ];

// lm-facebook : {limit: 3, icon:  "http://...", date: '12/21/2001'}


$(document).ready(function(){
  let tab,
      site,
      limit,
      icon,
      storageObj;


  // check if website in storage
   // if in storage show secondary_popup
    //else show main_popup

  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    tab = tabs[0];



    $('#save').on('click', function() {
      // console.log(tab);
      site = ('lm-' + getDomain(tab.url));
      limit = $('#limit').val();
      icon = tab.favIconUrl;
      storageObj = {};
      storageObj[site] = {'limit': limit, 'icon': icon, 'date': new Date().toDateString()};
      console.log(storageObj)



      // save name, limit, icon, date in storage
      chrome.storage.sync.set(storageObj);

      chrome.storage.sync.get('lm-www.facebook.com', function(items) {
        console.log("before: " + items['lm-www.facebook.com']['date']);
      });

      chrome.storage.sync.remove('lm-www.facebook.com', function(){
        console.log("removed");
      });

      chrome.storage.sync.get('lm-www.facebook.com', function(items) {
        if (items['lm-www.facebook.com']){
          console.log("after: " + items['lm-www.facebook.com']['date']);
        } else {
          console.log("after: not here.");
        }
      });
    });
  });



});
