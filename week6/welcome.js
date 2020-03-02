console.log('welcome.js');
var list = document.getElementById('bookmarks');
var date = [];

var targetId;

chrome.bookmarks.search({
    'title':'Saved for TabOD'
},function(matchingFolder){
    targetId = matchingFolder[0].id;
    chrome.bookmarks.getSubTree(targetId,function(results){
        var allFolders = results[0].children; // get childrens in object array
        console.log(allFolders); 
        folderToLists(allFolders);
    });
});

function folderToLists(folders){
    for(var i = 0; i<folders.length; i++){
        date[i] = document.createElement("li");
        list.appendChild(date[i]);
        var links = folders[i].children;
        console.log(links);
        for(var j = 0; j<links.length; j++){
            var url = document.createElement('a');
            // var href = document.createAttribute('href');
            // href.value = links[j].url.toString();
            url.innerHTML = links[j].title.toString();
            // url.setAttributeNode(href);
            date[i].appendChild(url);
        }
    }
}
