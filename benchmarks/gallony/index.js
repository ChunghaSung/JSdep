var IsNetscape;
if(navigator.appName == "Netscape")
{
    IsNetscape = true;
    document.captureEvents(Event.RESIZE);
} else {
    IsNetscape = false;
}
var n, m, I_Sel, IsOver=true, Moves=0, StartTime, EndTime;
Fld = new Array(4);
LevelMax = new Array(4);
LevelMax[0]=8;
LevelMax[1]=5;
LevelMax[2]=0;
LevelMax[3]=0;
LevelIs = new Array(4);
Pic = new Array(4);
Pic[0]= new Array(LevelMax[0]+1);
for (n=0; n<=LevelMax[0]; n++) 
{
    Pic[0][n] = new Image(); 
    Pic[0][n].src = "gally_8"+eval(n)+".gif";
}
Pic[1]= new Array(LevelMax[1]+1);
for (n=0; n<=LevelMax[1]; n++)
{
    Pic[1][n] = new Image(); 
    Pic[1][n].src = "gally_5"+eval(n)+".gif";
}
//Pic[2] = new Image(); Pic[2].src = "gally_00.gif"; 
Pic[3] = new Array(8);
Pic[3][0] = new Image(); Pic[3][0].src = "gally_01.gif";
Pic[3][1] = new Image(); Pic[3][1].src = "gally_10.gif";
Pic[3][2] = new Image(); Pic[3][2].src = "gally_20.gif";
Pic[3][3] = new Image(); Pic[3][3].src = "gally_30.gif";
Pic[3][4] = new Image(); Pic[3][4].src = "gally_01.gif";
Pic[3][5] = new Image(); Pic[3][5].src = "gally_11.gif";
Pic[3][6] = new Image(); Pic[3][6].src = "gally_21.gif";
Pic[3][7] = new Image(); Pic[3][7].src = "gally_31.gif";
Arrow = new Array(3);
for (n=0; n<3; n++) {
    Arrow[n] = new Array(5);
}
for (n=0; n<3; n++)
{ 
    for (m=0; m<5; m++)
    {
        Arrow[n][m] = new Image(); 
        Arrow[n][m].src = "gallya"+eval(n+1)+eval(m)+".gif"; 
    }
}

function Init()
{ 
    LevelIs[0]=0;
    LevelIs[1]=0;
    LevelIs[2]=0;
    LevelIs[3]=0;
    LevelMax[2]=0;
    LevelMax[3] = (Math.round(Math.random()*1000)) % (LevelMax[0]-1) + 1;
    while (LevelMax[3]==LevelMax[1]) {
        LevelMax[3] = (Math.round(Math.random()*1000)) % (LevelMax[0]-1) + 1;
    }
    I_Sel=-1;
    IsOver=false;
    Moves=0;
    RefreshScreen();
    RefreshValues();
    Now = new Date();
    StartTime = Now.getTime() / 1000;
}

