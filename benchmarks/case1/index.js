var c=false;
var x = 1;
var y = 1;
var a = 1;
var b1 = document.getElementById('test1');
b1.addEventListener("click", function(evt) {
    c = true;
});
var b2 = document.getElementById('test2');
function d1(evt)
{
    if (c) {
        x = x + 1;
        console.log(x);
        if (x>5) {
            // I assume there is bunch of lines here...
            a=2;
            a=2;
            a=2;
            a=2;
            a=2;
            a=2;
            a=2;
            a=2;
            a=2;
            console.log("make an error!");
        }
    } else {
        // I assume there is bunch of lines here...
        a=2;
        a=2;
        a=2;
        a=2;
        a=2;
        a=2;
        a=2;
        a=2;
        a=2;
        y = y + 1;
    }
}
d2 = d1;
b2.onclick = d2; 
