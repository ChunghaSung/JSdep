
        var a = document.getElementById('test1');
        var b = document.getElementById('test2');
        var c = document.getElementById('test3');
        var d = document.getElementById('test4');
        var e = document.getElementById('test5');
        var f = document.getElementById('test6');
        var g = document.getElementById('test7');
        var h = document.getElementById('test8');

        var x = 0;
        var y = 0;
        var z = false;
        var t1=0;

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
            } else if (x < 4) {
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
                console.log("x is higher than 20");
            }
            if (y < 2) {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("y is lower than 2");
            } else if (y < 4) {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("y is lower than 4");
            } else if (y < 6) {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("y is lower than 6");
            } else if (y < 8) {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("y is lower than 8");
            } else {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("y is higher than 8");
            }

            if (x+y < 4) {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("x+y is lower than 4");
            } else if (x+y < 8) {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("x+y is lower than 8");
            } else if (x+y < 12) {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("x+y is lower than 12");
            } else if (x+y < 16) {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("x+y is lower than 16");
            } else {
                // I assume there is bunch of lines here...
                t1=2;
                t1=2;
                t1=2;
                t1=2;
                console.log("x+y is higher than 16");
            }
        }

        function what()
        {
            y = y + 1;
        }

        a.addEventListener("click", function() {
            d.onclick = makeSomeNoise;
            x = x + 1;
        });

        b.addEventListener("click", function() {
            e.addEventListener("click", function() {
                if (z) {
                    console.log("z is true!!!");
                } else {
                    console.log ("z is false!!");
                    z = true;
                }
            });
        });

        f.onclick = what;
        c.addEventListener("click", function() {
                console.log ("c is clikced!");
        });

        var gCnt=0;
        g.addEventListener("click", function() {
            gCnt++;
        });

        function printH(t) {
            if (t == 2) {
                t++;
                t++;
                t++;
                console.log("H saturation is not yet");
            } else if (t ==4) {
                t++;
                t++;
                t++;
                console.log("H saturation is not yet");
            } else if (t > 6 ) {
                t++;
                t++;
                t++;
                console.log("H is saturated");
            }
        }
        h.onclick = printH;
