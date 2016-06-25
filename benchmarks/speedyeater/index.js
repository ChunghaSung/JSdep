var i, j, MaxFld=8, MaxMove=109, IsOver, Start0;
var MoveCount, MaxMoveCount, Start;
IsPlayer = new Array(2);
Level = new Array(2);
Fld = new Array(MaxFld);
for (i=0; i<MaxFld; i++) {
    Fld[i] = new Array(MaxFld);  
}
Eater = new Array(2);
for (i=0; i<2; i++) {
    Eater[i] = new Array(2);
}
DirH = new Array(MaxMove+7);
LenH = new Array(MaxMove+7);
FldH = new Array(4);
for (i=0; i<4; i++) {
    FldH[i] = new Array(MaxMove+7);
}

Pic= new Array(2);
for (i=0; i<2; i++) {
    Pic[i] = new Array(5);
}
for (i=0; i<2; i++)
{ 
    for (j=0; j<5; j++) {
        Pic[i][j] = new Image();
    }
}
Pic[0][0].src = "speed1.gif"
Pic[1][0].src = "speed0.gif"
Pic[0][1].src = "speed10.gif"
Pic[1][1].src = "speed00.gif"
Pic[0][2].src = "speed11.gif"
Pic[1][2].src = "speed01.gif"
Pic[0][3].src = "speed12.gif"
Pic[1][3].src = "speed02.gif"
Pic[0][4].src = "speed13.gif"
Pic[1][4].src = "speed03.gif"

Start0=1;
Level[0]=1;
Level[1]=1;
IsPlayer[0]=true;
IsPlayer[1]=false; 

function Init()
{ 
    for (i=0; i<MaxFld; i++)
    {
        for (j=0; j<MaxFld; j++) {
            Fld[i][j]=-1;
        }
    }
    Eater[1][0]=0;        
    Eater[1][1]=MaxFld-1; 
    Eater[0][0]=MaxFld-1; 
    Eater[0][1]=0;        
    IsOver=false;
    MoveCount=0;
    if (Start0>0) {
        Start=0;
    } else {
        Start=1;
    }
    RefreshScreen();
}

function SetOption(n, m)
{ 
    if (n<2) 
    { if (m==0)
        IsPlayer[n]=true;
        else
        { IsPlayer[n]=false;
            Level[n]=m;
        }
    } else {
        Start0=m; 
    }
}

function Timer()
{ 
    if ((! IsPlayer[0])||(! IsPlayer[1])) {
        MakeBestMove();
    }
}

function Clicked(iiM, jjM)
{ 
    var kk=(MoveCount+Start)%2, dd=45;
    if (IsOver) {
        return;
    }
    if (! IsPlayer[kk]) {
        return;
    }
    if (iiM==Eater[kk][0])
    {
        if (jjM<Eater[kk][1])
        {
            if (Move(kk, 1, true)<0) {
                alert("Invalid move !");
            } else {
                MoveText();
            }
            return;
        }
        if (jjM>Eater[kk][1])
        { 
            if (Move(kk, 3, true)<0) {
                alert("Invalid move !");
            } else {
                MoveText();
            }
            return;
        }
    }
    if (jjM==Eater[kk][1])
    { 
        if (iiM<Eater[kk][0])
        {
            if (Move(kk, 0, true)<0) {
                alert("Invalid move !");
            } else {
                MoveText();
            }
            return;
        }
        if (iiM>Eater[kk][0])
        { 
            if (Move(kk, 2, true)<0) {
                alert("Invalid move !");
            } else {
                MoveText();
            }
            return;
        }
    }
    alert("Invalid move !");
} 

