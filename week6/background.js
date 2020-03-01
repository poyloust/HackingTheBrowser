console.log("background js running");

//create bookmark root folder for extension
chrome.bookmarks.search({
        'title':'SavedForTabOD'
    },function(matchingFolder){
    console.log(matchingFolder);
    if(matchingFolder.length == 0){
        chrome.bookmarks.create({
            'title':'SavedForTabOD'
        },function(newFolder){ //after created
            console.log("add " + newFolder.title);
            console.log("id is " + newFolder.id);
        });
    }
    else{
        console.log("folder already exists");
    }
});