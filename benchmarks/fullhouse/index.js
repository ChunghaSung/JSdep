
var m, n, I_Sel, J_Sel, Size=7, PuzzleNo=1, StartTime, EndTime, IsHint, I_Hint, J_Hint;
Fld = new Array(Size);
for (n=0; n < Size; n++)
{
    Fld[n]=new Array(Size); 
}

Pic= new Array(8);
for (n=0; n<8; n++)
{ 
    Pic[n] = new Image(); 
  Pic[n].src = "fullhouse"+n+".gif";
}
function Init(nn)
{ 
    var ii, jj, cc, dd;
  if (nn>0) {
      PuzzleNo=parseInt(nn); 
      IsHint=false;
  }
  ss=Math.sqrt(Puzzle[PuzzleNo-1].length);
  dd=Math.floor((Size-ss)/2);
  for (ii=0; ii < Size; ii++)
  {
      for (jj=0; jj < Size; jj++) {
          Fld[ii][jj]=-2;
      }
  }
  I_Hint=-1;
  for (ii=0; ii < ss; ii++)
  { 
      for (jj=0; jj < ss; jj++)   
    {
        cc=Puzzle[PuzzleNo-1].charAt(jj*ss+ii);
      if (cc=="+") {
          Fld[ii+dd][jj+dd]=-1;
      }
      else  {
          Fld[ii+dd][jj+dd]=0;
      }
      if (cc=="o")
      {
          I_Hint=ii+dd;
        J_Hint=jj+dd;
      }
    }
  }
  I_Sel=-1;
  RefreshScreen();
  if (nn>0)
  { 
      Now = new Date();
    StartTime = Now.getTime() / 1000;
  }
}

function Clicked(ii, jj)
{ 
    var ddi=0, ddj=0, nn;
  if (Fld[ii][jj]!=0) {
      return;
  }
  if (I_Sel<0)
  {
      I_Sel=ii;
    J_Sel=jj;
    Fld[I_Sel][J_Sel]=1;
    RefreshPic(I_Sel, J_Sel);
    return;
  }
  if (ii>I_Sel) {
      ddi=1;
  }
  if (ii<I_Sel) {
      ddi=-1;
  }
  if (jj>J_Sel) {
      ddj=1;
  }
  if (jj<J_Sel) {
      ddj=-1;  
  }
  if ((ddi!=0)&&(ddj!=0)) {
      return;
  }
  if (ddi>0)
  {
      while (IsEmpty(I_Sel+1,J_Sel))
    {
        Fld[I_Sel][J_Sel]=2;
      RefreshPic(I_Sel, J_Sel);
      I_Sel++;
    }
  }
  if (ddj>0)
  { 
      while (IsEmpty(I_Sel,J_Sel+1))
    {
        Fld[I_Sel][J_Sel]=3;
      RefreshPic(I_Sel, J_Sel);
      J_Sel++;
    }
  }
  if (ddi<0)
  { 
      while (IsEmpty(I_Sel-1,J_Sel))
    {
        Fld[I_Sel][J_Sel]=4;
      RefreshPic(I_Sel, J_Sel);
      I_Sel--;
    }
  }
  if (ddj<0)
  { 
      while (IsEmpty(I_Sel,J_Sel-1))
    {
        Fld[I_Sel][J_Sel]=5;
      RefreshPic(I_Sel, J_Sel);
      J_Sel--;
    }
  }
  Fld[I_Sel][J_Sel]=1;
  RefreshPic(I_Sel, J_Sel);
  nn=0;
  for (ddi=0; ddi<Size; ddi++)
  {
      for (ddj=0; ddj<Size; ddj++)
    {
        if (Fld[ddi][ddj]==0) {
            nn++;
        }
    }
  }
  Now = new Date();
  EndTime = Now.getTime() / 1000;
  if (nn>0)
  { 
      if (IsEmpty(I_Sel+1,J_Sel)) {
          return;
      }
    if (IsEmpty(I_Sel,J_Sel+1)) {
        return;
    }
    if (IsEmpty(I_Sel-1,J_Sel)) {
        return;
    }
    if (IsEmpty(I_Sel,J_Sel-1)) {
        return;
    }
    if (EndTime-StartTime>=600)
    {
        if ((!IsHint)&&(I_Hint>=0))
      {
          if (confirm("Do you want a hint?")) {
              IsHint=true;
          }
      }
      Init(0); 
      if (IsHint) {
          Clicked(I_Hint, J_Hint);
      }
      return;
    }
    if (nn<5) {
        return;
    }
    if (confirm("Ooops! Try again?")) {
        Init(0);
    }
    return;
  }
  nn=Math.floor(EndTime - StartTime);
  if (PuzzleNo<nPuzzles)
  { 
      if (confirm("Super, you solved this game in "+nn+ " seconds !\nDo you want to try the next puzzle ?"))
    { 
        document.forms[0].PuzzleSelect.selectedIndex=PuzzleNo;
      Init(PuzzleNo+1);
    }
  }
  else {
    alert("Super, you solved this game in "+nn+ " seconds !");  
  }
}
function IsEmpty(ii,jj)
{ 
    if (ii<0) {
        return(false);
    }
  if (ii>=Size) {
      return(false);
  }
  if (jj<0) {
      return(false);
  }
  if (jj>=Size) {
      return(false);
  }
  if (Fld[ii][jj]!=0) {
      return(false);
  }
  return(true);
}

function RefreshPic(ii, jj)
{ 
    document.images[jj*Size+ii].src = Pic[Fld[ii][jj]+2].src;
}

function RefreshScreen()
{ 
    var ii, jj;
  for (ii=0; ii < Size; ii++)
  {
      for (jj=0; jj < Size; jj++) {
      document.images[jj*Size+ii].src = Pic[Fld[ii][jj]+2].src;
      }
  }  
}
function ShowHelp()
{ 
    alert("This puzzle was invented in 2004 by Erich Friedman (www.stetson.edu/~efriedma)."+"\nFirst click on an empty square to mark your starting position. After that click on"+"\na square to move the ball in horizontal or vertical direction. A game is solved,"+"\nwhen no square on the grid remains empty."+"\nGood luck!"); 

}

Init(1);

var i0 = document.getElementById("i0");
i0.onmousedown = Clicked;
var i1 = document.getElementById("i1");
i1.onmousedown = Clicked;
var i2 = document.getElementById("i2");
i2.onmousedown = Clicked;
var i3 = document.getElementById("i3");
i3.onmousedown = Clicked;
var i4 = document.getElementById("i4");
i4.onmousedown = Clicked;

var p0 = document.getElementById("p0");
p0.onchange = Init;

var b0= document.getElementById("b0");
b0.onclick=Init;
var b1= document.getElementById("b1");
b1.onclick=ShowHelp;

