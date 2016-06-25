
var scrn=xscrn, n_scrn=n_xscrn;
var i, j, I_Sel, J_Sel, XPos, YPos, StartTime, EndTime, TimeString="00:00:00", IsOver, XMax=20, YMax=17, Series=0;
var Level=1, MoveCount, MaxMoveCount, MaxMove=4949;
var IsNetscape = false;  
if(navigator.appName == "Netscape") {
    IsNetscape = true;
}

History=new Array(MaxMove);

Fld = new Array(XMax);
for (i=0; i < XMax; i++)
{ 
    Fld[i]=new Array(YMax);
}

Pic= new Array(2);
Pic[0]= new Array(7);
Pic[1]= new Array(7);
for (i=0; i<7; i++)
{ 
    Pic[0][i] = new Image();
  Pic[0][i].src = "sokoban"+i+".gif";
  Pic[1][i] = new Image();
  Pic[1][i].src = "sokoyoshio"+i+".gif";
}

function SetSeries(nn)
{ 
    Series=nn;
  if (Series==0)
  {
      scrn=xscrn;
    n_scrn=n_xscrn
  } else {
      scrn=yscrn;
    n_scrn=n_yscrn
  }
  Level=1;
  Init(Level-1);
  if (document.getElementById)
  { 
      if (Series==0) {
          document.getElementById("bg").style.backgroundImage="url('cosmosbg.gif')"; 
      } else {
          document.getElementById("bg").style.backgroundImage="url('sokoban0.gif')";
      }
  }
}

function Timer()
{ 
    var ii, jj, ss="";
  if (IsOver) {
      return;
  }
  Now = new Date();
  EndTime = Now.getTime() / 1000;
  ii=Math.floor(EndTime - StartTime);
  jj=ii%60;
  ss=eval(jj);
  if (jj<10) {
      ss="0"+ss;
  }
  ii-=jj;
  ii/=60;
  jj=ii%60;
  ss=eval(jj)+":"+ss;
  if (jj<10) {
      ss="0"+ss;
  }
  ii-=jj;
  ii/=60;
  jj=ii%24;
  ss=eval(jj)+":"+ss;
  if (jj<10) {
      ss="0"+ss;
  }
  window.document.OptionsForm.Time.value=ss;
  TimeString=ss;
}

function KeyDown(whichkey)
{ 
    //alert(whichkey);
  if (whichkey == 37) {
      Move(-1,0);
  }
  if (whichkey == 38) {
      Move(0,-1);
  }
  if (whichkey == 39) {
      Move(1,0);
  }

  if (whichkey == 40) {
      Move(0,1);
  }

  if (whichkey == 50) {
      Move(0,1);
  }
  if (whichkey == 52) {
      Move(-1,0);
  }
  if (whichkey == 53) {
      Move(0,1);
  }
  if (whichkey == 54) {
      Move(1,0);
  }
  if (whichkey == 56) {
      Move(0,-1);
  }

  if (whichkey == 65458) {
      Move(0,1);
  }
  if (whichkey == 65460) {
      Move(-1,0);
  }
  if (whichkey == 65461) {
      Move(0,1);
  }
  if (whichkey == 65462) {
      Move(1,0);
  }
  if (whichkey == 65464) {
      Move(0,-1);
  }
}  

function NumStr(nn)
{ 
    if (nn<10) {
        return("   "+eval(nn)+"   ");
    }
  if (nn<100) {
      return("  "+eval(nn)+"  ");
  }
  if (nn<1000) {
      return(" "+eval(nn)+" ");
  }
  return(eval(nn));
}

function ChangeLevel(dd)
{ 
    Level+=dd;
  if (Level<1) {
      Level=1;
  }
  if (Level>n_scrn) {
      Level=n_scrn;
  }
  Init(Level-1);
}

