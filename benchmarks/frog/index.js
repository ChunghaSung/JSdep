var i, IsOver, Max=8, MoveCount, MaxMoveCount, Start, Start0=0, Dir=1, MaxMove=108;
var IsLearning=false, NGames=0, NValidMoves=2;
Level = new Array(2);
Level[0]=0;
Level[1]=1;
Fld = new Array(Max);
Pic= new Array(3);
for (i=0; i<3; i++) { 
Pic[i] = new Image();
  Pic[i].src = "frog"+i+".gif"; 
}
History=new Array(MaxMove);
for (i=0; i<MaxMove; i++) {
 History[i]=new Array(3);
} 

PositionVal=new Array(2);
for (i=0; i<2; i++) {
    PositionVal[i]=new Array();
}
//PositionVal[Player][Position]: 0 - Position is lost, 1 - Position is won

function SetStart(ss)
{ 
    Start0=parseInt(ss);
  Init();
}

function SetLevel(nn, mm)
{ 
    Level[nn]=parseInt(mm);
}

function Timer()
{
    if (IsOver) {
        return;
    }
  var ll=Level[(MoveCount+Start)%2];
  if (ll==0) {
      return;
  } 
  MakeBestMove(ll);
}

function Init()
{ 
    var ii;
  for (ii=0; ii<Max; ii++) {
      Fld[ii]=-1;
  }
  for (ii=0; ii<3; ii++) 
  { 
      Fld[ii]=0;
    Fld[Max-1-ii]=1;
  }
  Start=Start0;
  MoveCount=0;
  MaxMoveCount=0;
  Dir=1-2*Start;
  NValidMoves=2;
  IsOver=false;
  RefreshScreen();  
}

function Clicked(ii)
{ 
    if (IsOver) {
        return(false);
    }
  if (Fld[ii]!=(MoveCount+Start)%2) {
      return(false);
  }
  if (MakeMove(ii))
  { 
      OverTest();
    GetDir();
    return(true);
  }
  return(false);
}

function Back()
{
    if (MoveCount==0) {
        return(false);
    }
  IsOver=false;
  MoveCount--;
  var ii=History[MoveCount][0];
  var jj=History[MoveCount][1];
  Fld[ii]=Fld[jj];
  Fld[jj]=-1;
  RefreshPic(ii);
  RefreshPic(jj);
  if (MoveCount<10) {
      window.document.OptionsForm.Moves.value=" "+MoveCount+" ";
  } else {
      window.document.OptionsForm.Moves.value=MoveCount;
  }
  ShowPosVal();
  GetDir();
  return(true);
}

function Replay()
{ 
    if (MoveCount>=MaxMoveCount) {
        return(false);
    }
  var ii=History[MoveCount][0];
  var jj=History[MoveCount][1];
  Fld[jj]=Fld[ii];
  Fld[ii]=-1;
  RefreshPic(ii);
  RefreshPic(jj);
  MoveCount++;
  if (MoveCount<10) {
      window.document.OptionsForm.Moves.value=" "+MoveCount+" ";
  } else {
      window.document.OptionsForm.Moves.value=MoveCount;
  }
  ShowPosVal();  
  OverTest();
  GetDir();
  return(true);
}

function MakeMove(ii)
{ 
    var dd=0;
    if ((ii+2*Dir>=0)&&(ii+2*Dir<Max))
    { 
        if (Fld[ii+2*Dir]<0) {
            dd=2*Dir
        }
    }
    if ((ii+Dir>=0)&&(ii+Dir<Max))
    { 
        if (Fld[ii+Dir]<0) {
            dd=Dir;
        }
    }
    if (dd==0) {
        return(false);
    }
    Fld[ii+dd]=Fld[ii];
    Fld[ii]=-1;
    RefreshPic(ii);
    RefreshPic(ii+dd);
    if (History[MoveCount][0]!=ii)
    { 
        History[MoveCount][0]=ii;
        MaxMoveCount=MoveCount+1;
    }
    if (History[MoveCount][1]!=ii+dd)
    { 
        History[MoveCount][1]=ii+dd;
        MaxMoveCount=MoveCount+1;
    }
    History[MoveCount][2]=GetPositionIndex();
    MoveCount++;
    if (MaxMoveCount<MoveCount) {
        MaxMoveCount=MoveCount;
    }
    if (!IsLearning)  
    {
        if (MoveCount<10) {
            window.document.OptionsForm.Moves.value=" "+MoveCount+" ";
        } else {
            window.document.OptionsForm.Moves.value=MoveCount;
        }
        ShowPosVal();
    }
    return(true);
}

