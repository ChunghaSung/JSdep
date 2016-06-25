var i, I_From, I_To, IsOver, Start, Start0=1;

IsPlayer=new Array(2);
IsPlayer[0]=false;
IsPlayer[1]=true;
Level=new Array(2);
Level[0]=2;
Level[1]=2;

Fld = new Array(11);

Img2Fld=new Array(1,4,7,0,2,5,8,10,3,6,9);
Fld2Img=new Array(3,0,4,8,1,5,9,2,6,10,7);

CanGo=new Array(2);
for (i=0; i<2; i++) {
    CanGo[i]=new Array(11);
}

//Hare can go from to
CanGo[0][0]=new Array(1,2,3);
CanGo[0][1]=new Array(0,2,4,5);
CanGo[0][2]=new Array(0,1,3,5);
CanGo[0][3]=new Array(0,2,5,6);
CanGo[0][4]=new Array(1,5,7);
CanGo[0][5]=new Array(1,2,3,4,6,7,8,9);
CanGo[0][6]=new Array(3,5,9);
CanGo[0][7]=new Array(4,5,8,10);
CanGo[0][8]=new Array(5,7,9,10);
CanGo[0][9]=new Array(5,6,8,10);
CanGo[0][10]=new Array(7,8,9);

//Hounds can go from to
CanGo[1][0]=new Array(1,2,3);
CanGo[1][1]=new Array(2,4,5);
CanGo[1][2]=new Array(1,3,5);
CanGo[1][3]=new Array(2,5,6);
CanGo[1][4]=new Array(5,7);
CanGo[1][5]=new Array(4,6,7,8,9);
CanGo[1][6]=new Array(5,9);
CanGo[1][7]=new Array(8,10);
CanGo[1][8]=new Array(7,9,10);
CanGo[1][9]=new Array(8,10);
CanGo[1][10]=new Array();

Pic= new Array(5);
for (i=0; i<5; i++)
{
    Pic[i] = new Image();
  Pic[i].src = "harehounds"+i+".gif";
}

function SetStart1(ss1)
{
    Start0=ss1;
}

function SetStart2(ss2)
{
    Start0=ss2;
}

function SetPlayer1(ii1,nn1)
{ 
    IsPlayer[ii1]=nn1;
}
function SetPlayer2(ii2,nn2)
{ 
    IsPlayer[ii2]=nn2;
}
function SetPlayer3(ii3,nn3)
{ 
    IsPlayer[ii3]=nn3;
}
function SetPlayer4(ii4,nn4)
{ 
    IsPlayer[ii4]=nn4;
}

function SetLevel1(iii1,nnn1)
{ 
    Level[iii1]=parseInt(nnn1);
}

function SetLevel2(iii2,nnn2)
{ 
    Level[iii2]=parseInt(nnn2);
}

function Init()
{ 
    Start=Start0;
    Fld[0]=0;
    Fld[1]=0;
    Fld[2]=0;
    Fld[3]=0;
    Fld[4]=0;
    Fld[5]=0;
    Fld[6]=0;
    Fld[7]=0;
    Fld[8]=0;
    Fld[9]=0;
    Fld[10]=0;
    Fld[0]=1;
    Fld[1]=1;
    Fld[3]=1;
    I_From=-1;
    I_To=-1;
    IsOver=0;
    MoveCount=0;
    document.OptionsForm.Moves.value=MoveCount;
    MaxMoveCount=0;
    N_Sel=-1;
    window.document.images[Fld2Img[0]].src = Pic[Fld[0]+1].src;      
    window.document.images[Fld2Img[1]].src = Pic[Fld[1]+1].src;      
    window.document.images[Fld2Img[2]].src = Pic[Fld[2]+1].src;      
    window.document.images[Fld2Img[3]].src = Pic[Fld[3]+1].src;      
    window.document.images[Fld2Img[4]].src = Pic[Fld[4]+1].src;      
    window.document.images[Fld2Img[5]].src = Pic[Fld[5]+1].src;      
    window.document.images[Fld2Img[6]].src = Pic[Fld[6]+1].src;      
    window.document.images[Fld2Img[7]].src = Pic[Fld[7]+1].src;      
    window.document.images[Fld2Img[8]].src = Pic[Fld[8]+1].src;      
    window.document.images[Fld2Img[9]].src = Pic[Fld[9]+1].src;      
    window.document.images[Fld2Img[10]].src = Pic[Fld[10]+1].src;      
}

