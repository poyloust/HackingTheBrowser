console.log('welcome.js');
var lists = document.getElementById('bookmarks');
var dateList = [];
var folderCounts;
var linkStorage = {};
var buttons = {};
var targetId;

chrome.bookmarks.search({
    'title':'Saved for TabOD'
},function(matchingFolder){
    targetId = matchingFolder[0].id;
    chrome.bookmarks.getSubTree(targetId,function(results){
        var allFolders = results[0].children; // get childrens in object array
        console.log(allFolders); 
        folderCounts = allFolders.length;
        folderToLists(allFolders);
    });
});

function folderToLists(folders){
    for(var i = 0; i<folders.length; i++){
        dateList[i] = document.createElement("ul");
        dateList[i].innerHTML = folders[i].title;
        lists.appendChild(dateList[i]);

        var buttonOpen = document.createElement('button');
        buttonOpen.innerText = "open all";
        dateList[i].appendChild(buttonOpen);
        buttonOpen.setAttribute('id',"btn"+i.toString());
        var links = folders[i].children;

        var name = i.toString();
        linkStorage[name] = [];

        for(var j = 0; j<links.length; j++){
            var l = document.createElement('a');
            var href = document.createAttribute('href');
            href.value = links[j].url.toString();
            linkStorage[i].push(links[j].url);
            l.innerHTML = "<li>"+links[j].title.toString()+"</li>";
            l.setAttributeNode(href);
            dateList[i].appendChild(l);
        }
    }
    console.log(linkStorage);
    addButtonListener();
}

function addButtonListener(){
    for(var i = 0; i<folderCounts; i++){
        buttons[i] = document.getElementById("btn"+i.toString());
        buttons[i].index =i;
        buttons[i].addEventListener("click", openAllPage);
    }
    console.log(buttons);
      
}
function openAllPage(){
    var n = linkStorage[this.index];
    console.log(n);
    for(var i = 0; i<n.length; i++){
        chrome.tabs.create({
            'url': n[i].toString()
        });
    }
}

function test(){
    console.log("test"+ this.index);
}