function GetDir()
{
    var ii;
  NValidMoves=0;
  if ((MoveCount+Start)%2==0)
  { 
      Dir=1; 
    for (ii=0; ii<Max-1; ii++)
    { 
        if ((Fld[ii]==0)&&(Fld[ii+1]==-1)) {
            NValidMoves++;
        }
    }
    for (ii=0; ii<Max-2; ii++)
    { 
        if ((Fld[ii]==0)&&(Fld[ii+1]>=0)&&(Fld[ii+2]==-1)) {
            NValidMoves++;
        }
    }
    if (NValidMoves>0) {
        return;
    }
    Dir=-1;
    for (ii=1; ii<Max; ii++)
    { 
        if ((Fld[ii]==0)&&(Fld[ii-1]==-1)) {
            NValidMoves++;
        }
    }
    for (ii=2; ii<Max; ii++)
    { 
        if ((Fld[ii]==0)&&(Fld[ii-1]>=0)&&(Fld[ii-2]==-1)) {
            NValidMoves++;
        }
    }
  } else {
      Dir=-1; 
    for (ii=1; ii<Max; ii++)
    { 
        if ((Fld[ii]==1)&&(Fld[ii-1]==-1)) {
            NValidMoves++;
        }
    }
    for (ii=2; ii<Max; ii++)
    { 
        if ((Fld[ii]==1)&&(Fld[ii-1]>=0)&&(Fld[ii-2]==-1)) {
            NValidMoves++;
        }
    }
    if (NValidMoves>0) {
        return;
    }
    Dir=1;
    for (ii=0; ii<Max-1; ii++)
    { 
        if ((Fld[ii]==1)&&(Fld[ii+1]==-1)) {
            NValidMoves++;
        }
    }
    for (ii=0; ii<Max-2; ii++)
    { 
        if ((Fld[ii]==1)&&(Fld[ii+1]>=0)&&(Fld[ii+2]==-1)) {
            NValidMoves++;
        }
    }    
  }
}

function OverTest()
{ 
    var ii, nn=0;
  IsOver=false;
  if ((Fld[0]==1)&&(Fld[1]==1)&&(Fld[2]==1))
  { 
      EvalGame(1);
    if (!IsLearning) {
        alert("The frogs from the right side have won!");
    }
    return(true); 
  }
  if ((Fld[Max-1]==0)&&(Fld[Max-2]==0)&&(Fld[Max-3]==0))
  { 
      EvalGame(0);
    if (!IsLearning) {
        alert("The frogs from the left side have won!");
    }
    return(true); 
  }
  if (MoveCount==MaxMove)
  { 
      EvalGame(0.5);
    if (!IsLearning) {
        alert("It's a draw!");
    }
    return(true); 
  }
  nn=0;
  for (ii=3; MoveCount-ii>0; ii+=2)
  { 
      if (History[MoveCount-1][2]==History[MoveCount-ii][2]) {
          nn++;
      }
  }
  if ((nn>=2)&&(NValidMoves>1))
  { 
      if ((MoveCount+Start)%2==0) 
    {
        EvalGame(0.4);
      if (!IsLearning) {
          alert("The frogs from the left side have won!");
      }
    } else { 
        EvalGame(0.6);
      if (!IsLearning) {
          alert("The frogs from the right side have won!");
      }
    }  
    return(true);  
  }
  if (IsOver) {
      return(true); 
  }
  return(false);
}

function MakeBestMove(ll)
{ 
    var ii, jj, dd, ii_best=-1, vv_best=-1, pp, vv, mm=(MoveCount+Start)%2; 
  for (ii=0; ii<Max; ii++)
  { 
      if (Fld[ii]==mm)
    {
        dd=0;
      if ((ii+2*Dir>=0)&&(ii+2*Dir<Max))
      { 
          if (Fld[ii+2*Dir]<0) {
              dd=2*Dir
          }
      }
      if ((ii+Dir>=0)&&(ii+Dir<Max))
      { 
          if (Fld[ii+Dir]<0) {
              dd=Dir;
          }
      }
      if (dd!=0)
      { 
          Fld[ii+dd]=Fld[ii];
        Fld[ii]=-1;
        pp=GetPositionIndex();
        vv=0.5;
        for (jj=MoveCount-2; jj>0; jj-=2)
        { 
            if (History[jj][2]==pp) {
                vv-=1;  
            }
        }
        if (vv<0) {
            vv=-0.15/vv;
        } else {
            if ((IsLearning)||(ll>1)) {
                vv=PositionVal[mm][pp];
            if (!vv) {
                vv=0.75;
            }
          }
        }
        if (vv+Math.random()/5-0.1>vv_best)
        { 
            ii_best=ii;
          vv_best=vv;
        }
        Fld[ii]=Fld[ii+dd];
        Fld[ii+dd]=-1;
      }
    }
  }
  Clicked(ii_best);
}

function GetPositionIndex()
{
    var ii, jj="p";
  for (ii=0; ii<Max; ii++) {
      jj+=Fld[ii]+1;
  }
  return(jj);
}

