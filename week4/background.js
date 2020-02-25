var timer = 7200000;
console.log("bg script");
chrome.tabs.onCreated.addListener(function(cb){
    console.log("CREATE TABB");
    // console.log(cb);
    chrome.tabs.onUpdated.addListener(function(id,info,tab){
        // console.log(tab);
        if(info.status == "complete"){
            console.log(id+ ",\"" +tab.url+"\","+tab.title);
             setTimeout(function(){
                 chrome.tabs.get(id,function(currentTab){
                     console.log(currentTab.active + timer);
                     if(currentTab.active == false){
                        console.log("remove tab\"" +currentTab.url+"\","+currentTab.title);
                        chrome.tabs.remove(id);
                     }
                 });
            }, timer); //settime
        }
    });
});
