var opacity = 0.3;
var allElement = document.querySelectorAll("*");
var body = document.body;
var originalColor;
var batteryLevel;
var charging = false;

navigator.getBattery().then(function(battery){
    function updateAllInfo(){
        updateChargeInfo();
        updateLevelInfo();
    }
    updateAllInfo();

    battery.addEventListener('chargingchange',function(){
        updateChargeInfo();
    });
    function updateChargeInfo(){
        console.log("battery charging?"+(battery.charging ? "Yes":"No"))
    }

    battery.addEventListener('levelchange',function(){
        updateLevelInfo();
        if(batteryLevel < 0.8){
            changePage();
        }
    });
    function updateLevelInfo(){
        batteryLevel = battery.level;
        console.log("battery level" +batteryLevel *100 +"%");
    }
});

function changePage(){
    console.log(batteryLevel);
    opacity = 1-batteryLevel;
    for (var i=0;i<allElement.length;i++){
        allElement[i].style.background = "rgba(0,0,0," + opacity +")";
    }

    body.addEventListener("mouseover",function(event){
        originalColor = event.target.style.color;
        event.target.style.color = "white";
    });
    
    body.addEventListener("mouseout",function(event){
        event.target.style.color = originalColor;
    });
}


if((charging == true)){
    
}
