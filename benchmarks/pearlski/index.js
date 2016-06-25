var IsNetscape=false, IsNetscape4=false;
if (navigator.appName == "Netscape")
{
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
if (window.event) {
    KeyDown(window.event.keyCode);
}
var i, j, k, l, X0, Y0, IsOver, Max, Type=1, NDraw, Moves, MaxMoves, MovesLimit=7, IsRepeat;
Move = new Array(10);
PreFld = new Array(3);
for (i=0; i<3; i++) {
    PreFld[i] = new Array(3);
}
for (i=0; i<3; i++)
{ 
    for (j=0; j<3; j++) {
        PreFld[i][j] = new Array(3);
    }
}
Fld = new Array(3);
for (i=0; i<3; i++) {
    Fld[i] = new Array(3);
}
for (i=0; i<3; i++)
{ 
    for (j=0; j<3; j++) {
        Fld[i][j] = new Array(3);
    }
} 
TmpFld = new Array(3);
for (i=0; i<3; i++) {
    TmpFld[i] = new Array(3);
}

Pic = new Array(3);
for (i=0; i<3; i++) {
    Pic[i] = new Array(5);
}
for (i=0; i<3; i++)
{ 
    for (j=0; j<5; j++) 
    { 
        Pic[i][j] = new Image();
        Pic[i][j].src = "pearl_"+eval(i)+eval(j)+".gif";
    }
}

var ebid;
if (document.getElementById) {
    ebid=true;
} else {
    ebid=false;
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
    if (whichkey == 37) {
        Left();
    }
    if (whichkey == 38) {
        Up();
    }
    if (whichkey == 39) {
        Right();
    }
    if (whichkey == 40) {
        Down();
    }
    if (whichkey == 52) {
        Left();
    }
    if (whichkey == 56) {
        Up();
    }
    if (whichkey == 54) {
        Right();
    }
    if (whichkey == 50) {
        Down();
    }
}  

function Up()
{ 
    var ii, jj, kk;
    if ((IsOver)||(NDraw>0)) {
        return;
    }
    for (ii=0; ii<Max; ii++)
    { 
        for (jj=0; jj<Max; jj++)
        { 
            for (kk=0; kk<Max; kk++) {
                TmpFld[jj][kk]=Fld[ii][kk][Max-1-jj];
            }
        }
        for (jj=0; jj<Max; jj++)
        { 
            for (kk=0; kk<Max; kk++) {
                Fld[ii][jj][kk]=TmpFld[jj][kk];
            }
        }
    }
    Moves++;
    NDraw=3;
    RefreshScreen();
}

function Down()
{
    var ii, jj, kk;
    if ((IsOver)||(NDraw>0)) {
        return;
    }
    for (ii=0; ii<Max; ii++)
    { 
        for (jj=0; jj<Max; jj++)
        { 
            for (kk=0; kk<Max; kk++) {
                TmpFld[jj][kk]=Fld[ii][Max-1-kk][jj];
            }
        }
        for (jj=0; jj<Max; jj++)
        { 
            for (kk=0; kk<Max; kk++) {
                Fld[ii][jj][kk]=TmpFld[jj][kk];
            }
        }
    }
    Moves++;
    NDraw=3;
    RefreshScreen();
}

function Left()
{ 
    var ii, jj, kk;
    if ((IsOver)||(NDraw>0)) {
        return;
    }
    for (jj=0; jj<Max; jj++)
    { 
        for (ii=0; ii<Max; ii++)
        { 
            for (kk=0; kk<Max; kk++) {
                TmpFld[ii][kk]=Fld[kk][jj][Max-1-ii];
            }
        }
        for (ii=0; ii<Max; ii++)
        { 
            for (kk=0; kk<Max; kk++) {
                Fld[ii][jj][kk]=TmpFld[ii][kk];
            }
        }
    }
    Moves++;
    NDraw=3;
    RefreshScreen();
}

function Right()
{ 
    var ii, jj, kk;
    if ((IsOver)||(NDraw>0)) {
        return;
    }
    for (jj=0; jj<Max; jj++)
    { 
        for (ii=0; ii<Max; ii++)
        { 
            for (kk=0; kk<Max; kk++) {
                TmpFld[ii][kk]=Fld[Max-1-kk][jj][ii];
            }
        }
        for (ii=0; ii<Max; ii++)
        { 
            for (kk=0; kk<Max; kk++) {
                Fld[ii][jj][kk]=TmpFld[ii][kk];
            }
        }
    }
    Moves++;
    NDraw=3;
    RefreshScreen();
}

function SetType(tt)
{ 
    Type=tt;
    Scramble(true);
    window.document.OptionsForm.New.focus();
    window.document.OptionsForm.New.blur();
}

function Show()
{ 
    if (MovesLimit>=7)
    { 
        alert("Sorry, can't show when unlimited number of moves is selected.");
        return;
    }
    alert("Show is not solve !");
    Scramble(false);
    IsOver=true;
    NDraw=2;
    RefreshScreen();
}

function Timer()
{ 
    if ((IsOver)&&(Moves>=MaxMoves)&&(NDraw<=0))
    { 
        return;
        if (NDraw==-3)
        { 
            RefreshScreen();
            NDraw=0;
        } else {
            NDraw--;
        }
    } else { 
        if ((IsOver)&&(NDraw==0))
        { 
            Turn(Move[Moves], false);
            NDraw=4;
            Moves++;
            RefreshScreen();
        }
        if (NDraw>0)
        { 
            NDraw--;
            if (NDraw<2) {
                OverTest();
            }
            RefreshScreen();
        }
    }
}

function GetMaxMove(mm)
{ 
    var ii, jj, kk, dd, bb=false;
    nn = new Array(10);
    for (ii=0; ii<mm; ii++) {
        nn[ii]=0;
    }
    IsOver=false;
    for (ii=0; ii<Max; ii++)
    { 
        for (jj=0; jj<Max; jj++)
        { 
            for (kk=0; kk<Max; kk++) {
                Fld[ii][jj][kk]=PreFld[ii][jj][kk];
            }
        }
    }
    for (ii=0; ii<mm; ii++)
    { 
        Move[ii]=nn[ii];
        Turn(nn[ii], true);
    }
    dd=0;
    IsOver=true;
    for (ii=0; ii<Max; ii++)
    { 
        for (jj=0; jj<Max; jj++)
        { 
            for (kk=0; kk<Max; kk++)
            { 
                if (Fld[ii][jj][kk]>0) {
                    IsOver=false;
                }
                if (Fld[ii][jj][kk]==3) {
                    dd++;
                }
            }
        }
    }
    if (dd==0) {
        bb=true;
    }
    dd=1;
    for (ii=mm-1; ii>=0; ii--)
    {
        nn[ii]+=dd;
        if (nn[ii]>=4) {
            nn[ii]=0;
        } else {
            dd=0;
        }
    }
    while ((!IsOver)&&(dd==0)) {
        for (ii=0; ii<Max; ii++)
        { 
            for (jj=0; jj<Max; jj++)
            { 
                for (kk=0; kk<Max; kk++) {
                    Fld[ii][jj][kk]=PreFld[ii][jj][kk];
                }
            }
        }
        for (ii=0; ii<mm; ii++)
        { 
            Move[ii]=nn[ii];
            Turn(nn[ii], true);
        }
        dd=0;
        IsOver=true;
        for (ii=0; ii<Max; ii++)
        { 
            for (jj=0; jj<Max; jj++)
            { 
                for (kk=0; kk<Max; kk++)
                { 
                    if (Fld[ii][jj][kk]>0) {
                        IsOver=false;
                    }
                    if (Fld[ii][jj][kk]==3) {
                        dd++;
                    }
                }
            }
        }
        if (dd==0) {
            bb=true;
        }
        dd=1;
        for (ii=mm-1; ii>=0; ii--)
        {
            nn[ii]+=dd;
            if (nn[ii]>=4) {
                nn[ii]=0;
            } else {
                dd=0;
            }
        }
    }
    return(bb);
}

function random(nn)
{
    return(Math.floor(Math.random()*1000)%nn);
}

function Scramble(IsNew)
{ 
    var ii, jj, kk, ccu, cco, bb;
    if (IsNew)
    { 
        Max=3;
        IsOver=false;
        for (ii=0; ii<Max; ii++)
        { 
            for (jj=0; jj<Max; jj++)
            { 
                for (kk=0; kk<Max; kk++)
                { 
                    if (((ii==0)||(ii==Max-1))&&((jj==0)||(jj==Max-1))&&((kk==0)||(kk==Max-1))) {
                        Fld[ii][jj][kk]=0;
                    } else {
                        Fld[ii][jj][kk]=-1;
                    }
                }
            }
        }
        Fld[0][0][1]=0;
        Fld[0][Max-1][1]=0;
        Fld[Max-1][0][1]=0;
        Fld[Max-1][Max-1][1]=0;
        Fld[1][0][0]=random(3);
        Fld[1][Max-1][0]=random(3);
        Fld[0][1][0]=random(3);
        Fld[Max-1][1][0]=random(3);
        Fld[1][0][Max-1]=random(3);
        Fld[1][Max-1][Max-1]=random(3);
        Fld[0][1][Max-1]=random(3);
        Fld[Max-1][1][Max-1]=random(3);
        if (Type==2)
        { Fld[1][Max-1][0]=-1;
            Fld[Max-1][0][1]=-1;
            Fld[0][1][Max-1]=-1;
        }
        ccu=0; cco=0;
        for (ii=0; ii<Max; ii++)
        {
            for (jj=0; jj<Max; jj++)
            { 
                for (kk=0; kk<Max; kk++)
                {
                    if (Fld[ii][jj][kk]==1) {
                        ccu++;
                    }
                    if (Fld[ii][jj][kk]==2) {
                        cco++;
                    }
                }
            }
        }
        if ((ccu>=2)&(cco>=2))
        { 
            for (ii=0; ii<Max; ii++)
            { 
                for (jj=0; jj<Max; jj++)
                { 
                    for (kk=0; kk<Max; kk++) {
                        PreFld[ii][jj][kk]=Fld[ii][jj][kk];
                    }
                }
            }
            MaxMoves=0;
            if (MovesLimit<7)
            { 
                bb=GetMaxMove(++MaxMoves);
                while (bb && (!IsOver) && (MaxMoves<MovesLimit)) {
                    bb=GetMaxMove(++MaxMoves);
                }
            } else {
                IsOver=true;
            }
        }
        while (!IsOver) {
            IsOver=false;
            for (ii=0; ii<Max; ii++)
            { 
                for (jj=0; jj<Max; jj++)
                { 
                    for (kk=0; kk<Max; kk++)
                    { 
                        if (((ii==0)||(ii==Max-1))&&((jj==0)||(jj==Max-1))&&((kk==0)||(kk==Max-1))) {
                            Fld[ii][jj][kk]=0;
                        } else {
                            Fld[ii][jj][kk]=-1;
                        }
                    }
                }
            }
            Fld[0][0][1]=0;
            Fld[0][Max-1][1]=0;
            Fld[Max-1][0][1]=0;
            Fld[Max-1][Max-1][1]=0;
            Fld[1][0][0]=random(3);
            Fld[1][Max-1][0]=random(3);
            Fld[0][1][0]=random(3);
            Fld[Max-1][1][0]=random(3);
            Fld[1][0][Max-1]=random(3);
            Fld[1][Max-1][Max-1]=random(3);
            Fld[0][1][Max-1]=random(3);
            Fld[Max-1][1][Max-1]=random(3);
            if (Type==2)
            { 
                Fld[1][Max-1][0]=-1;
                Fld[Max-1][0][1]=-1;
                Fld[0][1][Max-1]=-1;
            }
            ccu=0; cco=0;
            for (ii=0; ii<Max; ii++)
            {
                for (jj=0; jj<Max; jj++)
                { 
                    for (kk=0; kk<Max; kk++)
                    {
                        if (Fld[ii][jj][kk]==1) {
                            ccu++;
                        }
                        if (Fld[ii][jj][kk]==2) {
                            cco++;
                        }
                    }
                }
            }
            if ((ccu>=2)&(cco>=2))
            { 
                for (ii=0; ii<Max; ii++)
                { 
                    for (jj=0; jj<Max; jj++)
                    { 
                        for (kk=0; kk<Max; kk++) {
                            PreFld[ii][jj][kk]=Fld[ii][jj][kk];
                        }
                    }
                }
                MaxMoves=0;
                if (MovesLimit<7)
                { 
                    bb=GetMaxMove(++MaxMoves);
                    while (bb && (!IsOver) && (MaxMoves<MovesLimit)) {
                        bb=GetMaxMove(++MaxMoves);
                    }
                } else {
                    IsOver=true;
                }
            }
        }
        IsRepeat=false;
    } else {
        IsRepeat=true;
    }
    for (ii=0; ii<Max; ii++)
    {
        for (jj=0; jj<Max; jj++)
        { 
            for (kk=0; kk<Max; kk++) {
                Fld[ii][jj][kk]=PreFld[ii][jj][kk];
            }
        }
    }

    IsOver=false;
    Moves=0;
    NDraw=0;
    RefreshScreen();
    Now = new Date();
    StartTime = Now.getTime() / 1000;
    window.document.OptionsForm.New.focus();
    window.document.OptionsForm.New.blur();
}

function Turn(nn, bb)
{ 
    var ii, jj, kk, ss, ccu, cco;
    if (nn==0) { 
        for (ii=0; ii<Max; ii++) { 
            for (jj=0; jj<Max; jj++) { 
                for (kk=0; kk<Max; kk++) {
                    TmpFld[jj][kk]=Fld[ii][kk][Max-1-jj];
                }
            }
            for (jj=0; jj<Max; jj++) { 
                for (kk=0; kk<Max; kk++) {
                    Fld[ii][jj][kk]=TmpFld[jj][kk];
                }
            }
        }
    }
    if (nn==1) {
        for (ii=0; ii<Max; ii++) { 
            for (jj=0; jj<Max; jj++) { 
                for (kk=0; kk<Max; kk++) {
                    TmpFld[jj][kk]=Fld[ii][Max-1-kk][jj];
                }
            }
            for (jj=0; jj<Max; jj++) {
                for (kk=0; kk<Max; kk++) {
                    Fld[ii][jj][kk]=TmpFld[jj][kk];
                }
            }
        }
    }
    if (nn==2) { 
        for (jj=0; jj<Max; jj++) { 
            for (ii=0; ii<Max; ii++) { 
                for (kk=0; kk<Max; kk++) {
                    TmpFld[ii][kk]=Fld[kk][jj][Max-1-ii];
                }
            }
            for (ii=0; ii<Max; ii++) { 
                for (kk=0; kk<Max; kk++) {
                    Fld[ii][jj][kk]=TmpFld[ii][kk];
                }
            }
        }
    }
    if (nn==3) { 
        for (jj=0; jj<Max; jj++) {
            for (ii=0; ii<Max; ii++) { 
                for (kk=0; kk<Max; kk++) {
                    TmpFld[ii][kk]=Fld[Max-1-kk][jj][ii];
                }
            }
            for (ii=0; ii<Max; ii++) { 
                for (kk=0; kk<Max; kk++) {
                    Fld[ii][jj][kk]=TmpFld[ii][kk];
                }
            }
        }
    }
    if (! bb) {
        return;
    }
    for (ss=0; ss<2; ss++) {
        for (kk=0; kk<Max-1; kk++) {
            for (jj=0; jj<Max; jj++) { 
                for (ii=0; ii<Max; ii++) { 
                    ccu = Fld[ii][jj][kk];
                    if (ccu>=0) { 
                        cco = Fld[ii][jj][kk+1];
                        if (cco>0){ 
                            Fld[ii][jj][kk+1]=0;
                            if ((ccu>0)&&(ccu!=cco)) {
                                Fld[ii][jj][kk]=3;
                            } else {
                                Fld[ii][jj][kk]=cco;
                            }
                        }
                    }
                }
            }
        }   
        ccu=0; cco=0;
        for (ii=0; ii<Max; ii++) { 
            for (jj=0; jj<Max; jj++) { 
                for (kk=0; kk<Max; kk++) { 
                    if (Fld[ii][jj][kk]==1) {
                        ccu++;
                    }
                    if (Fld[ii][jj][kk]==2) {
                        cco++;
                    }
                }
            }
        }
        for (ii=0; ii<Max; ii++) { 
            for (jj=0; jj<Max; jj++) { 
                for (kk=0; kk<Max; kk++) { 
                    if ((ccu==1)&&(Fld[ii][jj][kk]==1)) {
                        Fld[ii][jj][kk]=0;
                    }
                    if ((cco==1)&&(Fld[ii][jj][kk]==2)) {
                        Fld[ii][jj][kk]=0;
                    }
                }
            }
        }
    }
}

function OverTest()
{ 
    var ii, jj, kk, ccu, cco;
    for (kk=0; kk<Max-1; kk++) {
        for (jj=0; jj<Max; jj++) { 
            for (ii=0; ii<Max; ii++) { 
                ccu=Fld[ii][jj][kk];
                if (ccu>=0) {
                    cco=Fld[ii][jj][kk+1];
                    if (cco>0) { 
                        Fld[ii][jj][kk+1]=0;
                        if ((ccu>0)&&(ccu!=cco)) {
                            Fld[ii][jj][kk]=3;
                        } else {
                            Fld[ii][jj][kk]=cco;
                        }
                    }
                }
            }
        }
    }
    ccu=0; cco=0;
    for (ii=0; ii<Max; ii++) { 
        for (jj=0; jj<Max; jj++) {
            for (kk=0; kk<Max; kk++) { 
                if (Fld[ii][jj][kk]==1) {
                    ccu++;
                }
                if (Fld[ii][jj][kk]==2) {
                    cco++;
                }
            }
        }
    }
    for (ii=0; ii<Max; ii++) { 
        for (jj=0; jj<Max; jj++) {
            for (kk=0; kk<Max; kk++) { 
                if ((ccu==1)&&(Fld[ii][jj][kk]==1)) {
                    Fld[ii][jj][kk]=0;
                }
                if ((cco==1)&&(Fld[ii][jj][kk]==2)) {
                    Fld[ii][jj][kk]=0;
                }
            }
        }
    }
    if (IsOver) {
        return(true);
    }
    IsOver=true;
    for (ii=0; ii<Max; ii++)
    {
        for (jj=0; jj<Max; jj++)
        { 
            for (kk=0; kk<Max; kk++)
            { 
                if (Fld[ii][jj][kk]>0) {
                    IsOver=false;
                }
            }
        }
    }
    if (IsOver)
    {
        Now = new Date();
        EndTime = Now.getTime() / 1000;
        ii=Math.floor(EndTime - StartTime);
        if (! IsRepeat)
        {
            if (window.opener)
            { 
                if (window.opener.SetHighscores)
                { 
                    if (Type==1) {
                        window.opener.SetHighscores("Pearlski","full",ii,-1);
                    } else {
                        window.opener.SetHighscores("Pearlski","open",ii,-1);
                    }
                }
            }
        }
        alert("Super, you solved this game with "+Moves+ " moves in "+ii+ " seconds !");
    }
    if(NDraw==0)
    {
        for (ii=0; ii<Max; ii++)
        {
            for (jj=0; jj<Max; jj++)
            { 
                for (kk=0; kk<Max; kk++)
                { 
                    if (Fld[ii][jj][kk]==3)
                    { 
                        IsOver=true;
                        alert("Error !");
                    }
                }
            }
        }
    }
    return(IsOver);
}

function RefreshScreen()
{ 
    var ii, jj, kk, ll, SelObj;
    if (Moves>9) {
        window.document.OptionsForm.Moves.value = " "+eval(Moves)+" ";
    } else {
        window.document.OptionsForm.Moves.value = "  "+eval(Moves)+"  ";
    }
    if (IsNetscape4)
    { 
        SelObj=0;
        for (ii=0; ii<3; ii++)
        {
            for (jj=0; jj<3; jj++)
            { 
                for (kk=0; kk<3; kk++)
                { 
                    if (ii%2+jj%2+kk%2<2)
                    { 
                        for (ll=0; ll<4; ll++)
                        { 
                            if (Fld[ii][jj][kk]==ll) {
                                document.layers[SelObj].visibility="show";
                            } else {
                                document.layers[SelObj].visibility="hide";
                            }
                            SelObj=SelObj+1;
                        }
                    }
                }
            }
        }
    } else {
        for (ii=0; ii<3; ii++)
        { 
            for (jj=0; jj<3; jj++)
            { 
                for (kk=0; kk<3; kk++)
                { 
                    if (ii%2+jj%2+kk%2<2)
                    { 
                        for (ll=0; ll<4; ll++)
                        { 
                            if (Fld[ii][jj][kk]==ll) {
                                console.log('dddd');
                                //with (ElementById('pearl'+ii+'_'+jj+'_'+kk+'_'+ll+'div')) style.visibility="visible";
                            } else {
                                console.log("dddd");
                                //with (ElementById('pearl'+ii+'_'+jj+'_'+kk+'_'+ll+'div')) style.visibility="hidden";
                            }
                        }
                    }
                }
            }
        }
    }
}

function Help()
{
    alert("A cube is given which consists of sticks with green and blue pearls on it. When the cube is turned,"+"\nthen some of the pearls can drop down. Your task is to turn the cube in a way, that all pearls of"+"\nthe same color come to the same position, so this pearls will disappear. Pearls of different colors"+"\nmay not come to the same position (in this case there will appear a red pearl), this would be an"+"\nerror and the game would be over. Some of the games can not be solved, but it is your turn to"+"\nfind it out. To turn the cube, use the arrow keys. Good luck!");
    window.document.OptionsForm.New.focus();
    window.document.OptionsForm.New.blur();
}

setInterval(Timer, 500);


var body = document.getElementById("body");
body.onresize = history.go;
document.onresize = history.go;

var b0 = document.getElementById("b0");
b0.onclick=Left;
var b1 = document.getElementById("b1");
b1.onclick=Right;
var b2 = document.getElementById("b2");
b2.onclick=Up;
var b3 = document.getElementById("b3");
b3.onclick=Down;
var b4 = document.getElementById("b4");
b4.onclick=Scramble;
var b5 = document.getElementById("b5");
b5.onclick=Scramble;
var b6 = document.getElementById("b6");
b6.onclick=Help;

var r0 = document.getElementById("r0");
r0.onclick=SetType;
var r1 = document.getElementById("r1");
r1.onclick=SetType;


document.onkeydown = KeyDown;