function Init(ll)
{ 
    var cc, ii, jj, kk;
  for (ii=0; ii < XMax; ii++)
  {
      for (jj=0; jj < YMax; jj++) {
      Fld[ii][jj]=0;
      }
  }
  ii=0; jj=0;
  for (kk=0; kk<scrn[ll].length; kk++)
  { 
      cc=scrn[ll].charAt(kk);
    if (cc==".") {
        Fld[ii][jj]=1;
    }
    if (cc=="#") {
        Fld[ii][jj]=2;
    }
    if (cc=="$") {
        Fld[ii][jj]=3;
    }
    if (cc=="*") {
        Fld[ii][jj]=4;
    }
    if (cc=="@") { 
        Fld[ii][jj]=5;
        PosX=ii;
        PosY=jj; 
    }
    if ((cc!=" ")&&(cc!="!")&&(Fld[ii][jj]==0)) {
        alert(cc);
    }
    if (cc=="!") { 
        jj++; 
        ii=0;
    } else {
        ii++;
    }
  }
  MoveCount=0;
  MaxMoveCount=0;
  RefreshScreen();
  window.document.images[0].src = Pic[Series][5].src;
  Now = new Date();
  StartTime = Now.getTime() / 1000;
  IsOver=false;
}

function OverTest()
{ 
    var ii, jj;
  for (ii=0; ii < XMax; ii++)
  {
      for (jj=0; jj < YMax; jj++)
    {
        if (Fld[ii][jj]==3) {
            return(false);
        }
    }
  }
  return(true);
}

function Move(ddX, ddY)
{
    var nn;
  if (IsOver) {
      return;
  }
  if (Fld[PosX+ddX][PosY+ddY]>2)
  {
      if (Fld[PosX+2*ddX][PosY+2*ddY]<2)
    {
        Fld[PosX+2*ddX][PosY+2*ddY]+=3;
      Fld[PosX+ddX][PosY+ddY]+=2;
      Fld[PosX][PosY]-=5;
      RefreshPic(PosX, PosY);
      RefreshPic(PosX+ddX, PosY+ddY);
      RefreshPic(PosX+2*ddX, PosY+2*ddY);
      PosX+=ddX;
      PosY+=ddY;
      nn=-(ddX+1)-3*(ddY+1);
      if (History[MoveCount]!=nn)
      {
          History[MoveCount]=nn;
        MaxMoveCount=MoveCount+1;
      }
      MoveCount++;
      if (MaxMoveCount<MoveCount) {
        MaxMoveCount=MoveCount;
      }
      IsOver=OverTest();
      if (MoveCount==MaxMove)
      { 
          alert("Sorry, no more moves. Please try again !");
      }
    }
  } else {
      if (Fld[PosX+ddX][PosY+ddY]<2)
    { 
        Fld[PosX+ddX][PosY+ddY]+=5;
      Fld[PosX][PosY]-=5;
      RefreshPic(PosX, PosY);
      RefreshPic(PosX+ddX, PosY+ddY);
      PosX+=ddX;
      PosY+=ddY;
      nn=(ddX+1)+3*(ddY+1);
      if (History[MoveCount]!=nn)
      { 
          History[MoveCount]=nn;
        MaxMoveCount=MoveCount+1;
      }
      MoveCount++;
      if (MaxMoveCount<MoveCount) {
        MaxMoveCount=MoveCount;
      }
      if (MoveCount==MaxMove)
      { 
          alert("Sorry, no more moves. Please try again !");
      }
    }
  }
  window.document.OptionsForm.Moves.value=NumStr(MoveCount);
  if (IsOver) {
      window.document.images[0].src = Pic[Series][4].src;
  }
}