function Clicked(ii)
{
    window.document.forms[0].Moves.focus();
    window.document.forms[0].Moves.blur();
    if (IsOver)
    {
        if (ii=3) {
            Init();
        }
        return;
    }
    if (I_Sel<0)
    { 
        if (ii<3)
        { 
            I_Sel=ii;
            window.document.images[6].src = Arrow[ii][ii+1].src;    
        } else {
            Init();
        }
        return;
    }
    if (ii==I_Sel)
    { 
        I_Sel=-1;
        window.document.images[6].src = Arrow[ii][0].src;   
        return;
    }
    if (ii==3)
    { 
        if ((I_Sel<2)&&(LevelIs[I_Sel]==LevelMax[3]))
        { 
            LevelIs[3]=LevelIs[I_Sel];
            LevelIs[I_Sel]=0;
            Moves++;
            IsOver=true;
            RefreshScreen();
            RefreshValues();
            Now = new Date();
            EndTime = Now.getTime() / 1000;
            n=Math.floor(EndTime - StartTime);
            if (window.opener)
            { 
                if (window.opener.SetHighscores) {
                    window.opener.SetHighscores("Gallony","",n,-1);
                }
            }
            alert("Super, you solved this game with "+Moves+ " moves in "+n+ " seconds !");
        }
        return;    
    }
    if (ii==2)
    { 
        LevelIs[I_Sel]=0;
        window.document.images[I_Sel].src = Pic[I_Sel][LevelIs[I_Sel]].src;  
        window.document.images[6].src = Arrow[ii][0].src;  
        Moves++;
        RefreshValues();
        I_Sel=-1;
        return;
    }
    if (I_Sel==2)
    { 
        LevelIs[ii]=LevelMax[ii];
        window.document.images[ii].src = Pic[ii][LevelIs[ii]].src;    
        window.document.images[6].src = Arrow[ii][0].src;
        Moves++;
        RefreshValues();
        I_Sel=-1;
        return;
    }
    n=LevelMax[ii]-LevelIs[ii];
    if (n>LevelIs[I_Sel]) {
        n=LevelIs[I_Sel];
    }
    LevelIs[I_Sel]-=n;
    LevelIs[ii]+=n;
    window.document.images[I_Sel].src = Pic[I_Sel][LevelIs[I_Sel]].src;    
    window.document.images[ii].src = Pic[ii][LevelIs[ii]].src;    
    window.document.images[6].src = Arrow[ii][0].src;
    Moves++;
    RefreshValues();
    I_Sel=-1;
}

function Select(ii)
{
    if (IsOver) {
        return;
    }
    if (I_Sel<0)
    { 
        if (ii<3) {
            window.document.images[6].src = Arrow[ii][0].src;
        }
    } else {
        if ((I_Sel<2)||(ii<3)) {
            window.document.images[6].src = Arrow[I_Sel][ii+1].src;
        }
    }
}

function RefreshValues()
{
    window.document.forms[0].Moves.value = eval(Moves);
    window.document.forms[0].Level0.value = eval(LevelIs[0]);
    window.document.forms[0].Level1.value = eval(LevelIs[1]);
    window.document.forms[0].Level3.value = eval(LevelMax[3]);
}

function RefreshScreen()
{ 
    var ii1, ii2, ii3;
    ii1=0;
    ii2=LevelMax[3];
    ii3=0;
    if (LevelMax[3]>3)
    {
        ii1=3;
        ii2=LevelMax[3]-3;
    }
    if (LevelMax[3]>6)
    { 
        ii1=3;
        ii2=3;
        ii3=LevelMax[3]-6;
    }
    window.document.images[3].src = Pic[3][4*IsOver+ii1].src;    
    window.document.images[4].src = Pic[3][4*IsOver+ii2].src;    
    window.document.images[5].src = Pic[3][4*IsOver+ii3].src;    
    window.document.images[0].src = Pic[0][LevelIs[0]].src;    
    window.document.images[1].src = Pic[1][LevelIs[1]].src;  
    if (! IsOver) {
        window.document.images[6].src = Arrow[2][0].src;
    }
}

function Resize()
{ 
    if (IsNetscape) {
        history.go(0);
    }
}

function Help()
{ 
    alert("If you give some water to the flowers,"+"\nthey will grow like after showers!"+"\nFor every bloom you need exactly one gallon of water."+"\nYou have two pots which you can fill with water from"+"\nthe well or you can pour the water from one pot into"+"\nanother until you have the required quantity of water."+"\nGood luck!");
}
Init();

document.onresize=Resize;

var c0 = document.getElementById("c0");
c0.onclick=Help;

var b0 = document.getElementById("b0");
b0.onmouseover = Select;
b0.onclick = Clicked;
var b1 = document.getElementById("b1");
b1.onmouseover = Select;
b1.onclick = Clicked;
var b2 = document.getElementById("b2");
b2.onmouseover = Select;
b2.onclick = Clicked;
var b3 = document.getElementById("b3");
b3.onmouseover = Select;
b3.onclick = Clicked;
var b4 = document.getElementById("b4");
b4.onmouseover = Select;
b4.onclick = Clicked;
var b5 = document.getElementById("b5");
b5.onmouseover = Select;
b5.onclick = Clicked;