function MoveBack()
{
    IsOver=false;
    MoveCount--;
    var xx, yy, ll, kk=(MoveCount+Start)%2;
    if (DirH[MoveCount]==0)
    {
        Eater[kk][0]+=LenH[MoveCount];
        xx=Eater[kk][0];
        yy=Eater[kk][1];
        for (ll=LenH[MoveCount]; ll>=0; ll--) {
            Fld[xx-ll][yy]=FldH[ll][MoveCount];
        }
    }
    if (DirH[MoveCount]==1)
    { 
        Eater[kk][1]+=LenH[MoveCount];
        xx=Eater[kk][0];
        yy=Eater[kk][1];
        for (ll=LenH[MoveCount]; ll>=0; ll--) {
            Fld[xx][yy-ll]=FldH[ll][MoveCount];
        }
    }
    if (DirH[MoveCount]==2)  
    { 
        Eater[kk][0]-=LenH[MoveCount];
        xx=Eater[kk][0];
        yy=Eater[kk][1];
        for (ll=LenH[MoveCount]; ll>=0; ll--) {
            Fld[xx+ll][yy]=FldH[ll][MoveCount];
        }
    }
    if (DirH[MoveCount]==3)  
    { 
        Eater[kk][1]-=LenH[MoveCount];
        xx=Eater[kk][0];
        yy=Eater[kk][1];
        for (ll=LenH[MoveCount]; ll>=0; ll--) {
            Fld[xx][yy+ll]=FldH[ll][MoveCount];
        }
    }
}

function Back()
{ 
    if (MoveCount>0)
    {
        if (IsOver)
        {
            IsOver=false;
            MoveBack();
            RefreshScreen();
        } else {
            RefreshPics(MoveCount-1, 0);
            MoveBack();
        }
    }
}

function Replay()
{ 
    if (MoveCount<MaxMoveCount)
    {
        var kk=(MoveCount+Start)%2;
        var ddir=DirH[MoveCount];
        Move(kk, ddir, false);
        MoveText();
    }
}

function GetMax(vv0, vv1, vv2, vv3) 
{
    var mm=vv0;
    if (mm<vv1) {
        mm=vv1;
    }
    if (mm<vv2) {
        mm=vv2;
    }
    if (mm<vv3) {
        mm=vv3;
    }
    return(mm);
}

function MakeBestMove()
{ 
    var ii, jj, kk;
    var ii0, ii1, ii2, ii3, ii4, ii5, ii6;
    vv0=new Array(4);
    vv1=new Array(4);
    vv2=new Array(4);
    vv3=new Array(4);
    vv4=new Array(4);
    vv5=new Array(4);
    vv6=new Array(4);
    var bb0, bb1, bb2, bb3, bb4, bb5, bb6;
    if (IsOver) {
        return;
    }
    kk=(MoveCount+Start)%2;
    if (IsPlayer[kk]) {
        return;
    }
    for (ii0=0; ii0<4; ii0++)
    { 
        bb0=Move(kk, ii0, true);
        vv0[ii0]=Math.floor(Math.random()*1000)%(7+ii0)+bb0*64;
        if (bb0>=0)
        {
            for (ii1=0; ii1<4; ii1++)
            {
                bb1=Move(1-kk, ii1, true);
                vv1[ii1]=bb1*32;
                if (bb1>=0)
                {
                    for (ii2=0; ii2<4; ii2++)
                    {
                        bb2=Move(kk, ii2, true);
                        vv2[ii2]=bb2*16;
                        if (bb2>=0)
                        { 
                            if (Level[kk]>0)
                            {
                                for (ii3=0; ii3<4; ii3++)
                                {
                                    bb3=Move(1-kk, ii3, true);
                                    vv3[ii3]=bb3*8;
                                    if (bb3>=0)
                                    {
                                        for (ii4=0; ii4<4; ii4++)
                                        {
                                            bb4=Move(kk, ii4, true);
                                            vv4[ii4]=bb4*4;
                                            if (bb4>=0)
                                            {
                                                if (Level[kk]>1)
                                                {
                                                    for (ii5=0; ii5<4; ii5++)
                                                    {
                                                        bb5=Move(1-kk, ii5, true);
                                                        vv5[ii5]=bb5*2;
                                                        if (bb5>=0)
                                                        {
                                                            for (ii6=0; ii6<4; ii6++)
                                                            { 
                                                                bb6=Move(kk, ii6, true);
                                                                vv6[ii6]=bb6;
                                                                if (bb6>=0) {
                                                                    MoveBack();
                                                                }
                                                            }
                                                            MoveBack();
                                                            vv5[ii5]-=GetMax(vv6[0], vv6[1], vv6[2], vv6[3]);
                                                        } else {
                                                            vv5[ii5]-=200;
                                                        }
                                                    }
                                                    vv4[ii4]-=GetMax(vv5[0], vv5[1], vv5[2], vv5[3]);
                                                }
                                                MoveBack();
                                            } else {
                                                vv4[ii4]-=400;
                                            }
                                        }
                                        MoveBack();
                                        vv3[ii3]-=GetMax(vv4[0], vv4[1], vv4[2], vv4[3]);
                                    } else {
                                        vv3[ii3]-=800;
                                    }
                                }
                                vv2[ii2]-=GetMax(vv3[0], vv3[1], vv3[2], vv3[3]);
                            }
                            MoveBack();
                        } else {
                            vv2[ii2]-=1600;
                        }
                    }
                    MoveBack();
                    vv1[ii1]-=GetMax(vv2[0], vv2[1], vv2[2], vv2[3]);
                } else {
                    vv1[ii1]-=3200;
                }
            }
            vv0[ii0]-=GetMax(vv1[0], vv1[1], vv1[2], vv1[3]);
            MoveBack();
        } else {
            vv0[ii0]-=6400;
        }
    }
    ii=0; jj=vv0[0];
    if (vv0[1]>jj) { 
        jj=vv0[1]; 
        ii=1;
    }
    if (vv0[2]>jj) {
        jj=vv0[2]; 
        ii=2;
    }
    if (vv0[3]>jj) {
        jj=vv0[3];
        ii=3;
    }
    Move(kk, ii, true);
    MoveText();
}

