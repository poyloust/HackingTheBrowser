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

// no need for onCreated listener,  
// or the event will be fired multiple times

var list = {};
chrome.tabs.onUpdated.addListener(function(id,info,tab){
    if(tab.url != undefined && info.status == "complete" && tab.status == "complete"){ 
        console.log(id+tab.title+tab.url);
        var listNum = parseInt(id);
        clearTimeout(list[listNum]);
        list[listNum] = setTimeout(function(){
            console.log(list[listNum]);
            var title = tab.title;
            var url = tab.url;        
            console.log("settimeout");
            if(url.indexOf("chrome://")<0){
                addBookmark(url,title);
            }
        },10000);
    }
    //delete timeout on remove tab
    chrome.tabs.onRemoved.addListener(function(id){
        var _listNum = parseInt(id);
        clearTimeout(list[_listNum]);
    })
});

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

//clear all alarm on closing the tab
//cssssss