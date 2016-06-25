var IsNetscape;
if(navigator.appName == "Netscape")
{ 
    IsNetscape = true;
  document.captureEvents(Event.RESIZE)
} else {
    IsNetscape = false;  
}
var n, I_Sel, IsOver=false, IsAnimation=false, Moves=0, MaxMoves, IsRepeat;
var Type=2, Max=8, StartTime, EndTime;
Fld = new Array(10);
PreFld = new Array(10);
Move = new Array(10);
Pic = new Array(5);
Pic[0] = new Image(); Pic[0].src = "china_r.gif"; 
Pic[1] = new Image(); Pic[1].src = "china_v.gif"; 
Pic[2] = new Image(); Pic[2].src = "china_b.gif"; 
Pic[3] = new Image(); Pic[3].src = "china_t2.gif"; 
Pic[4] = new Image(); Pic[4].src = "china_s2.gif"; 

function ChangeType()
{ 
    if (Type==2) {
        Type=3;
    }
  else {
      Type=2;
  }
  Init(2);
} 

function GetMaxMove(mm)
{
    var cc, kk, nn=mm-1;
  for (kk=0; (kk<Max-1)&&(!IsOver); kk++)
  {
      I_Sel=kk;
    Move[MaxMoves-mm]=kk;
    cc=Pressed();
    if (cc>=0)
    { 
        if (mm<=1) {
            OverTest();
        }
      else {
          GetMaxMove(nn);
      }
      I_Sel=cc;
      Pressed();
    }
  }
}

function Init(nn)
{ 
    var ii, jj, mm;
      for (ii=0; ii<Max; ii++) {
      Fld[ii]=(Math.round(Math.random()*100)%Type)+1;
      }
    ii=Math.round(Math.random()*100)%(Max-1);
    Fld[ii]=0;
    Fld[ii+1]=0;

    if (nn==2)
    { 
        for (ii=0; ii<Max; ii++) {
        PreFld[ii]=Fld[ii];
        }
    }
    else
    { 
        for (ii=0; ii<Max; ii++) {
	Fld[ii]=PreFld[ii];
        }
    }
    OverTest();
    for (jj=0; jj<Type; jj++)
    { 
        mm=0;
      for (ii=0; ii<Max; ii++) {
        if  (Fld[ii]==jj+1) {
            mm++;
        }
      }
      if (mm<2) {
          IsOver=true;
      }
    }
  while(IsOver) {
      for (ii=0; ii<Max; ii++) {
      Fld[ii]=(Math.round(Math.random()*100)%Type)+1;
      }
    ii=Math.round(Math.random()*100)%(Max-1);
    Fld[ii]=0;
    Fld[ii+1]=0;

    if (nn==2)
    { 
        for (ii=0; ii<Max; ii++) {
        PreFld[ii]=Fld[ii];
        }
    }
    else
    { 
        for (ii=0; ii<Max; ii++) {
	Fld[ii]=PreFld[ii];
        }
    }
    OverTest();
    for (jj=0; jj<Type; jj++)
    { 
        mm=0;
      for (ii=0; ii<Max; ii++) {
        if  (Fld[ii]==jj+1) {
            mm++;
        }
      }
      if (mm<2) {
          IsOver=true;
      }
    }
  }
  if (nn==2)
  { 
      MaxMoves=0;
    GetMaxMove(++MaxMoves);
    while ((!IsOver)&&(MaxMoves<=9)) {
    GetMaxMove(++MaxMoves);
    }
    IsRepeat=false;
  }
  else {
      IsRepeat=true;
  }
  I_Sel=0;
  Moves=0;
  IsOver=false;
  RefreshScreen();
  if (nn==1)
  { 
      alert("Show is not solve !");
    IsOver=true;
    IsAnimation=true;
  }
  Now = new Date();
  StartTime = Now.getTime() / 1000;
}

function Pressed()
{ 
    var ii=-1;
  if ((Fld[I_Sel]==0)||(Fld[I_Sel+1]==0)) {
      return(-1);
  }
  ii++;
  while (Fld[ii]!=0) {
      ii++;
  }
  Fld[ii]=Fld[I_Sel];
  Fld[ii+1]=Fld[I_Sel+1];
  Fld[I_Sel]=0;
  Fld[I_Sel+1]=0;
  return(ii);
}