function EvalGame(GameVal)
{ 
    var ii, pp, vv0, vv1, mm=Start;
  var Evaluated=new Array("","");
  for (ii=0; ii<MaxMoveCount; ii++)
  { 
      pp=History[ii][2];
    if (Evaluated[mm].indexOf(pp)<0)
    { 
        Evaluated[mm]+=pp;
      vv0=PositionVal[mm][pp];
      if (!vv0) {
          vv0=0.5;
      }
      if (mm==0) {
          vv1=1-GameVal;
      } else {
          vv1=GameVal;
      }
      PositionVal[mm][pp]=(vv0+((MaxMoveCount-ii-1)*vv0+(ii+1)*vv1)/MaxMoveCount)/2; 
//    if (mm==0) vv1=(0.5-GameVal)*ii/MaxMoveCount+0.5;
//    else vv1=(GameVal-0.5)*ii/MaxMoveCount+0.5;
//    PositionVal[mm][pp]=(vv0*3+vv1)/4;
      PositionVal[1-mm][InvPos(pp)]=PositionVal[mm][pp];
    }
    mm=1-mm;
  }
  IsOver=true;
  NGames++;
}

function InvPos(pp)
{
    var ii, rr="p", nn;
  for (ii=Max-1; ii>=0; ii--)
  { 
      nn=parseInt(pp.charAt(ii+1));
    if (nn==0) {
        rr+="0";
    }
    if (nn==1) {
        rr+="2";
    }
    if (nn==2) {
        rr+="1";
    }
  }  
  return(rr);
}

function Learn()
{ 
    IsLearning=true;
  for (var ii=0; ii<5; ii++)
  { 
      Start0=1-Start0;
    Init();
    while (!IsOver) {
        MakeBestMove();
    }
    Start0=1-Start0;
    Init();
    while (!IsOver) {
        MakeBestMove();
    }
  }  
  IsLearning=false;
  RefreshScreen();
  alert(NGames+" games learned.");
}

function ShowPosVal()
{
    var mm=1-(MoveCount+Start)%2;
  var pp=GetPositionIndex();
  var vv=PositionVal[mm][pp];
  if (!vv) {
      vv=0.5;
  }
  window.document.OptionsForm.PosIdx.value=pp+"-"+mm;
  window.document.OptionsForm.PosVal.value=Math.round(vv*1000)/1000;
  
}

function RefreshPic(nn)
{
    if (IsLearning) {
        return;
    }
  window.document.images[nn].src = Pic[Fld[nn]+1].src;
}

function RefreshScreen()
{ 
    if (IsLearning) {
        return;
    }
  for (var ii=0; ii<Max; ii++) {
    window.document.images[ii].src = Pic[Fld[ii]+1].src;
  }
  if (MoveCount<10) {
      window.document.OptionsForm.Moves.value=" "+MoveCount+" ";
  } else {
      window.document.OptionsForm.Moves.value=MoveCount;
  }
  ShowPosVal();
}

function Help()
{ alert("The players alternately move or jump with one of their frogs forward."+"\nIf this is not possible, then one of the frogs must move or jump back."+"\nThe player wins who is the first to get all frogs to the other side."+"\nA player loses too, if he repeats a position for a third time and"+"\nif he could have made another move instead."+"\nThe computer will learn from the games played. The more games"+"\nyou play, the better the computer will perform in the learner mode.");
}

Init();
setInterval(Timer, 1000);  
var r0 = document.getElementById("r0");
var r1 = document.getElementById("r1");
var r2 = document.getElementById("r2");
var r3 = document.getElementById("r3");
var r4 = document.getElementById("r4");
var r5 = document.getElementById("r5");
var r6 = document.getElementById("r6");
var r7 = document.getElementById("r7");
r0.onmousedown=Clicked;
r1.onmousedown=Clicked;
r2.onmousedown=Clicked;
r3.onmousedown=Clicked;
r4.onmousedown=Clicked;
r5.onmousedown=Clicked;
r6.onmousedown=Clicked;
r7.onmousedown=Clicked;

var s0 = document.getElementById("s0");
s0.onchange = SetLevel;
var s1 = document.getElementById("s1");
s1.onchange = SetStart;
var s2 = document.getElementById("s2");
s2.onchange = SetLevel;

var b0 = document.getElementById("b0");
b0.onclick=Help;
var b1 = document.getElementById("b1");
b1.onclick=Learn;
var b2 = document.getElementById("b2");
b2.onclick=Back;
var b3 = document.getElementById("b3");
b3.onclick=Back;
var b4 = document.getElementById("b4");
b4.onclick=Replay;
var b5 = document.getElementById("b5");
b5.onclick=Replay;
var b6 = document.getElementById("b6");
b6.onclick=Init;
