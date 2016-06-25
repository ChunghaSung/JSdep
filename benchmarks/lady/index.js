var i, j, XM, Y0=20, StartTime, EndTime;
var s, flds, key, xmax=17, ymax=35, Level=1, Ncol=6;
fld=new Array (xmax);
for (i=0; i<xmax; i++) {
  fld[i]=new Array(ymax);
}
pos= new Array(6);
fldlr=new Array(2);
for (i=0; i<2; i++) {
  fldlr[i]=new Array(ymax+2);
}

xl = new Array(14, 50, 77, 97, 113, 124, 133, 139, 144, 148, 150, 152);
yo = new Array( 9, 31, 48, 61, 71, 78, 83, 87, 90, 93, 94, 95);
col = new Array( 0, 1, 1, 2, 3, 4);

var IsNetscape = false, IsNetscape4 = false;
if (navigator.appName == "Netscape") { 
    IsNetscape = true;
  if (parseInt(navigator.appVersion)<5) {
      IsNetscape4 = true;
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
var ebid;
if (document.getElementById) {
    ebid = true;
} else {
    ebid = false;
}
function ElementById(id)
{ 
    if (ebid) {
        return(document.getElementById(id));
    } else {
        return(eval("document.all."+id));
    }
}
function KeyDown(whichkey)
{ 
    //alert(whichkey);
    if (whichkey == 37) {
      Left();
  }
  if (whichkey == 38) {
      Up();
  }
  if (whichkey == 39) {
      Right();
  }
  if (whichkey == 12) {
      Up();
  }

  if (whichkey == 52) {
      Left();
  }
  if (whichkey == 54) {
      Right();
  }
  if (whichkey == 56) {
      Up();
  }

  if (whichkey == 100) {
      Left();
  }
  if (whichkey == 101) {
      Up();
  }
  if (whichkey == 102) {
      Right();
  }

  if (whichkey == 65460) {
      Left();
  }
  if (whichkey == 65462) {
      Right();
  }
  if (whichkey == 65464) {
      Up();
  }
}  

function Left()
{
    if (key=='z') {
        return;
    }
  if (key=='s')
  { 
      PosInit();
    key='M';
    MakeStep();
  }
  key='K';
  MakeStep();
  Gets();
  RefreshScreen();
  window.document.MainForm.LeftButton.blur();
}

function Up()
{ 
    if (key=='z') {
        return;
    }
  if (key=='s')
  { 
      PosInit();
    key='M';
    MakeStep();
    Gets();
  } else { 
      key='H';
    MakeStep();
    Gets();
  }
  RefreshScreen();
  window.document.MainForm.UpButton.blur();
  if (key=='z') { 
      Now = new Date();
    EndTime = Now.getTime() / 1000;
    i=Math.floor(EndTime - StartTime);
    if (window.opener) {
        if (window.opener.SetHighscores) { 
          if (Level==1) {
              window.opener.SetHighscores("Laby","Easy",i,-1);
          }
        if (Level==2) {
            window.opener.SetHighscores("Laby","Medium",i,-1);
        }
        if (Level==3) {
            window.opener.SetHighscores("Laby","Hard",i,-1);
        }
      }
    }
    alert("Super, you solved this game in "+i+ " seconds !");
  }
}

function Right()
{ 
    if (key=='z') {
        return;
    }
  if (key=='s') {
      PosInit();
  }
  key='M';
  MakeStep();
  Gets();
  RefreshScreen();
  window.document.MainForm.RightButton.blur();
}

function Init(ll)
{
    var ii1, ii2;
  if (ll>0) {
      Level=ll;
  }
  FldInit();
  while (!CanBeSolved()) {
      FldInit();
  }
  for (ii1=0; ii1<xmax; ii1++) { 
      for (ii2=0; ii2<ymax; ii2++) {
        if (fld[ii1][ii2]<-1) {
            fld[ii1][ii2]=-1;
        }
    }
  }
  key='s';
  PosInit();
  RefreshScreen();
  window.document.MainForm.NewButton.focus();
  window.document.MainForm.NewButton.blur();
  Now = new Date();
  StartTime = Now.getTime() / 1000;
}

function random(nn)
{ 
    return(Math.floor(Math.random()*1000) % nn);
}

function FldInit()
{ 
    var ii1,ii2,cc=6*Level+4;
  for (ii1=0; ii1<xmax; ii1++)
  { 
      for (ii2=0; ii2<ymax; ii2++) {
      fld[ii1][ii2]=-1;
      }
  }

  for (ii1=0; ii1<xmax; ii1++) { 
      for (ii2=0; ii2<ymax; ii2++) { 
        if ((ii1%2==0)&&(ii2%2==0)) {
        fld[ii1][ii2]=random(Ncol-3)+3;
        }
    }
  }

  for (ii1=0; ii1<xmax; ii1++)
  { 
      ii2=random((ymax+3)/2)+(ymax+1)/4;
    fld[ii1][ii2]=random(Ncol-3)+3;
    fld[ii1][ymax-ii2]=random(Ncol-3)+3;
  }

  for (ii1=0; ii1<xmax; ii1++)
  { 
      fld[ii1][0]=0;
    fld[ii1][ymax-1]=0;
  }

  for (ii1=0; ii1<ymax; ii1++)
  { 
      fld[0][ii1]=0;
    fld[xmax-1][ii1]=0;
  }
  fld[1][0]=1;
  fld[xmax-2][ymax-1]=2;

  for (ii1=1; ii1<xmax-1; ii1++)
  { 
      for (ii2=2; ii2<ymax-2; ii2++) {
          if (random(100)<cc) {
	fld[ii1][ii2]=random(Ncol-3)+3;
          }
    }
  }
}

function PosInit()
{ 
    pos[0]=2;
  pos[1]=2;
  pos[2]=1;
  pos[3]=0;
  pos[4]=0;
  pos[5]=-1;
}

function Gets()
{ 
    if ((key=='s')||(key=='z')) {
        return;
    }
  s=-1;
  s++;
fldlr[0][s]=fld[pos[0]+s*pos[2]+pos[4]-1][pos[1]+s*pos[3]+pos[5]-1];
fldlr[1][s]=fld[pos[0]+s*pos[2]-pos[4]-1][pos[1]+s*pos[3]-pos[5]-1];
  while (fld[pos[0]+s*pos[2]-1][pos[1]+s*pos[3]-1]==-1) { 
      s++;
    fldlr[0][s]=fld[pos[0]+s*pos[2]+pos[4]-1][pos[1]+s*pos[3]+pos[5]-1];
    fldlr[1][s]=fld[pos[0]+s*pos[2]-pos[4]-1][pos[1]+s*pos[3]-pos[5]-1];
  }
  flds=fld[pos[0]+s*pos[2]-1][pos[1]+s*pos[3]-1];
  s--;
}

function MakeStep()
{
    var posh1,posh2;
  if (key=='H') { 
      posh1=fld[pos[0]+pos[2]-1][pos[1]+pos[3]-1];
    if (posh1==1) {
        key='s';
    }
    if (posh1==2) {
        key='z';
    }
    if (posh1==-1) { 
        pos[0]+=pos[2]; pos[1]+=pos[3]; 
    }
  }
  if (key=='K') { 
      posh1=pos[2];posh2=pos[3];
    pos[2]=pos[4];pos[3]=pos[5];
    pos[4]=-posh1;pos[5]=-posh2;
  }
  if (key=='M') { 
      posh1=pos[2];posh2=pos[3];
    pos[2]=-pos[4];pos[3]=-pos[5];
    pos[4]=posh1;pos[5]=posh2;
  }
}

function CanBeSolved()
{
    var ii1,ii2,ii3;
    fld[1][1]=-2;
    fld[xmax-2][ymax-2]=-3;
    ii3=0;
    for (ii1=1; ii1<xmax-1; ii1++) { 
        for (ii2=1; ii2<ymax-1; ii2++) {
            if (fld[ii1][ii2]<-1) {
                if (fld[ii1+1][ii2]<-1) {
                    if (fld[ii1+1][ii2]!=fld[ii1][ii2]) {
                        return(true);
                    }
                }
                if (fld[ii1+1][ii2]==-1) {
                    fld[ii1+1][ii2]=fld[ii1][ii2];
                    ii3++;
                }
                if (fld[ii1][ii2+1]<-1) { 
                    if (fld[ii1][ii2+1]!=fld[ii1][ii2]) {
                        return(true);
                    }
                }
                if (fld[ii1][ii2+1]==-1) {
                    fld[ii1][ii2+1]=fld[ii1][ii2];
                    ii3++;
                }
            }
        }
        for (ii2=ymax-2; ii2>=1; ii2--) {
            if (fld[ii1][ii2]<-1) {
                if (fld[ii1+1][ii2]<-1) {
                    if (fld[ii1+1][ii2]!=fld[ii1][ii2]) {
                        return(true);
                    }
                } 
                if (fld[ii1+1][ii2]==-1) {
                    fld[ii1+1][ii2]=fld[ii1][ii2];
                    ii3++;
                }
                if (fld[ii1][ii2-1]<-1) {
                    if (fld[ii1][ii2-1]!=fld[ii1][ii2]) {
                        return(true);
                    }
                }
                if (fld[ii1][ii2-1]==-1) {
                    fld[ii1][ii2-1]=fld[ii1][ii2];
                    ii3++;
                }
            }
        } 
    }
    for (ii1=xmax-2; ii1>=1; ii1--)
    { 
        for (ii2=1; ii2<ymax-1; ii2++) {
            if (fld[ii1][ii2]<-1) {
                if (fld[ii1-1][ii2]<-1) {
                    if (fld[ii1-1][ii2]!=fld[ii1][ii2]) {
                        return(true);
                    }
                }
                if (fld[ii1-1][ii2]==-1) {
                    fld[ii1-1][ii2]=fld[ii1][ii2];
                    ii3++;
                }
                if (fld[ii1][ii2+1]<-1) {
                    if (fld[ii1][ii2+1]!=fld[ii1][ii2]) {
                        return(true);
                    }
                }
                if (fld[ii1][ii2+1]==-1) {
                    fld[ii1][ii2+1]=fld[ii1][ii2];
                    ii3++;
                }
            }
        }
        for (ii2=ymax-2; ii2>=1; ii2--) { 
            if (fld[ii1][ii2]<-1) {
                if (fld[ii1-1][ii2]<-1) {
                    if (fld[ii1-1][ii2]!=fld[ii1][ii2]) {
                        return(true);
                    }
                }
                if (fld[ii1-1][ii2]==-1) {
                    fld[ii1-1][ii2]=fld[ii1][ii2];
                    ii3++;
                }
                if (fld[ii1][ii2-1]<-1)
                { 
                    if (fld[ii1][ii2-1]!=fld[ii1][ii2]) {
                        return(true);
                    }
                }
                if (fld[ii1][ii2-1]==-1) {
                    fld[ii1][ii2-1]=fld[ii1][ii2]; 
                    ii3++;
                }
            }
        }
    }
    while (ii3>0) { 
        ii3=0;
        for (ii1=1; ii1<xmax-1; ii1++) { 
            for (ii2=1; ii2<ymax-1; ii2++) {
                if (fld[ii1][ii2]<-1) {
                    if (fld[ii1+1][ii2]<-1) {
                        if (fld[ii1+1][ii2]!=fld[ii1][ii2]) {
                            return(true);
                        }
                    }
                    if (fld[ii1+1][ii2]==-1) {
                        fld[ii1+1][ii2]=fld[ii1][ii2];
                        ii3++;
                    }
                    if (fld[ii1][ii2+1]<-1) { 
                        if (fld[ii1][ii2+1]!=fld[ii1][ii2]) {
                            return(true);
                        }
                    }
                    if (fld[ii1][ii2+1]==-1) {
                        fld[ii1][ii2+1]=fld[ii1][ii2];
                        ii3++;
                    }
                }
            }
            for (ii2=ymax-2; ii2>=1; ii2--) {
                if (fld[ii1][ii2]<-1) {
                    if (fld[ii1+1][ii2]<-1) {
                        if (fld[ii1+1][ii2]!=fld[ii1][ii2]) {
                            return(true);
                        }
                    } 
                    if (fld[ii1+1][ii2]==-1) {
                        fld[ii1+1][ii2]=fld[ii1][ii2];
                        ii3++;
                    }
                    if (fld[ii1][ii2-1]<-1) {
                        if (fld[ii1][ii2-1]!=fld[ii1][ii2]) {
                            return(true);
                        }
                    }
                    if (fld[ii1][ii2-1]==-1) {
                        fld[ii1][ii2-1]=fld[ii1][ii2];
                        ii3++;
                    }
                }
            } 
        }
        for (ii1=xmax-2; ii1>=1; ii1--)
        { 
            for (ii2=1; ii2<ymax-1; ii2++) {
                if (fld[ii1][ii2]<-1) {
                    if (fld[ii1-1][ii2]<-1) {
                        if (fld[ii1-1][ii2]!=fld[ii1][ii2]) {
                            return(true);
                        }
                    }
                    if (fld[ii1-1][ii2]==-1) {
                        fld[ii1-1][ii2]=fld[ii1][ii2];
                        ii3++;
                    }
                    if (fld[ii1][ii2+1]<-1) {
                        if (fld[ii1][ii2+1]!=fld[ii1][ii2]) {
                            return(true);
                        }
                    }
                    if (fld[ii1][ii2+1]==-1) {
                        fld[ii1][ii2+1]=fld[ii1][ii2];
                        ii3++;
                    }
                }
            }
            for (ii2=ymax-2; ii2>=1; ii2--) { 
                if (fld[ii1][ii2]<-1) {
                    if (fld[ii1-1][ii2]<-1) {
                        if (fld[ii1-1][ii2]!=fld[ii1][ii2]) {
                            return(true);
                        }
                    }
                    if (fld[ii1-1][ii2]==-1) {
                        fld[ii1-1][ii2]=fld[ii1][ii2];
                        ii3++;
                    }
                    if (fld[ii1][ii2-1]<-1)
                    { 
                        if (fld[ii1][ii2-1]!=fld[ii1][ii2]) {
                            return(true);
                        }
                    }
                    if (fld[ii1][ii2-1]==-1) {
                        fld[ii1][ii2-1]=fld[ii1][ii2]; 
                        ii3++;
                    }
                }
            }
        }
    }
    return(false);
}


function RefreshScreen()
{ 
    var ii, jj, cc, ss=s;
    if (ss>11) {
        ss=11;
    }
    if (IsNetscape4) { 
        if (key=='s') {
            document.layers['goal'].visibility="hide";
            document.layers['start'].visibility="show";
            return;
        }
        if (key=='z') { 
            document.layers['start'].visibility="hide";
            document.layers['goal'].visibility="show";
            return;
        }
        document.layers['start'].visibility="hide";
        document.layers['goal'].visibility="hide";
        for (ii=0; ii<12; ii++) {
            if ((ii<=ss)&&(fldlr[0][ii]>=0)) {
                cc=col[fldlr[0][ii]];
                document.layers['lg'+ii].visibility="show";
                for (jj=0; jj<Ncol-1; jj++) { 
                    if (jj==cc) {
                        document.layers['lc'+ii+'_'+jj].zIndex=eval(96-6*ii);
                        document.layers['lc'+ii+'_'+jj].visibility="show";
                    }
                    else {
                        document.layers['lc'+ii+'_'+jj].visibility="hide";
                    }
                }
            } else {
                document.layers['lg'+ii].visibility="hide";
                for (jj=0; jj<Ncol-1; jj++) {
                    document.layers['lc'+ii+'_'+jj].visibility="hide";
                }
            }
            if ((ii<=ss)&&(fldlr[1][ii]>=0)) { 
                cc=col[fldlr[1][ii]];
                document.layers['rg'+ii].visibility="show";
                for (jj=0; jj<Ncol-1; jj++) {
                    if (jj==cc) { 
                        document.layers['rc'+ii+'_'+jj].zIndex=eval(96-6*ii);
                        document.layers['rc'+ii+'_'+jj].visibility="show";
                    } else {
                        document.layers['rc'+ii+'_'+jj].visibility="hide";
                    }
                }
            } else { 
                document.layers['rg'+ii].visibility="hide";
                for (jj=0; jj<Ncol-1; jj++) {
                    document.layers['rc'+ii+'_'+jj].visibility="hide";
                }
            }
        }
        if ((fldlr[0][ss]==-1)) { 
            cc=fldlr[0][ss+1];
            if (cc<0) {
                cc=0;
            } 
            document.layers['lc'+ss+'_'+col[cc]].zIndex=eval(94-6*ss);
            document.layers['lc'+ss+'_'+col[cc]].visibility="show";
        }
        if ((fldlr[1][ss]==-1)) {
            cc=fldlr[1][ss+1];
            if (cc<0) {
                cc=0;
            }
            document.layers['rc'+ss+'_'+col[cc]].zIndex=eval(94-6*ii);
            document.layers['rc'+ss+'_'+col[cc]].visibility="show";
        }
        for (jj=0; jj<Ncol-1; jj++)
        { 
            if (jj==col[flds]) {
                document.layers['bg'+jj].visibility="show";
            } else {
                document.layers['bg'+jj].visibility="hide";
            }
        }
        document.layers['lt'].top=Y0-39+yo[ss];
        document.layers['lt'].zIndex=eval(95-6*ss);
        document.layers['lt'].visibility="show";
        document.layers['lb'].top=Y0+200-yo[ss];
        document.layers['lb'].zIndex=eval(95-6*ss);
        document.layers['lb'].visibility="show";
        document.layers['ll'].left=XM-160+xl[ss];
        document.layers['lr'].left=XM+159-xl[ss];
    } else { 
        if (key=='s') {
            document.getElementById('goal').style.visibility="hidden";
            document.getElementById('start').style.visibility="visible"; 
            return; 
        }
        if (key=='z') 
        { 
            document.getElementById('start').style.visibility="hidden";
            document.getElementById('goal').style.visibility="visible"; 
            return; 
        }
        document.getElementById('start').style.visibility="hidden";
        document.getElementById('goal').style.visibility="hidden";
        for (ii=0; ii<12; ii++) { 
            if ((ii<=ss)&&(fldlr[0][ii]>=0)) {
                cc=col[fldlr[0][ii]];
                document.getElementById('lg'+ii+'0').style.visibility="visible";
                for (jj=0; jj<Ncol-1; jj++) {
                    if (jj==cc) {
                        document.getElementById('lc'+ii+'_'+jj+'0').style.zIndex=eval(96-6*ii);
                        document.getElementById('lc'+ii+'_'+jj+'0').style.visibility="visible";
                    } else {
                        document.getElementById('lc'+ii+'_'+jj+'0').style.visibility="hidden";
                    }
                }
            } else {
                document.getElementById('lg'+ii+'0').style.visibility="hidden";
                for (jj=0; jj<Ncol-1; jj++) {
                    document.getElementById('lc'+ii+'_'+jj+'0').style.visibility="hidden";
                }
            }
            if ((ii<=ss)&&(fldlr[1][ii]>=0)) { 
                cc=col[fldlr[1][ii]];
                document.getElementById('rg'+ii+'0').style.visibility="visible";
                for (jj=0; jj<Ncol-1; jj++)
                { 
                    if (jj==cc) {
                        document.getElementById('rc'+ii+'_'+jj+'0').style.zIndex=eval(96-6*ii);
                        document.getElementById('rc'+ii+'_'+jj+'0').style.visibility="visible";
                    } else {
                        document.getElementById('rc'+ii+'_'+jj+'0').style.visibility="hidden";
                    }
                }
            } else { 
                document.getElementById('rg'+ii+'0').style.visibility="hidden";
                for (jj=0; jj<Ncol-1; jj++) {
                    document.getElementById('rc'+ii+'_'+jj+'0').style.visibility="hidden";
                }
            }
        }

        if ((fldlr[0][ss]==-1))
        { 
            cc=fldlr[0][ss+1];
            if (cc<0) {
                cc=0;
            }
            document.getElementById('lc'+ss+'_'+col[cc]+'0').style.zIndex=eval(94-6*ss);
            document.getElementById('lc'+ss+'_'+col[cc]+'0').style.visibility="visible";
        }
        if ((fldlr[1][ss]==-1))//&&((ss>0)||(flds<0)))
        { 
            cc=fldlr[1][ss+1];
            if (cc<0) {
                cc=0;
            }
            document.getElementById('rc'+ss+'_'+col[cc]+'0').style.zIndex=eval(94-6*ii);
            document.getElementById('rc'+ss+'_'+col[cc]+'0').style.visibility="visible";
        }
        for (jj=0; jj<Ncol-1; jj++)
        { 
            if (jj==col[flds]) {
                document.getElementById('bg'+jj+'0').style.visibility="visible";
            } else {
                document.getElementById('bg'+jj+'0').style.visibility="hidden";
            }
        }
        document.getElementById('lt').style.top=Y0-39+yo[ss];
        document.getElementById('lt').style.zIndex=eval(95-6*ss);
        document.getElementById('lt').style.visibility="visible";
        document.getElementById('lb').style.top=Y0+200-yo[ss];
        document.getElementById('lb').style.zIndex=eval(95-6*ss);
        document.getElementById('lb').style.visibility="visible";
        document.getElementById('ll').style.left=XM-160+xl[ss];
        document.getElementById('lr').style.left=XM+159-xl[ss];
    }
}

function Help()
{
    alert("Find a way through the labyrinth! The two white fields, which are at two"+"\nopposite corners of the rectangular labyrinth, are the start end end fields."+"\nThis are the only fields you can go through. In order to walk forward or to"+"\nturn around, press the arrow keys. Every new labyrinth will be generated"+"\nrandomly. There is a way through every labyrinth that you get. Good luck!"); 
  window.document.MainForm.HelpButton.blur();
}

Init(0);

var r2 = document.getElementById('r2');
r2.onclick = Init;
var r3 = document.getElementById('r3');
r3.onclick = Left;
var r4 = document.getElementById('r4');
r4.onclick = Up;
var r5 = document.getElementById('r5');
r5.onclick = Right;
var r6 = document.getElementById('r6');
r6.onclick = Help;
var r7 = document.getElementById('r7');
r7.onclick = Init;
var r8 = document.getElementById('r8');
r8.onclick = Init;
var r9 = document.getElementById('r9');
r9.onclick = Init;
document.onkeydown = KeyDown;
var body = document.getElementById('body');
body.onkeydown = KeyDown;
body.onresize = history.go;
