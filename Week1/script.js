var opacity = 0.3;
var allElement = document.querySelectorAll("*");
var body = document.getElementById("b");
var originalColor;
var batteryLevel;
var charging = false;
var annoying = document.getElementById("annoying");

navigator.getBattery().then(function(battery){
    function updateAllInfo(){
        updateChargeInfo();
        updateLevelInfo();
    }
    updateAllInfo();


    battery.addEventListener('levelchange',function(){
        updateLevelInfo();
    });
    function updateLevelInfo(){

        batteryLevel = battery.level;
        console.log("battery level" +batteryLevel *100 +"%");
        if(battery.level < 0.5){
            changePage();
        }
    }
    battery.addEventListener('chargingchange',function(){
        updateChargeInfo();
    });
    function updateChargeInfo(){
        console.log("battery charging?"+(battery.charging ? "Yes":"No"));
    }

});

function changePage(){
    annoying.style.display = "block";
    console.log(batteryLevel);
    opacity = 1-batteryLevel;
    document.body.style.background = "rgba(0,0,0," + opacity +")";
    // for (var i=0;i<allElement.length;i++){
    //     allElement[i].style.background = "rgba(0,0,0," + opacity +")";
    // }

    body.addEventListener("mouseover",function(event){
        originalColor = event.target.style.color;
        event.target.style.color = "white";
    });
    
    body.addEventListener("mouseout",function(event){
        event.target.style.color = originalColor;
    });
}

window.addEventListener("scroll", function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
       console.log("you're at the bottom of the page");
       clone();
       //show loading spinner and make fetch request to api
    }
 });
 function clone(){
     var cloneItem = document.getElementById("c").cloneNode(true);
     var clone = document.getElementById("clone");
     clone.appendChild(cloneItem);
 }