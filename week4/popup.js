var userSelect = document.getElementById("userSelect");
var timerValue;
userSelect.onchange = function(){
    timerValue = userSelect.value;
    console.log(timerValue);
}
console.log(userSelect);

console.log('inlinejs');
// chrome.runtime.getBackgroundPage(function(bgPage){
//     bgPage.timer = 5000;
// });