function Move(kk, ddir, IsNewMove)
{ 
    var ddm, ii, jj, ll, vv=19;
    vval=new Array(4);
    dd=new Array(4);
    if (IsOver) {
        return(-1);
    }
    if (((MoveCount+Start)%2)!=kk) {
        return(-1);
    }
    for (ii=0; ii<4; ii++)
    {
        vval[ii]=-vv;
        dd[ii]=0;
    }
    ii=Eater[kk][0];
    jj=Eater[kk][1];
    ddm=3;
    for (ii=Eater[kk][0]-1; ((ii>=0)&&(ddm>0)); ii--)
    { 
        dd[0]++;
        if (ddm==3) {
            vval[0]+=vv;
        }
        if (Fld[ii+1][jj]==-1) {
            vval[0]++;
        }
        if (Fld[ii][jj]==1-kk)
        {
            vval[0]++;
            ddm=0;
        }
        if (Fld[ii][jj]==kk) {
            ddm--;
        }
        if (Fld[ii][jj]==-1) {
            ddm-=2;
        }
        if ((ii==Eater[1-kk][0])&&(jj==Eater[1-kk][1]))
        {
            vval[0]+=77;
            ddm=0;
        }
    }
    ii=Eater[kk][0];
    jj=Eater[kk][1];
    ddm=3;
    for (jj=Eater[kk][1]-1; ((jj>=0)&&(ddm>0)); jj--)
    { 
        dd[1]++;
        if (ddm==3) {
            vval[1]+=vv;
        }
        if (Fld[ii][jj+1]==-1) {
            vval[1]++;
        }
        if (Fld[ii][jj]==1-kk)
        {
            vval[1]++;
            ddm=0;
        }
        if (Fld[ii][jj]==kk) {
            ddm--;
        }
        if (Fld[ii][jj]==-1) {
            ddm-=2;
        }
        if ((ii==Eater[1-kk][0])&&(jj==Eater[1-kk][1]))
        {
            vval[1]+=77;
            ddm=0;
        }
    }
    ii=Eater[kk][0];
    jj=Eater[kk][1];
    ddm=3;
    for (ii=Eater[kk][0]+1; ((ii<MaxFld)&&(ddm>0)); ii++)
    {
        dd[2]++;
        if (ddm==3) {
            vval[2]+=vv;
        }
        if (Fld[ii-1][jj]==-1) {
            vval[2]++;
        }
        if (Fld[ii][jj]==1-kk)
        {
            vval[2]++;
            ddm=0;
        }
        if (Fld[ii][jj]==kk) {
            ddm--;
        }
        if (Fld[ii][jj]==-1) {
            ddm-=2;
        }
        if ((ii==Eater[1-kk][0])&&(jj==Eater[1-kk][1]))
        {
            vval[2]+=77;
            ddm=0;
        }
    }
    ii=Eater[kk][0];
    jj=Eater[kk][1];
    ddm=3;
    for (jj=Eater[kk][1]+1; ((jj<MaxFld)&&(ddm>0)); jj++)
    {
        dd[3]++;
        if (ddm==3) {
            vval[3]+=vv;
        }
        if (Fld[ii][jj-1]==-1) {
            vval[3]++;
        }
        if (Fld[ii][jj]==1-kk)
        {
            vval[3]++;
            ddm=0;
        }
        if (Fld[ii][jj]==kk) {
            ddm--;
        }
        if (Fld[ii][jj]==-1) {
            ddm-=2;
        }
        if ((ii==Eater[1-kk][0])&&(jj==Eater[1-kk][1]))
        {
            vval[3]+=77;
            ddm=0;
        }
    }
    ddm=-vv;
    for (ii=0; ii<4; ii++)
    {
        if (ddm<vval[ii]) {
            ddm=vval[ii];
        }
    }
    if (vval[ddir]<ddm) {
        return(-1);
    }
    ll=0;
    ii=Eater[kk][0];
    jj=Eater[kk][1];
    if (ddir==0)
    {
        for (ii=Eater[kk][0]; ii>Eater[kk][0]-dd[0]; ii--)
        {
            FldH[ll++][MoveCount]=Fld[ii][jj];
            Fld[ii][jj]=kk;
        }
        FldH[ll][MoveCount]=Fld[ii][jj];
        if (Fld[ii][jj]==1-kk) {
            Fld[ii][jj]=-1;
        }
        Eater[kk][0]-=dd[0];
    }
    if (ddir==1)
    { 
        for (jj=Eater[kk][1]; jj>Eater[kk][1]-dd[1]; jj--)
        {
            FldH[ll++][MoveCount]=Fld[ii][jj];
            Fld[ii][jj]=kk;
        }
        FldH[ll][MoveCount]=Fld[ii][jj];
        if (Fld[ii][jj]==1-kk) {
            Fld[ii][jj]=-1;
        }
        Eater[kk][1]-=dd[1];
    }     
    if (ddir==2)
    { 
        for (ii=Eater[kk][0]; ii<Eater[kk][0]+dd[2]; ii++)
        {
            FldH[ll++][MoveCount]=Fld[ii][jj];
            Fld[ii][jj]=kk;
        }
        FldH[ll][MoveCount]=Fld[ii][jj];
        if (Fld[ii][jj]==1-kk) {
            Fld[ii][jj]=-1;
        }
        Eater[kk][0]+=dd[2];
    }     
    if (ddir==3)
    { 
        for (jj=Eater[kk][1]; jj<Eater[kk][1]+dd[3]; jj++)
        {
            FldH[ll++][MoveCount]=Fld[ii][jj];
            Fld[ii][jj]=kk;
        }
        FldH[ll][MoveCount]=Fld[ii][jj];
        if (Fld[ii][jj]==1-kk) {
            Fld[ii][jj]=-1;
        }
        Eater[kk][1]+=dd[3];
    }
    DirH[MoveCount]=ddir;
    LenH[MoveCount]=dd[ddir];
    MoveCount++;
    if (IsNewMove) {
        MaxMoveCount=MoveCount;
    }
    if ((Eater[0][0]==Eater[1][0])&&(Eater[0][1]==Eater[1][1])) {
        IsOver=true;
    }
    return(ddm);
}

