// Dependency relationship
// test1 -> test3
// test2 -> test3
// test2 -> tese2
// test4 nothing
var a = document.getElementById('test1');
var b = document.getElementById('test2');
var c = document.getElementById('test3');
var d = document.getElementById('test4');
var t1 = 0;
var x = 0;
function makeSomeNoise() {
    if (x < 2) {
        // I assume there is bunch of lines here...
        t1=2;
        t1=2;
        t1=2;
        t1=2;
        console.log("x is lower than 2");
    } else if (x < 4) {
        // I assume there is bunch of lines here...
        t1=2;
        t1=2;
        t1=2;
        t1=2;
        console.log("x is lower than 4");
    } else if (x < 6) {
        // I assume there is bunch of lines here...
        t1=2;
        t1=2;
        t1=2;
        t1=2;
        console.log("x is lower than 6");
    } else if (x < 8) {
        // I assume there is bunch of lines here...
        t1=2;
        t1=2;
        t1=2;
        t1=2;
        console.log("x is lower than 8");
    } else {
        // I assume there is bunch of lines here...
        t1=2;
        t1=2;
        t1=2;
        t1=2;
        console.log("x is higher than 8");
    }
}
a.addEventListener("click", function() {
    c.onclick = makeSomeNoise;
});

b.addEventListener("click", function() {
    x = x + 1;
});

d.addEventListener("click", function() {
    console.log("d is clikced!");
});
