console.log('inlinejs');

var userSelect = document.getElementById("userSelect");
var timerValue;
userSelect.onchange = function(){
    timerValue = userSelect.value;
    console.log(timerValue);
    chrome.runtime.getBackgroundPage(function(bgPage){
        bgPage.timer = timerValue;
        console.log(bgPage.timer);
    });
}