function MoveText()
{ 
    if (! IsOver)
    {
        if (MoveCount==MaxMove-1)
        {
            RefreshScreen();
            IsOver=true;
            alert("It's a draw !");
        } else {
            RefreshPics(MoveCount-1, 1);
        }
    } else { 
        RefreshScreen();
        if ((MoveCount+Start)%2==1) {
            alert("Yellow wins !");
        } else {
            alert("Green wins !");
        }
    }
}

function RefreshPics(mm, rr)
{ 
    var ff, xx, yy, ll, kk=(mm+Start)%2;
    if (DirH[mm]==0)
    {
        xx=Eater[kk][0]+LenH[mm];
        yy=Eater[kk][1];
        if (rr==0) 
        {
            for (ll=LenH[mm]; ll>=0; ll--) {
                window.document.images[MaxFld*(xx-ll)+yy].src = Pic[(xx-ll+yy)%2][FldH[ll][mm]+1].src;
            }
            window.document.images[MaxFld*xx+yy].src = Pic[(xx+yy)%2][kk+3].src;
        } else {
            for (ll=LenH[mm]; ll>=0; ll--) {
                window.document.images[MaxFld*(xx-ll)+yy].src = Pic[(xx-ll+yy)%2][kk+1].src;
            }
            window.document.images[MaxFld*(xx-LenH[mm])+yy].src = Pic[(xx-LenH[mm]+yy)%2][kk+3].src;
        }
    }
    if (DirH[mm]==1)
    { 
        xx=Eater[kk][0];
        yy=Eater[kk][1]+LenH[mm];
        if (rr==0) 
        {
            for (ll=LenH[mm]; ll>=0; ll--) {
                window.document.images[MaxFld*xx+(yy-ll)].src = Pic[(xx+yy-ll)%2][FldH[ll][mm]+1].src;
            }
            window.document.images[MaxFld*xx+yy].src = Pic[(xx+yy)%2][kk+3].src;
        } else {
            for (ll=LenH[mm]; ll>=0; ll--) {
                window.document.images[MaxFld*xx+(yy-ll)].src = Pic[(xx+yy-ll)%2][kk+1].src;
            }
            window.document.images[MaxFld*xx+(yy-LenH[mm])].src = Pic[(xx+yy-LenH[mm])%2][kk+3].src;
        }
    }
    if (DirH[mm]==2)  
    { 
        xx=Eater[kk][0]-LenH[mm];
        yy=Eater[kk][1];
        if (rr==0) 
        {
            for (ll=LenH[mm]; ll>=0; ll--) {
                window.document.images[MaxFld*(xx+ll)+yy].src = Pic[(xx+ll+yy)%2][FldH[ll][mm]+1].src;
            }
            window.document.images[MaxFld*xx+yy].src = Pic[(xx+yy)%2][kk+3].src;
        } else { 
            for (ll=LenH[mm]; ll>=0; ll--) {
                window.document.images[MaxFld*(xx+ll)+yy].src = Pic[(xx+ll+yy)%2][kk+1].src;
            }
            window.document.images[MaxFld*(xx+LenH[mm])+yy].src = Pic[(xx+LenH[mm]+yy)%2][kk+3].src;
        }
    }
    if (DirH[mm]==3)  
    { 
        xx=Eater[kk][0];
        yy=Eater[kk][1]-LenH[mm];
        if (rr==0) 
        {
            for (ll=LenH[mm]; ll>=0; ll--) {
                window.document.images[MaxFld*xx+(yy+ll)].src = Pic[(xx+yy+ll)%2][FldH[ll][mm]+1].src;
            }
            window.document.images[MaxFld*xx+yy].src = Pic[(xx+yy)%2][kk+3].src;
        } else { 
            for (ll=LenH[mm]; ll>=0; ll--) {
                window.document.images[MaxFld*xx+(yy+ll)].src = Pic[(xx+yy+ll)%2][kk+1].src;
            }
            window.document.images[MaxFld*xx+(yy+LenH[mm])].src = Pic[(xx+yy+LenH[mm])%2][kk+3].src;
        }
    }
    if (mm+rr>99) {
        window.document.OptionsForm.Moves.value=eval(mm+rr);
    } else {
        if (mm+rr>9) {
            window.document.OptionsForm.Moves.value=" "+eval(mm+rr)+" ";
        } else {
            window.document.OptionsForm.Moves.value="  "+eval(mm+rr)+"  ";
        }
    }
}

