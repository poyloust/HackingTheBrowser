console.log("run in bg");

chrome.browserAction.onClicked.addListener(function(){
    console.log("clicked");
    chrome.tabs.executeScript(null,{
        file:"jquery.js"},function(){
            chrome.tabs.executeScript(null,{
                file:"content.js"
            });
        });
});