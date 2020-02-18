console.log("contentjs");
var newText;
$('h1,h2,h3,h4,h5,h6,span,p,b,button,li,text').each(function () {
    var thisText = $(this).text();
    reverseText(thisText); $(this).html(newText);
});
$('img,video').css("transform", "scaleX(-1)");
function reverseText(text) {
    var wordsArr = text.split(" ");
    for (i = 0; i < wordsArr.length; i++) {
        var thisWord = Array.from(wordsArr[i]).reverse();
        var reversedWord = thisWord.join('').toLowerCase();
        wordsArr[i] = reversedWord;
    }
    newText = wordsArr.join(' ');
    return newText;
} 
