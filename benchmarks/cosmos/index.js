var l, n, m, IsOver, Max=4, num_of_try, num_of_obj, StartTime, EndTime;

symbol = new Array(5);
fld = new Array(11);
for (n=0; n < 10; n++)
{
    fld[n]=new Array(8); 
} 

Pic = new Array(10);
for (l=0; l < 10; l++)
{ 
    Pic[l] = new Image(); 
    Pic[l].src = "cosmos"+eval(l)+".gif"; 
} 

function SetSize(ll)
{
    if (Max!=ll)
    { 
        Max=ll;
        Init();
    }
} 

function Clicked(nn)
{ 
    if (IsOver) {
        return;
    }
    fld[num_of_try][num_of_obj++]=nn;
    if (num_of_obj==Max) {
        Evaluate();
    } else {
        RefreshScreen();
    }
} 

function Show()
{
    if (num_of_try>0)
    { 
        if (fld[num_of_try-1][5+Max-1]==8)
        { 
            alert("Everything's okay.");
            return;
        }
    }
    if ((num_of_try<Max+3)&(!IsOver))
    { 
        for (i=0; i<Max; i++) {
            fld[num_of_try][i]=symbol[i];
        }
        RefreshScreen();
        alert("Show is not solve !");
    }
    if ((num_of_try==Max+3)&&(fld[3+Max-1][5+Max-1]!=8)) {
        alert("Too late !");
    }
    IsOver=true;
}

function Init()
{ 
    symbol[0]=Math.round(Math.random()*100) % 7 + 1;
    for (n=1; n<Max; n++)
    { 
        l=Math.round(Math.random()*100) % 7 + 1;
        for (m=0; m<n; m++)
        { 
            if (l==symbol[m]) {
                l=0;
            }
        }
        if (l>0) {
            symbol[n]=l;
        }
        while (l==0) {
            l=Math.round(Math.random()*100) % 7 + 1;
            for (m=0; m<n; m++)
            { 
                if (l==symbol[m]) {
                    l=0;
                }
            }
            if (l>0){
                symbol[n]=l;
            }
        }
    }
    for (n=0; n<8; n++)
    { 
        for (m=0; m<10; m++) {
            fld[n][m]=0;
        }
    }
    num_of_try=0;
    num_of_obj=0;
    IsOver=false;
    RefreshScreen(); 
    Now = new Date();
    StartTime = Now.getTime() / 1000; 
}

function Evaluate()
{ 
    var ii, bb=0, ww=0;
    for (n=0; n<Max; n++)
    { 
        if (fld[num_of_try][n]==symbol[n]) {
            bb++;
        } else {
            m=-1;
            m++;
            while ((m<Max-1)&&(fld[num_of_try][n]!=symbol[m])) {
                m++;
            }
            if (fld[num_of_try][n]==symbol[m]) {
                ww++;
            }
        }
    }
    m=4;
    if (bb>0)
    { 
        for (n=0; n<bb; n++)
        {
            m++;
            fld[num_of_try][m]=8;
        }
    }
    if (ww>0)
    { 
        for (n=0; n<ww; n++)
        { 
            m++;
            fld[num_of_try][m]=9;
        }
    }
    num_of_try++;
    num_of_obj=0;
    RefreshScreen();
    if (bb==Max)
    {
        IsOver=true;
        if (num_of_try==1) {
            m="That doesn't count !";
        }
        if (num_of_try==2) {
            m="Parapsychic !";
        }
        if (num_of_try==4) {
            m="Mastermind !";
        }
        if (num_of_try==Max) {
            m="Genius !";
        }
        if (num_of_try==3) {
            m="Lucky guy !";
        }
        if (num_of_try==Max+1) {
            m="Good combination !";
        }
        if (num_of_try==Max+2) {
            m="Not bad !";
        }
        if (num_of_try==Max+3) {
            m="Correct solution !";
        }
        if ((num_of_try>1)&&(window.opener)) {
            Now = new Date();
        }
        EndTime = Now.getTime() / 1000;
        ii=Math.floor(EndTime - StartTime);
        if (window.opener.SetHighscores) {
            window.opener.SetHighscores("Cosmos",Max+" of 7",ii,-1);
        }

        alert(m+"\nYou solved this game in "+ii+" seconds!");
    }
    if ((bb<Max)&(num_of_try==Max+3))
    { 
        IsOver=true;
        alert("It's not your best day !");
    }
}

function RefreshScreen()
{ 
    for (m=0; m < 8; m++)
    { 
        for (n=0; n < 10; n++)  {
            window.document.images[10*m+n].src = Pic[fld[m][n]].src;
        }
    }
}

function Help()
{
    alert("This is a variant of the well-known game Mastermind."+"\nThe computer has selected 3, 4 or 5 of the 7 objects"+"\nfrom the right side (max.1 of each type). Your task is"+"\nto find out these objects in the right order. To select"+"\nan object click on it by mouse. You will get a filled"+"\ncircle for a correct object that is at the correct place"+"\nand an empty circle if the position isn't right."+"\nYou can try up to seven times. Good luck!");
}
Init();

var r1 = document.getElementById("r1");
r1.onmousedown=Clicked;
var r2 = document.getElementById("r2");
r2.onmousedown=Clicked;
var r3 = document.getElementById("r3");
r3.onmousedown=Clicked;
var r4 = document.getElementById("r4");
r4.onmousedown=Clicked;
var r5 = document.getElementById("r5");
r5.onmousedown=Clicked;
var r6 = document.getElementById("r6");
r6.onmousedown=Clicked;
var r7 = document.getElementById("r7");
r7.onmousedown=Clicked;

var c0 = document.getElementById("c0");
c0.onclick = SetSize;
var c1 = document.getElementById("c1");
c1.onclick = SetSize;
var c2 = document.getElementById("c2");
c2.onclick = SetSize;

var b0 = document.getElementById("b0");
b0.onclick=Init;
var b1 = document.getElementById("b1");
b1.onclick=Show;
var b2 = document.getElementById("b2");
b2.onclick=Help;
