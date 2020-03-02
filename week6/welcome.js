console.log('welcome.js');
var lists = document.getElementById('bookmarks');
var dateList = [];
var folderCounts;
var linkStorage = {};
var buttons = {};
var deleteBtn = {};
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

        var links = folders[i].children;
        var boxId = folders[i].id;
        var name = i.toString();
        linkStorage[name] = [];

        //create lists for different date folder
        dateList[i] = document.createElement("ul");
        dateList[i].innerHTML = "<div class = \"title\">"+folders[i].title+"</div";
        var _boxId = document.createAttribute('id');
        _boxId.value = boxId.toString();
        dateList[i].setAttributeNode(_boxId);
        lists.appendChild(dateList[i]);

        createButtons(i);

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

function createButtons(i){
    var buttonOpen = document.createElement('button');
        buttonOpen.innerText = "OPEN ALL";
        dateList[i].appendChild(buttonOpen);
        buttonOpen.setAttribute('id',"btn"+i.toString());
        buttonOpen.setAttribute('class',"openBtn");
        
    var buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = "×";
        dateList[i].appendChild(buttonDelete);
        buttonDelete.setAttribute('class',"deleteBtn");
        buttonDelete.setAttribute('id',"del"+i.toString());
}

function addButtonListener(){
    for(var i = 0; i<folderCounts; i++){
        buttons[i] = document.getElementById("btn"+i.toString());
        buttons[i].index =i;
        buttons[i].addEventListener("click", openAllPage);

        deleteBtn[i] = document.getElementById("del"+i.toString());
        deleteBtn[i].index =i;
        deleteBtn[i].addEventListener("click", deleteBox);
    }
    console.log(deleteBtn);
      
}
function openAllPage(){
    //get links for certain day
    var n = linkStorage[this.index]; 
    for(var i = 0; i<n.length; i++){
        chrome.tabs.create({
            'url': n[i].toString()
        });
    }
}
function deleteBox(){
    chrome.bookmarks.removeTree(this.parentNode.id);
    this.parentNode.remove();
}
function test(){
    console.log("test"+ this.index);
}