function Timer()
{
    if (IsOver) {
        return;
    }

  var mmove=(MoveCount+Start)%2;

  if (IsPlayer[mmove]) {
      return;
  }

  GetBestMove(mmove,2+Level[mmove]);
  MakeMove(I_From, I_To);
}

function MakeMove(ff,tt)
{
    Fld[tt]=Fld[ff];
  Fld[ff]=-1;
  RefreshPic(ff);
  RefreshPic(tt);
  I_From=-1;
  MoveCount++;
  document.OptionsForm.Moves.value=MoveCount;
  OverTest(Fld[tt], true);
}

function Clicked(ii)
{
    var nn, mmove=(MoveCount+Start)%2;
  if (IsOver>0) {
      return;
  }
  if (! IsPlayer[mmove]) {
      return;
  }
  if (Fld[ii]==1-mmove) {
      return;
  }
  if (I_From>=0)
  {
      if (Fld[ii]==mmove) 
    { 
        nn=I_From;
      I_From=ii;
      RefreshPic(nn);
      RefreshPic(ii);
      return;
    }
    for (nn=0; nn<CanGo[mmove][I_From].length; nn++)
    { 
        if (CanGo[mmove][I_From][nn]==ii)
      { 
          MakeMove(I_From, ii);
        return;
      } 
    }
    return;
  }
  if (Fld[ii]==mmove)
  { 
      I_From=ii;
    RefreshPic(ii);
    return;
  }
  if (mmove==1) {
      return;
  }
  for (nn=0; nn<CanGo[mmove][ii].length; nn++)
  { 
      if (Fld[CanGo[mmove][ii][nn]]==mmove)
    { 
        I_From=CanGo[mmove][ii][nn];
      MakeMove(I_From, ii);
      return;
    }
  }
}

function GetBestMove(mmove, llevel)
{ 
    if (mmove==0) {
        GetBestMoveHare(0,llevel,30000);
    }
  else {
      GetBestMoveHounds(0,llevel, 30000);
  }
}

function GetBestMoveHare(ll,mm,vv_cut)
{ 
    var ii, jj, hhound, hhare=0, iibest, vvbest=ll*1000-10000;
  if (ll==mm)
  {
      for (ii=10; ii>=0; ii--)
    { 
        if (Fld[ii]==1) {
            hhound=ii;
        }
    }
  }  

  while (Fld[hhare]!=0) {
      hhare++;
  }

  for (ii=0; ii<CanGo[0][hhare].length; ii++)
  { 
      jj=CanGo[0][hhare][ii];
    if (Fld[jj]<0)
    {
        Fld[jj]=0;
      Fld[hhare]=-1;
      if (ll<mm) {
          vv=-GetBestMoveHounds(ll+1,mm,-vvbest);
      }
      else 
      { 
          if (Math.floor((hhare+2)/3)<=Math.floor((hhound+2)/3)) {
              vv=1000;
          }
        else 
        { 
            vv=Math.random()*10-hhare;
          if (Fld[10]==1) {
              vv+=100; 
          }
          if (Fld[8]==1) {
              vv+=50;
          }
        }   
      }
      Fld[hhare]=0;
      Fld[jj]=-1;
      if (vv>vv_cut) {
          return(vv);
      }
      if (vv>vvbest)
      { 
          vvbest=vv;
        iibest=ii;
      }
    }    
  }
  if (ll==0)
  { 
      I_From=hhare;
    I_To=CanGo[0][hhare][iibest];
  }
  return(vvbest);
}
function GetBestMoveHounds(ll,mm,vv_cut)
{ 
    var ii, jj=0, kk, hhare=0, hhounds=new Array(3), iibest, kkbest, vvbest=ll*1000-10000;
  if (ll==mm) { 
      while (Fld[hhare]!=0) {
          hhare++; 
      }
  }
  for (ii=0; ii<11; ii++)
  { 
      if (Fld[ii]==1) {
          hhounds[jj++]=ii;
      }
  }
  for (kk=0; kk<3; kk++)
  { 
      for (ii=0; ii<CanGo[1][hhounds[kk]].length; ii++)
    { 
        jj=CanGo[1][hhounds[kk]][ii];
      if (Fld[jj]<0)
      { 
          Fld[jj]=1;
        Fld[hhounds[kk]]=-1;
        if (ll<mm) {
            vv=-GetBestMoveHare(ll+1,mm,-vvbest);
        }
        else 
        { 
            vv=hhare-Math.random()*10; 
          if (Fld[10]==1) {
              vv-=100; 
          }
          if (Fld[8]==1) {
              vv-=50; 
          }
        }
        Fld[hhounds[kk]]=1;
        Fld[jj]=-1;
        if (vv>vv_cut) {
            return(vv);
        }
        if (vv>vvbest)
        {
            vvbest=vv;
          iibest=ii;
          kkbest=kk;
        }  
      }
    }    
  }
  if (ll==0)
  { 
      I_From=hhounds[kkbest];
    I_To=CanGo[1][hhounds[kkbest]][iibest];
  }
  return(vvbest);
}