function Clicked()
{ 
    document.forms[0].ShowButton.focus();
  document.forms[0].ShowButton.blur();
  if (IsOver)  {
      return;
  }
  if (Pressed()<0) {
      return;
  }
  Moves++;
  OverTest();
  RefreshScreen(); 
  if (IsOver) 
  { 
      Now = new Date();
    EndTime = Now.getTime() / 1000;
    ll=Math.floor(EndTime - StartTime);
    if (! IsRepeat)
    { 
        if (window.opener)
      { 
          if (window.opener.SetHighscores)
        { 
            if (Type==2) {
                window.opener.SetHighscores("ChinaBox","2 colors",ll,-1);
            } else {
                window.opener.SetHighscores("ChinaBox","3 colors",ll,-1);
            }
        }
      }
    }
    alert("Super, you solved this game with "+Moves+ " moves in "+ll+ " seconds !");
  }
}

function OverTest()
{ 
    var ii, cc, mm=1;
  IsOver=true;
  for (ii=0; ii<Max; ii++)
  { 
      cc=Fld[ii];
      if (cc>0)
    { 
        if (cc<mm) {
            IsOver=false;
        }
      else {
          mm=cc;
      }
    }
  }
  return(IsOver);
}

function Select(nn)
{ 
    var ii, cc;
  I_Sel=nn;
  for (ii=0; ii < Max-1; ii++) {
    window.document.images[Max+ii].src = Pic[3].src;    
  }
  if ((0<=nn)&&(nn<Max-1)) 
  { 
      if ((Fld[nn]>0)&&(Fld[nn+1]>0)) {
        window.document.images[Max+nn].src = Pic[4].src;    
      }
  }
}

function RefreshScreen()
{ 
    var ii, cc;
  window.document.forms[0].Moves.value = eval(Moves)+"/"+eval(MaxMoves);
  for (ii=0; ii < Max; ii++)
  { 
      cc=Fld[ii];
      if (cc>0) {
      window.document.images[ii].src = Pic[(cc-1)*(4-Type)].src;    
      }
    else {
      window.document.images[ii].src = Pic[3].src;    
    }
  }
}

function Timer()
{
    if (IsAnimation)
  { 
      if (Moves==MaxMoves-1) {
          IsAnimation=false;
      }
    I_Sel=Move[Moves];
    Pressed();
    Moves++;
    RefreshScreen();
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
    alert("This game is known as the problem of Chinese chests"+"\nor the China box problem. Several boxes of two colors"+"\nstand in a line. There is an additional empty space for"+"\ntwo boxes either at the left or at the right side of the"+"\nboxes or somewhere between the boxes."+"\nThe aim of the game is to get the boxes in the right"+"\norder, that means to move the red boxes to the left"+"\nside and the blue boxes to the right side. You should"+"\ndo this with a minimum number of moves. You can"+"\nalways move two neighbouring boxes to the empty"+"\nspace, the order of that two boxes will be kept."+"\nThe game is more difficult with boxes of a third color."+"\nNow you have to arrange the red boxes to the left side,"+"\nthe blue boxes to the right side and the violet boxes to"+"\nthe middle. The position of the empty space at the end"+"\nof the game doesn't matter. Good luck!");
}
Init(2);
window.setInterval(Timer,2000);


document.onresize = Resize;

var b0 = document.getElementById("b0");
b0.onclick=help;
/*
var a0 = document.getElementById("a0");
a0.onclick=Clicked;
a0.onmouseover=Select;
a0.onmouseout=Select;
var a1 = document.getElementById("a1");
a1.onclick=Clicked;
a1.onmouseover=Select;
a1.onmouseout=Select;
var a2 = document.getElementById("a2");
a2.onclick=Clicked;
a2.onmouseover=Select;
a2.onmouseout=Select;
var a3 = document.getElementById("a3");
a3.onclick=Clicked;
a3.onmouseover=Select;
a3.onmouseout=Select;
var a4 = document.getElementById("a4");
a4.onclick=Clicked;
a4.onmouseover=Select;
a4.onmouseout=Select;
var a5 = document.getElementById("a5");
a5.onclick=Clicked;
a5.onmouseover=Select;
a5.onmouseout=Select;
var a6 = document.getElementById("a6");
a6.onclick=Clicked;
a6.onmouseover=Select;
a6.onmouseout=Select;
*/
var b1 = document.getElementById("b1");
b1.onclick=ChangeType;
var b2 = document.getElementById("b2");
b2.onclick=Init;
var b3 = document.getElementById("b3");
b3.onclick=Init;
var b4 = document.getElementById("b4");
b4.onclick=Init;