function RefreshScreen()
{ 
    var kk=(MoveCount+Start)%2;
    for (i=0; i<MaxFld; i++)
    {
        for (j=0; j<MaxFld; j++) {
            window.document.images[MaxFld*i+j].src = Pic[(i+j)%2][Fld[i][j]+1].src;
        }
    }
    j=kk;
    for (i=0; i<2; i++)
    { 
        window.document.images[MaxFld*Eater[j][0]+Eater[j][1]].src = Pic[(Eater[j][0]+Eater[j][1])%2][j+3].src;
        j=1-kk;
    }
    if (MoveCount>99) {
        window.document.OptionsForm.Moves.value=MoveCount;
    } else {
        if (MoveCount>9) {
            window.document.OptionsForm.Moves.value=" "+MoveCount+" ";
        } else {
            window.document.OptionsForm.Moves.value="  "+MoveCount+"  ";
        }
    }
}

function Help()
{ 
    alert("The aim of the game is to eat the opponent's eater. The eater move alternately. Each eater has at"+"\nmost 4 possibilities to move (to the left, right, top and bottom). An eater can jump over an empty"+"\nfield, after that this field (if not marked yet) and the field where the eater came from will be marked"+"\nwith the color of that eater. It is not possible to jump over a field if it is marked with the opponent's"+"\ncolor, but the field can be occupied by the eater. An eater can and must jump over two fields, if they"+"\nboth are marked with the own color. An Eater must always make a move with the highest value."+"\nThe value for every field that will be marked is one. When an eater moves on a field which is"+"\nmarked with the opponent's color, the value is also one. So if an eater comes from an empty field"+"\nand jumps over an empty field on a field with the opponent's color, the value of this move is 3."+"\nThe highest value has the move by which an eater eats the other eater. If both eaters are on the"+"\ngame board after 108 moves, it's a draw.");
}

