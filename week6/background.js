console.log("background js running");

var tabodId;
var dailyFolderId;
var dateFolder;
/*
create bookmark root folder for extension
*/
chrome.bookmarks.search({
        'title':'Saved for TabOD'
    },function(matchingFolder){
    //console.log(matchingFolder);
    if(matchingFolder.length == 0){
        chrome.bookmarks.create({
            'title':'Saved for TabOD'
        },function(newFolder){ //after created
            tabodId = newFolder.id;
        });
    }
    else{
        tabodId = matchingFolder[0].id;
        console.log("folder already exists, id is " +tabodId);
    }
});

/*
timing the tab opening time 
*/

var delayInMinutes = 1;

// no need for onCreated listener,  
// or the event will be fired multiple times

chrome.tabs.onUpdated.addListener(function(id,info,tab){
    console.log(tab);
    var title = tab.title;
    var url = tab.url;

    if(url != undefined && info.status == "complete" && tab.status == "complete"){ 
        console.log(id+ ",\"" +url+"\","+title);
        console.log(tab);
        setNewTimer(id,url,title);
    }
});

function setNewTimer(_id,_url,_title){
    chrome.alarms.create(_id.toString(),{
        delayInMinutes
    });
    var t1 = new Date().toISOString();
    console.log(t1 + _id + _url +" set an alarm for "+delayInMinutes+"mins");
    chrome.alarms.onAlarm.addListener(function(){ 
        var ct =  new Date().toISOString();
        console.log(ct+"alarm");
        addBookmark(_url,_title);
        chrome.alarms.clear(_id.toString());
    });
} 


function addBookmark(url,title){
    createDailyFolder();
    setTimeout(function(){
        chrome.bookmarks.create({
            'parentId':dailyFolderId,
            'title':title,
            'url':url
        });
    },1000);
}

function createDailyFolder(){
    var dateNow = new Date();
    dateFolder = (dateNow.getMonth()+1)+"-"+dateNow.getDate();
    chrome.bookmarks.search({
            'title':dateFolder
        },function(matchingFolder){
        //console.log(matchingFolder);
        if(matchingFolder.length == 0){
            chrome.bookmarks.create({
                'parentId':tabodId,
                'title':dateFolder
            },function(dFolder){
                dailyFolderId = dFolder.id;

            console.log("add " + dFolder.title);
            console.log("id is " + dailyFolderId);
            });
        }
        else{
            dailyFolderId = matchingFolder[0].id;
        }
    });
}
// TO DO

//get time
//rename folder
//clear all alarm on closing the tab
//pop up html
//landing page html