function OverTest(mmove, mmsg)
{
    var ii, hhare, hhound;
  for (ii=10; ii>=0; ii--)
  { 
      if (Fld[ii]==0) {
          hhare=ii;
      }
    if (Fld[ii]==1) {
        hhound=ii;
    }
  }
  IsOver=true;
  if (mmove==0) //hare
  { 
      if (Math.floor((hhare+2)/3)>Math.floor((hhound+2)/3)) {
          IsOver=false;
      }
    if ((mmsg)&&(IsOver)) {
        alert("The hare has won !");
    }
  }
  else //hounds
  { 
      for (ii=0; ii<CanGo[0][hhare].length; ii++)
    { 
        if (Fld[CanGo[0][hhare][ii]]==-1) {
            IsOver=false;
        }
    }

    if ((mmsg)&&(IsOver)) {
        alert("The hounds have won !");
    }
  }
  if ((!IsOver)&&(MoveCount==49))
  { 
      IsOver=true;
    if (mmsg) {
        alert("The hare has won !");
    }
  }
  return(IsOver);
}

function RefreshPic(ii)
{ 
    if (Fld[ii]<0) {
        window.document.images[Fld2Img[ii]].src = Pic[0].src;
    }
    else
    { 
        if (ii==I_From) {
            window.document.images[Fld2Img[ii]].src = Pic[Fld[ii]+3].src;
        }
        else {
            window.document.images[Fld2Img[ii]].src = Pic[Fld[ii]+1].src;      
        }
    }
}

function Help()
{ 
    alert("The hounds try to trap the hare, so"+"\nthat it is unable to make any move."+"\nThe hare moves forward and backward"+"\nalong any vertical or diagonal line."+"\nThe hounds can only move forward."+"\nIf after 49 moves the hounds could not"+"\ncatch the hare, then the hare has won.");
}

function Resize()
{ 
    if(navigator.appName == "Netscape") {
        history.go(0);
    }
}

Init();
setInterval(Timer, 800);

var body = document.getElementById("body");
body.onresize = Resize;
document.onresize = Resize;

var i0 = document.getElementById("i0");
i0.onclick = Clicked;
var i1 = document.getElementById("i1");
i1.onclick = Clicked;
var i2 = document.getElementById("i2");
i2.onclick = Clicked;
var i3 = document.getElementById("i3");
i3.onclick = Clicked;
var i4 = document.getElementById("i4");
i4.onclick = Clicked;
var i5 = document.getElementById("i5");
i5.onclick = Clicked;
var i6 = document.getElementById("i6");
i6.onclick = Clicked;
var i7 = document.getElementById("i7");
i7.onclick = Clicked;
var i8 = document.getElementById("i8");
i8.onclick = Clicked;
var i9 = document.getElementById("i9");
i9.onclick = Clicked;

var r0 = document.getElementById("r0");
r0.onclick = SetPlayer1;
var r1 = document.getElementById("r1");
r1.onclick = SetPlayer2;
var r2 = document.getElementById("r2");
r2.onchange = SetLevel1;


var r3 = document.getElementById("r3");
r3.onclick = SetStart1;
var r4 = document.getElementById("r4");
r4.onclick = SetStart2;

var b0 = document.getElementById("b0");
b0.onclick = Init;

var b1 = document.getElementById("b1");
b1.onclick = Help;


var r5 = document.getElementById("r5");
r5.onclick = SetPlayer3;
var r6 = document.getElementById("r6");
r6.onclick = SetPlayer4;
var r7 = document.getElementById("r7");
r7.onchange = SetLevel2;