function Resize()
{ 
    if (navigator.appName == "Netscape") {
        history.go(0);
    }
}
Init();
setInterval(Timer, 200);

document.onresize = Resize;

var s0 = document.getElementById("s0");
s0.onmousedown = Clicked;
var s1 = document.getElementById("s1");
s1.onmousedown = Clicked;
var s2 = document.getElementById("s2");
s2.onmousedown = Clicked;

var r0 = document.getElementById("r0");
r0.onclick = SetOption;
var r1 = document.getElementById("r1");
r1.onclick = SetOption;
var r2 = document.getElementById("r2");
r2.onclick = SetOption;
var r3 = document.getElementById("r3");
r3.onclick = SetOption;
var r4 = document.getElementById("r4");
r4.onclick = SetOption;
var r5 = document.getElementById("r5");
r5.onclick = SetOption;
var r6 = document.getElementById("r6");
r6.onclick = SetOption;
var r7 = document.getElementById("r7");
r7.onclick = SetOption;
var r8 = document.getElementById("r8");
r8.onclick = SetOption;

var b0 = document.getElementById("b0");
b0.onclick = Help;

var b1 = document.getElementById("b1");
b1.onclick = Back;
var b2 = document.getElementById("b2");
b2.onclick = Back;
var b3 = document.getElementById("b3");
b3.onclick = Replay;
var b4 = document.getElementById("b4");
b4.onclick = Replay;
