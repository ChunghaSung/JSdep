var IsNetscape;

if(navigator.appName == "Netscape")
{ 
    IsNetscape = true;
    document.captureEvents(Event.RESIZE);
} else {
    IsNetscape = false;  
}

var n, I_Sel, J_Sel, IsOver, Moves, MaxMoves, Height, MaxHeight=6, StartTime, EndTime;

Fld = new Array(3);

for (n=0; n<3; n++) {
    Fld[n] = new Array(MaxHeight);
}

Pic = new Array(7);

for (n=0; n<7; n++) {
    Pic[n] = new Image();
    Pic[n].src = "hanoi"+eval(n)+".gif";
}

SPic = new Array(7);
SPic[0] = new Image();
SPic[0].src = "hanoi0.gif";
for (n=1; n<7; n++) {
    SPic[n] = new Image();
    SPic[n].src = "hanoi"+eval(n)+"x.gif";
} 

function SetHeight(hh)
{ 
    Height=hh;
    if (hh==4) {
        MaxMoves=30;
    }
    if (hh==5) {
        MaxMoves=62;
    }
    if (hh==6) {
        MaxMoves=126;
    }
    Init();
} 

function Init()
{ 
    var ii, jj;
    for (ii=0; ii<3; ii++){ 
        for (jj=0; jj<MaxHeight; jj++) {
            Fld[ii][jj]=0;
        }
    }
    for (jj=MaxHeight-Height; jj<MaxHeight; jj++) {
        Fld[0][jj]=jj+Height-5;
    }
    I_Sel=-1;
    Moves=0;
    IsOver=false;
    RefreshScreen();
    Now = new Date();
    StartTime = Now.getTime() / 1000;
}

function Clicked(ii)
{
    var nn, ffrom, tto;
    if (IsOver) {
        return;
    }
    Moves = Moves + 1;
    window.document.MovesForm.Moves.value = eval(Moves)+"/"+eval(MaxMoves);
    if (I_Sel<0) {
        for (jj=0; jj<MaxHeight; jj++) { 
            if (Fld[ii][jj]>0) {
                I_Sel=ii;
                J_Sel=jj;
                RefreshPic(I_Sel, J_Sel);
                return;
            }
        }
        return;
    }
    if (I_Sel==ii){ 
        I_Sel=-1;
        RefreshPic(ii, J_Sel);
        return;
    }
    for (jj=1; jj<MaxHeight; jj++) { 
        if (Fld[ii][jj]>0) { 
            if (Fld[I_Sel][J_Sel]<Fld[ii][jj]) { 
                Fld[ii][jj-1]=Fld[I_Sel][J_Sel];
                Fld[I_Sel][J_Sel]=0;
                RefreshPic(I_Sel, J_Sel);
                RefreshPic(ii, jj-1);
                OverTest();
                I_Sel=-1;
                return;
            }
            else { 
                alert("You can lay a piece only on a bigger one or on an empty place !");
                return;
            }
        }
    }
    Fld[ii][MaxHeight-1]=Fld[I_Sel][J_Sel];
    Fld[I_Sel][J_Sel]=0;
    RefreshPic(I_Sel, J_Sel);
    RefreshPic(ii, MaxHeight-1);
    OverTest();
    I_Sel=-1;
}

function OverTest()
{ 
    var ii, jj;
    IsOver=true;
    for (ii=0; ii<2; ii++) {
        for (jj=0; jj<6; jj++) { 
            if (Fld[ii][jj]>0) {
                IsOver=false;
            }
        }
    }
    if (IsOver) { 
        Now = new Date();
        EndTime = Now.getTime() / 1000;
        ll=Math.floor(EndTime - StartTime);
        if (window.opener) {
            if (window.opener.SetHighscores) { 
                if (Height==4) {
                    window.opener.SetHighscores("Hanoi","small tower",ll,-1);
                }
                if (Height==5) {
                    window.opener.SetHighscores("Hanoi","medium tower",ll,-1);
                }
                if (Height==6) {
                    window.opener.SetHighscores("Hanoi","big tower",ll,-1);
                }
            }
        }
        alert("Super, you solved this game with "+Moves+ " moves in "+ll+ " seconds !");
    }
    return(IsOver);
}

function RefreshPic(ii, jj)
{ 
    if ((ii==I_Sel)&&(jj==J_Sel)) {
        window.document.images[jj*3+ii].src = SPic[Fld[ii][jj]].src;
    }
    else {
        window.document.images[jj*3+ii].src = Pic[Fld[ii][jj]].src; 
    }
}

function RefreshScreen()
{ 
    var ii, jj;
    for (ii=0; ii < 3; ii++) { 
        for (jj=0; jj<MaxHeight; jj++) {
            window.document.images[jj*3+ii].src = Pic[Fld[ii][jj]].src; 
        }
    }
    window.document.MovesForm.Moves.value = eval(Moves)+"/"+eval(MaxMoves);
}

function Resize()
{ 
    if (IsNetscape) {
        history.go(0);
    }
}

function Help()
{ 
    alert("This is the game known as \"Towers of Hanoi\". Your task is to move\nthe tower from the start position (left) to the end position (right). The tower consists of several disks which lay on each other. You can\nmove only such a disk which is on the top of a tower. You can move\nthis disk either to an empty position or on top of a disk which is bigger.\nGood luck!");
}
SetHeight(4);

var body = document.getElementById("body");
body.onresize = Resize;
document.onresize = Resize;

var b0 = document.getElementById("b0");
b0.onclick = Help;

var sm = document.getElementById("small");
var me = document.getElementById("medium");
var bi = document.getElementById("big");
sm.onclick = setHeight;
me.onclick = setHeight;
bi.onclick = setHeight;

var i00 = document.getElementById("i00");
var i01 = document.getElementById("i01");
var i02 = document.getElementById("i02");
var i10 = document.getElementById("i10");
var i11 = document.getElementById("i11");
var i12 = document.getElementById("i12");
var i20 = document.getElementById("i20");
var i21 = document.getElementById("i21");
var i22 = document.getElementById("i22");
var i30 = document.getElementById("i30");
var i31 = document.getElementById("i31");
var i32 = document.getElementById("i32");
var i40 = document.getElementById("i40");
var i41 = document.getElementById("i41");
var i42 = document.getElementById("i42");
var i50 = document.getElementById("i50");
var i51 = document.getElementById("i51");
var i52 = document.getElementById("i52");

i00.onmousedown = Clicked;
i01.onmousedown = Clicked;
i02.onmousedown = Clicked;
i10.onmousedown = Clicked;
i11.onmousedown = Clicked;
i12.onmousedown = Clicked;
i20.onmousedown = Clicked;
i21.onmousedown = Clicked;
i22.onmousedown = Clicked;
i30.onmousedown = Clicked;
i31.onmousedown = Clicked;
i32.onmousedown = Clicked;
i40.onmousedown = Clicked;
i41.onmousedown = Clicked;
i42.onmousedown = Clicked;
i50.onmousedown = Clicked;
i51.onmousedown = Clicked;
i52.onmousedown = Clicked;
