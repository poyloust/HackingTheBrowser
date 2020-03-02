var buttons = {};
console.log('test.js')
for(var i = 0; i<10; i++){
    document.addEventListener('DOMContentLoaded', function() {
        buttons[i] = document.getElementById("btn1");
        //buttons[i].addEventListener("click", test);
    });
}
console.log(buttons);


function test(){
    console.log('test');
    }
    