function MoveBack(mm)
{ 
    var ii, nn, ddX, ddY;
  for (ii=0; ii<mm; ii++)
  {
      if (MoveCount==0) {
          return;
      }
    IsOver=false;
    window.document.images[0].src = Pic[Series][5].src;
    MoveCount--;
    nn=History[MoveCount];
    if (nn>0)
    { 
        ddX=nn%3;
      ddY=(nn-ddX)/3;
      ddX--;
      ddY--;
      PosX-=ddX;
      PosY-=ddY;
      Fld[PosX+ddX][PosY+ddY]-=5;
      Fld[PosX][PosY]+=5;
      RefreshPic(PosX, PosY);
      RefreshPic(PosX+ddX, PosY+ddY);
    } else { 
        nn*=-1;
      ddX=nn%3;
      ddY=(nn-ddX)/3;
      ddX--;
      ddY--;
      PosX-=ddX;
      PosY-=ddY;
      Fld[PosX+2*ddX][PosY+2*ddY]-=3;
      Fld[PosX+ddX][PosY+ddY]-=2;
      Fld[PosX][PosY]+=5;
      RefreshPic(PosX, PosY);
      RefreshPic(PosX+ddX, PosY+ddY);
      RefreshPic(PosX+2*ddX, PosY+2*ddY);
    }
    window.document.OptionsForm.Moves.value=NumStr(MoveCount);
  }
}

function MoveForward(mm)
{
    var ii, nn, ddX, ddY;
  for (ii=0; ii<mm; ii++)
  {
      if (MoveCount>=MaxMoveCount) {
          return;
      }
    nn=History[MoveCount];
    if (nn<0) {
        nn*=-1;
    }
    ddX=nn%3;
    ddY=(nn-ddX)/3;
    ddX--;
    ddY--;
    Move(ddX, ddY);
  }
}

function RefreshPic(ii, jj)
{ 
    window.document.images[ii+jj*XMax+1].src = Pic[Series][Fld[ii][jj]].src;
}

function RefreshScreen()
{ 
    var ii, jj;
  for (ii=0; ii < XMax; ii++)
  {
      for (jj=0; jj < YMax; jj++) {
      window.document.images[ii+jj*XMax+1].src = Pic[Series][Fld[ii][jj]].src;
      }
  }
  window.document.OptionsForm.Level.value=NumStr(Level);
  window.document.OptionsForm.Moves.value=NumStr(MoveCount);
}

function Help()
{
    alert("This game was originally invented in Japan in the early 80's."+"\n'Sokoban' is japanese for 'warehouse keeper'. You have to"+"\npush crates to their proper locations in a warehouse with a"+"\nminimum number of moves. There are 90 levels included,"+"\ntaken from XSokoban, which is placed in the public domain,"+"\nand 106 levels created by Yoshio Murase and provided at"+"\nwww.ne.jp/asahi/ai/yoshio/sokoban."); 
}

function Resize()
{ 
    if(navigator.appName == "Netscape") {
        history.go(0);
    }
}

if (navigator.appName != "Microsoft Internet Explorer") {
  document.captureEvents(Event.KEYDOWN);
}
document.onkeydown = NetscapeKeyDown;
function NetscapeKeyDown(key)
{
    KeyDown(key.which);
}  


Init(0);
setInterval(Timer, 1000);


document.onkeydown = KeyDown;
document.onresize = Resize;

var body = document.getElementById("body");
body.onresize = Resize;

var r0 = document.getElementById("r0");
r0.onclick = SetSeries;
var r1 = document.getElementById("r1");
r1.onclick = SetSeries;

var b0 = document.getElementById("b0");
bo.onclick = ChangeLevel;
var b1 = document.getElementById("b1");
b1.onclick = ChangeLevel;
var b2 = document.getElementById("b2");
b2.onclick = ChangeLevel;
var b3 = document.getElementById("b3");
b3.onclick = ChangeLevel;

var b4 = document.getElementById("b4");
b4.onclick = MoveBack;
var b5 = document.getElementById("b5");
b5.onclick = MoveBack;

var b6 = document.getElementById("b6");
b6.onclick = MoveForward;
var b7 = document.getElementById("b7");
b7.onclick = MoveForward;

var b8 = document.getElementById("b8");
b8.onclick = ChangeLevel;
var b9 = document.getElementById("b9");
b9.onclick = Help;

var b10 = document.getElementById("b10");
b10.onclick = Move;
var b11 = document.getElementById("b11");
b11.onclick = Move;
var b12 = document.getElementById("b12");
b12.onclick = Move;
var b13 = document.getElementById("b13");
b13.onclick = Move;
