console.log("background js running");

var tabodId;

//create bookmark root folder for extension
chrome.bookmarks.search({
        'title':'Saved for TabOD'
    },function(matchingFolder){
    console.log(matchingFolder);
    if(matchingFolder.length == 0){
        chrome.bookmarks.create({
            'title':'Saved for TabOD'
        },function(newFolder){ //after created
            tabodId = newFolder.id;
            console.log("add " + newFolder.title);
            console.log("id is " + tabodId);
        });
    }
    else{
        tabodId = matchingFolder[0].id;
        console.log("folder already exists, id is " +tabodId);
    }
});

//timing the tab opening time

var delayInMinutes = 1;

chrome.tabs.onCreated.addListener(function(){
    console.log("new tab created");
    chrome.tabs.onUpdated.addListener(function(id,info,tab){
        // console.log(tab);
        if(info.status == "complete"){
            console.log(id+ ",\"" +tab.url+"\","+tab.title);
            setTimer(id);
        }
    });
});

function setTimer(_id){
    chrome.alarms.create(_id.toString(),{
        delayInMinutes
    });
    console.log(_id +" set an alarm for "+delayInMinutes+"mins");
    chrome.alarms.onAlarm.addListener(function(){
        console.log("1 min alarm");
    });
} 