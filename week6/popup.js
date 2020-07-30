console.log("popup.js");


var userSelect = document.getElementById("userSelect");
var timerValue;
var oldTimer;
var newTimer;

var stopBtn = document.getElementById('stop');
var resBtn = document.getElementById('resume');
var switchOn;

getSettings();

// get the form value 
// then pass it to bg.js
console.log(userSelect);
userSelect.onchange = function(){
    timerValue = userSelect.value;
    // console.log("user selected time:" +timerValue);
    chrome.runtime.getBackgroundPage(function(bgPage){
        bgPage.timingWindow = timerValue;
        console.log("timer on bg.js is set to:" + bgPage.timingWindow);
        changeSelectedOption(bgPage.timingWindow);
    });
}

function changeSelectedOption(val){
    console.log(oldTimer);
    oldTimer.selected = false;
    newTimer = document.getElementById(val.toString());
    console.log(newTimer);
    newTimer.selected = 'selected';
    oldTimer = newTimer;
}

function getSettings(){
    chrome.runtime.getBackgroundPage(function(bg){
        timerValue = bg.timingWindow;
        switchOn = bg.masterControl;
        console.log('GET SETTINGS, timer:'+ timerValue + "switch" +switchOn);
        oldTimer = document.getElementById(timerValue.toString());
        oldTimer.selected = true;
    });
}

stopBtn.onclick = function(){
    console.log('press stop');
    switchOn = false;
    chrome.runtime.getBackgroundPage(function(bgPage){
        bgPage.masterControl = switchOn;
    });

}
resBtn.onclick = function(){
    console.log('press resume');
    switchOn = true;
    chrome.runtime.getBackgroundPage(function(bgPage){
        bgPage.masterControl = switchOn;
    });
}
