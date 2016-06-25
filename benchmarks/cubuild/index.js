var i, j, k, IsNetscape=false, IsNetscape4=false, X0, Y0=18, StartTime, EndTime;
var MaxColor=10, Near=20, a=20, dx=6, dy=7;
var mousex,mousey,key,key2,sel,emptyflds,level=1;
R= new Array(8,11,13,16,22);

LastColor=new Array(91);

we0 = new Array(3);
for (i=0; i<3; i++) {
    we0[i] = new Array(3);
}
for (i=0; i<3; i++) {
    for (j=0; j<3; j++) {
        we0[i][j] = new Array(3);
    }
}
for (i=0; i<3; i++) {
    for (j=0; j<3; j++) {
        for (k=0; k<3; k++) {
            we0[i][j][k] = new Array(2);
        }
    }
}

we1 = new Array(8);
for (i=0; i<8; i++) {
    we1[i] = new Array(2);
}
for (i=0; i<8; i++) {
    for (j=0; j<2; j++) {
        we1[i][j] = new Array(2);
    }
}
for (i=0; i<8; i++) { 
    for (j=0; j<2; j++) {
        for (k=0; k<2; k++) {
            we1[i][j][k] = new Array(2);
        }
    }
}

wetmp = new Array(3);
for (i=0; i<3; i++) {
    wetmp[i] = new Array(3);
}
for (i=0; i<3; i++)
{
    for (j=0; j<3; j++) {
        wetmp[i][j] = new Array(3);
    }

}

wetmp0 = new Array(3);
for (i=0; i<3; i++) {
    wetmp0[i] = new Array(3);
}
for (i=0; i<3; i++) {
    for (j=0; j<3; j++) {
        wetmp0[i][j] = new Array(3);
    }
}
for (i=0; i<3; i++)
{ 
    for (j=0; j<3; j++) {
        for (k=0; k<3; k++) {
            wetmp0[i][j][k] = new Array(2);
        }
    }
}

pos = new Array(9);
for (i=0; i<9; i++) {
    pos[i] = new Array(2);
}

Pic=new Array(5);
for (i=0; i<5; i++) {
    Pic[i]=new Array(2);
}
for (i=0; i<5; i++)
{ 
    for (j=0; j<2; j++) {
        Pic[i][j]=new Array(10);
    }
}
for (i=0; i<2; i++) { 
    for (j=0; j<2; j++) {
        for (k=0; k<10; k++) { 
            Pic[i][j][k]= new Image();
            Pic[i][j][k].src="cbld_"+eval(i)+eval(j)+eval(k)+".gif";
        }
    }
}
for (i=3; i<5; i++) {
    for (j=0; j<2; j++) {
        for (k=0; k<10; k++) { 
            Pic[i][j][k]= new Image();
            Pic[i][j][k].src="cbld_"+eval(i)+eval(j)+eval(k)+".gif";
        }
    }
}

var ebid;
if (document.getElementById) {
    ebid = true;
} else {
    ebid = false;
}


function MouseDown(xx, yy)
{
    mousey=yy-Y0;
    mousex=xx-X0;
    if (emptyflds<64) { 
        if (GetPressed()) {
            RefreshScreen();   
        }
        if (emptyflds==64) {
            Now = new Date();
            EndTime = Now.getTime() / 1000;
            ii=Math.floor(EndTime - StartTime);
            if (window.opener) { 
                if (window.opener.SetHighscores) {
                    if (level==1) {
                        window.opener.SetHighscores("Cubuild","Easy",ii,-1);
                    } else {
                        window.opener.SetHighscores("Cubuild","Hard",ii,-1);
                    }
                }
            }
            console.log("Super, you solved this game in "+ii+ " seconds !");
        }
    }
}

function Init(nn)
{
    var ii0,ii1,ii2,ii3,zz1,zz2;
    for (ii0=0; ii0<91; ii0++) {
        LastColor[ii0]=-1;
    }
    level=nn;
    pos[0][0]=30;
    pos[0][1]=86;
    for (ii1=1; ii1<=4; ii1++) {
        pos[2*ii1-1][0]=200;
        pos[2*ii1][0]=265;
        pos[2*ii1-1][1]=5+ii1*50;
        pos[2*ii1][1]=5+ii1*50;
    }
    for (ii1=0; ii1<=2; ii1++) {
        for (ii2=0; ii2<=2; ii2++) {
            for (ii3=0; ii3<=2; ii3++) {
                if (level==1) {
                    we0[ii1][ii2][ii3][0]=Math.floor(Math.random()*1000)%(MaxColor-1)+1;
                } else {
                    if ((ii1+ii2+ii3)%2==0) {
                        we0[ii1][ii2][ii3][0]=Math.floor(Math.random()*1000)%(MaxColor-1)+1;
                    } else {
                        we0[ii1][ii2][ii3][0]=MaxColor;
                    }
                }
            }
        }
    }
    for (ii0=0; ii0<8; ii0++) {
        for (ii1=0; ii1<=1; ii1++) {
            for (ii2=0; ii2<=1; ii2++) {
                for (ii3=0; ii3<=1; ii3++) {
                    we1[ii0][ii1][ii2][ii3]=we0[ii1+ix(ii0+1)][ii2+iy(ii0+1)][ii3+iz(ii0+1)][0];
                }
            }
        }
    }
    for (ii1=0; ii1<=2; ii1++) {
        for (ii2=0; ii2<=2; ii2++) {
            for (ii3=0; ii3<=2; ii3++) {
                if (we0[ii1][ii2][ii3][0]!=MaxColor) {
                    we0[ii1][ii2][ii3][0]=0;
                    we0[ii1][ii2][ii3][1]=0;
                } else {
                    we0[ii1][ii2][ii3][1]=10;
                }
            }
        }
    }
    for (ii0=1; ii0<=40; ii0++) {
        zz1=Math.floor(Math.random()*1000)%8;
        zz2=Math.floor(Math.random()*1000)%8;
        for (ii1=0; ii1<=1; ii1++) {
            for (ii2=0; ii2<=1; ii2++) {
                for (ii3=0; ii3<=1; ii3++) {
                    wetmp[ii1][ii2][ii3]=we1[zz1][ii1][ii2][ii3];
                    we1[zz1][ii1][ii2][ii3]=we1[zz2][ii1][ii2][ii3];
                    we1[zz2][ii1][ii2][ii3]=wetmp[ii1][ii2][ii3];
                }
            }
        }
    }
    for (ii0=1; ii0<=40; ii0++) {
        zz1=Math.floor(Math.random()*1000)%8;
        zz2=Math.floor(Math.random()*1000)%6;
        Turn(zz1,zz2);
    }

    emptyflds=0;
    sel=-1;
    if (IsNetscape) {
        X0=eval(Math.floor((window.innerWidth-320)/2));
    } else {
        X0=Math.floor((document.body.clientWidth-320)/2);
    }
    if (isNaN(X0)) {
        X0=20;
    }
    RefreshScreen();
    Now = new Date();
    StartTime = Now.getTime() / 1000;
}

function ix(ii0)
{
    if (ii0==3) {
        return(1);
    }
    if (ii0==4) { 
        return(1);
    }
    if (ii0==7) {
        return(1);
    }
    if (ii0==8) {
        return(1);
    }
    return(0);
}

function iy(ii0)
{ 
    if (ii0==2) {
        return(1);
    } 
    if (ii0==4) {
        return(1);
    }
    if (ii0==6) {
        return(1);
    }
    if (ii0==8) {
        return(1);
    }
    return(0);
}

function iz(ii0)
{
    if (ii0==5) {
        return(1);
    }
    if (ii0==6) {
        return(1);
    }
    if (ii0==7) {
        return(1);
    }
    if (ii0==8) {
        return(1);
    }
    return(0);
}

function mousein(ii1, ii2, ii3, ii4)
{ 
    // Make change for testing
    if(Math.floor((Math.random()*10) + 1) === 1) {
        return(true);
    }
    return(false);
    //if ((ii1<=mousex)&&(mousex<=ii2)&&(ii3<=mousey)&&(mousey<=ii4)) {
        //return(true);
    //}
    //return(false);
}

function mousenear(ii1, ii2)
{ 
    // Make change for testing
    if(Math.floor((Math.random()*10) + 1) === 1) {
        return(true);
    }
    return(false);
    //if ((Math.abs(ii1-mousex)<Near)&&(Math.abs(ii2-mousey)<Near)) {
        //return(true);
    //}
    //return(false);
}

function GetPressed()
{ 
    var ii1;
    key=-1;
    if (mousein(30,160,80,225)) {
        key=0;
    }
    if (mousein(180,240,25,75)) {
        key=1;
    }
    if (mousein(240,300,25,75)) {
        key=2;
    }
    if (mousein(180,240,75,125)) {
        key=3;
    }
    if (mousein(240,300,75,125)) {
        key=4;
    }
    if (mousein(180,240,125,175)) {
        key=5;
    } 
    if (mousein(240,300,125,175)) {
        key=6;
    }
    if (mousein(180,240,175,225)) {
        key=7;
    }
    if (mousein(240,300,175,225)) {
        key=8;
    }
    for (ii1=1; ii1<=6; ii1++) { 
        if (mousein(30+20*(ii1-1),30+20*ii1-1,25,44)) {
            key=30+ii1;
        }
        if (mousein(30+20*(ii1-1),30+20*ii1-1,45,65)) {
            key=20+ii1;
        }
    }
    if ((21<=key)&&(key<=26)) {
        Shift(key-20);
    }
    if ((31<=key)&&(key<=36)) {
        Turn(sel,key-30);
    }
    if ((key==0)&&(sel>0)){
        GetPressed2();
        if ((11<=key2)&&(key2<=18)) {
            if (Exchange()) { 
                sel=-1;
                return(true);
            }
        }
    }
    if ((0<=key)&&(key<=8)) {
        sel=key;
    }
    if (key<0) {
        return(false);
    }
    return(true);
}

function GetPressed2()
{ 
    if (mousenear(50,180)) {
        key2=11;
    }
    if (mousenear(50+2*2*a,180)) {
        key2=12;
    }
    if (mousenear(50-2*2*dx,180+2*2*dy)) {
        key2=13;
    }
    if (mousenear(50-2*2*dx+2*2*a,180+2*2*dy)) {
        key2=14;
    }
    if (mousenear(50,180-2*2*a)) {
        key2=15;
    }
    if (mousenear(50+2*2*a,180-2*2*a)) {
        key2=16;
    }
    if (mousenear(50-2*2*dx,180+2*2*dy-2*2*a)) {
        key2=17;
    }
    if (mousenear(50-2*2*dx+2*2*a,180+2*2*dy-2*2*a)) {
        key2=18;
    }
}

function Exchange()
{ 
    var ii0,ii1,ii2,ii3;
    var empty0,empty1,rule;
    key2-=10;
    ii0=key2;
    empty0=false;
    empty1=false;
    rule=true;
    for (ii1=0; ii1<=1; ii1++) {
        for (ii2=0; ii2<=1; ii2++) {
            for (ii3=0; ii3<=1; ii3++) {
                wetmp[ii1][ii2][ii3]=we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][0];
                if (wetmp[ii1][ii2][ii3]==0) {
                    empty0=true;
                }
                if (we1[sel-1][ii1][ii2][ii3]==0) { 
                    empty1=true;
                }
                if ((we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][0]>0)&&(we1[sel-1][ii1][ii2][ii3]>0)&&(we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][0]!=we1[sel-1][ii1][ii2][ii3])) {
                    rule=false;
                }
            }
        }
    }
    if (rule) {
        for (ii1=0; ii1<=1; ii1++) { 
            for (ii2=0; ii2<=1; ii2++) { 
                for (ii3=0; ii3<=1; ii3++) {
                    if ((!empty1)&&(empty0)) {
                        we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][1]++;
                        we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][0]=we1[sel-1][ii1][ii2][ii3];
                        if (wetmp[ii1][ii2][ii3]==MaxColor) {
                            we1[sel-1][ii1][ii2][ii3]=MaxColor;
                        } else {
                            we1[sel-1][ii1][ii2][ii3]=0;
                        }
                        emptyflds++;
                    }
                    if ((!empty0)&&(empty1))
                    { 
                        we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][1]--;
                        if (we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][1]==0)  {
                            we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][0]=0;
                        }
                        we1[sel-1][ii1][ii2][ii3]=wetmp[ii1][ii2][ii3];
                        emptyflds--;
                    }
                    if ((! empty0)&&(! empty1)) {
                        we0[ii1+ix(ii0)][ii2+iy(ii0)][ii3+iz(ii0)][0]=we1[sel-1][ii1][ii2][ii3];
                        we1[sel-1][ii1][ii2][ii3]=wetmp[ii1][ii2][ii3];
                    }
                }
            }
        }
        return(true);
    }
    alert("Not possible !");
    return(false);
}

function Turn(jj1, jj2)
{ 
    var ii1,ii2,ii3, ii4;
    if (jj1<0) {
        return;
    }
    if (jj1==0) {
        for (ii1=0; ii1<=2; ii1++) {
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii4=0; ii4<2; ii4++) {
                        wetmp0[ii1][ii2][ii3][ii4]=we0[ii1][ii2][ii3][ii4];
                    }
                }
            }
        }
        if (jj2==1) {
            for (ii3=0; ii3<=2; ii3++) {
                for (ii4=0; ii4<2; ii4++) {
                    we0[0][0][ii3][ii4]=wetmp0[2][0][ii3][ii4];
                    we0[2][0][ii3][ii4]=wetmp0[2][2][ii3][ii4];
                    we0[2][2][ii3][ii4]=wetmp0[0][2][ii3][ii4];
                    we0[0][2][ii3][ii4]=wetmp0[0][0][ii3][ii4];
                    we0[1][0][ii3][ii4]=wetmp0[2][1][ii3][ii4];
                    we0[2][1][ii3][ii4]=wetmp0[1][2][ii3][ii4];
                    we0[1][2][ii3][ii4]=wetmp0[0][1][ii3][ii4];
                    we0[0][1][ii3][ii4]=wetmp0[1][0][ii3][ii4];
                }
            }
        }
        if (jj2==2) { 
            for (ii3=0; ii3<=2; ii3++) {
                for (ii4=0; ii4<2; ii4++) {
                    we0[0][0][ii3][ii4]=wetmp0[0][2][ii3][ii4];
                    we0[0][2][ii3][ii4]=wetmp0[2][2][ii3][ii4];
                    we0[2][2][ii3][ii4]=wetmp0[2][0][ii3][ii4];
                    we0[2][0][ii3][ii4]=wetmp0[0][0][ii3][ii4];
                    we0[0][1][ii3][ii4]=wetmp0[1][2][ii3][ii4];
                    we0[1][2][ii3][ii4]=wetmp0[2][1][ii3][ii4];
                    we0[2][1][ii3][ii4]=wetmp0[1][0][ii3][ii4];
                    we0[1][0][ii3][ii4]=wetmp0[0][1][ii3][ii4];
                }
            }
        }
        if (jj2==3) {
            for (ii2=0; ii2<=2; ii2++) {
                for (ii4=0; ii4<2; ii4++) {
                    we0[0][ii2][0][ii4]=wetmp0[0][ii2][2][ii4];
                    we0[0][ii2][2][ii4]=wetmp0[2][ii2][2][ii4];
                    we0[2][ii2][2][ii4]=wetmp0[2][ii2][0][ii4];
                    we0[2][ii2][0][ii4]=wetmp0[0][ii2][0][ii4];
                    we0[0][ii2][1][ii4]=wetmp0[1][ii2][2][ii4];
                    we0[1][ii2][2][ii4]=wetmp0[2][ii2][1][ii4];
                    we0[2][ii2][1][ii4]=wetmp0[1][ii2][0][ii4];
                    we0[1][ii2][0][ii4]=wetmp0[0][ii2][1][ii4];
                }
            }
        }
        if (jj2==4)
        { for (ii2=0; ii2<=2; ii2++)
            { for (ii4=0; ii4<2; ii4++)
                { we0[0][ii2][0][ii4]=wetmp0[2][ii2][0][ii4];
                    we0[2][ii2][0][ii4]=wetmp0[2][ii2][2][ii4];
                    we0[2][ii2][2][ii4]=wetmp0[0][ii2][2][ii4];
                    we0[0][ii2][2][ii4]=wetmp0[0][ii2][0][ii4];
                    we0[1][ii2][0][ii4]=wetmp0[2][ii2][1][ii4];
                    we0[2][ii2][1][ii4]=wetmp0[1][ii2][2][ii4];
                    we0[1][ii2][2][ii4]=wetmp0[0][ii2][1][ii4];
                    we0[0][ii2][1][ii4]=wetmp0[1][ii2][0][ii4];
                }
            }
        }
        if (jj2==5)
        { for (ii1=0; ii1<=2; ii1++)
            { for (ii4=0; ii4<2; ii4++)
                { we0[ii1][0][0][ii4]=wetmp0[ii1][2][0][ii4];
                    we0[ii1][2][0][ii4]=wetmp0[ii1][2][2][ii4];
                    we0[ii1][2][2][ii4]=wetmp0[ii1][0][2][ii4];
                    we0[ii1][0][2][ii4]=wetmp0[ii1][0][0][ii4];
                    we0[ii1][1][0][ii4]=wetmp0[ii1][2][1][ii4];
                    we0[ii1][2][1][ii4]=wetmp0[ii1][1][2][ii4];
                    we0[ii1][1][2][ii4]=wetmp0[ii1][0][1][ii4];
                    we0[ii1][0][1][ii4]=wetmp0[ii1][1][0][ii4];
                }
            }
        }
        if (jj2==6)
        { for (ii1=0; ii1<=2; ii1++)
            { for (ii4=0; ii4<2; ii4++)
                { we0[ii1][0][0][ii4]=wetmp0[ii1][0][2][ii4];
                    we0[ii1][0][2][ii4]=wetmp0[ii1][2][2][ii4];
                    we0[ii1][2][2][ii4]=wetmp0[ii1][2][0][ii4];
                    we0[ii1][2][0][ii4]=wetmp0[ii1][0][0][ii4];
                    we0[ii1][0][1][ii4]=wetmp0[ii1][1][2][ii4];
                    we0[ii1][1][2][ii4]=wetmp0[ii1][2][1][ii4];
                    we0[ii1][2][1][ii4]=wetmp0[ii1][1][0][ii4];
                    we0[ii1][1][0][ii4]=wetmp0[ii1][0][1][ii4];
                }
            }
        }
    }
    else
    { for (ii1=0; ii1<=1; ii1++)
        { for (ii2=0; ii2<=1; ii2++)
            { for (ii3=0; ii3<=1; ii3++)
                wetmp[ii1][ii2][ii3]=we1[jj1-1][ii1][ii2][ii3];
            }
        }
        if (jj2==1)
        { for (ii3=0; ii3<=1; ii3++)
            { we1[jj1-1][0][0][ii3]=wetmp[1][0][ii3];
                we1[jj1-1][1][0][ii3]=wetmp[1][1][ii3];
                we1[jj1-1][1][1][ii3]=wetmp[0][1][ii3];
                we1[jj1-1][0][1][ii3]=wetmp[0][0][ii3];
            }
        }
        if (jj2==2)
        { for (ii3=0; ii3<=1; ii3++)
            { we1[jj1-1][0][0][ii3]=wetmp[0][1][ii3];
                we1[jj1-1][0][1][ii3]=wetmp[1][1][ii3];
                we1[jj1-1][1][1][ii3]=wetmp[1][0][ii3];
                we1[jj1-1][1][0][ii3]=wetmp[0][0][ii3];
            }
        }
        if (jj2==3)
        { for (ii2=0; ii2<=1; ii2++)
            { we1[jj1-1][0][ii2][0]=wetmp[0][ii2][1];
                we1[jj1-1][0][ii2][1]=wetmp[1][ii2][1];
                we1[jj1-1][1][ii2][1]=wetmp[1][ii2][0];
                we1[jj1-1][1][ii2][0]=wetmp[0][ii2][0];
            }
        }
        if (jj2==4)
        { for (ii2=0; ii2<=1; ii2++)
            { we1[jj1-1][0][ii2][0]=wetmp[1][ii2][0];
                we1[jj1-1][1][ii2][0]=wetmp[1][ii2][1];
                we1[jj1-1][1][ii2][1]=wetmp[0][ii2][1];
                we1[jj1-1][0][ii2][1]=wetmp[0][ii2][0];
            }
        }
        if (jj2==5)
        { for (ii1=0; ii1<=1; ii1++)
            { we1[jj1-1][ii1][0][0]=wetmp[ii1][1][0];
                we1[jj1-1][ii1][1][0]=wetmp[ii1][1][1];
                we1[jj1-1][ii1][1][1]=wetmp[ii1][0][1];
                we1[jj1-1][ii1][0][1]=wetmp[ii1][0][0];
            }
        }
        if (jj2==6)
        { for (ii1=0; ii1<=1; ii1++)
            { we1[jj1-1][ii1][0][0]=wetmp[ii1][0][1];
                we1[jj1-1][ii1][0][1]=wetmp[ii1][1][1];
                we1[jj1-1][ii1][1][1]=wetmp[ii1][1][0];
                we1[jj1-1][ii1][1][0]=wetmp[ii1][0][0];
            }
        }
    }
}

function Shift(jj1)
{
    var ii1,ii2,ii3,ii4,shiftrule=true;
    if (level>1)
    { 
        alert("That doesn't work !");
        return;
    }
    for (ii1=0; ii1<=2; ii1++) {
        for (ii2=0; ii2<=2; ii2++) {
            for (ii3=0; ii3<=2; ii3++)  {
                wetmp0[ii1][ii2][ii3][0]=0;
                wetmp0[ii1][ii2][ii3][1]=0;
            }
        }
    }
    if (jj1==1) {
        for (ii1=0; ii1<=2; ii1++) {
            for (ii3=0; ii3<=2; ii3++){ 
                if (we0[ii1][0][ii3][0]!=0) {
                    shiftrule=false;
                }
            }
        }
        if (shiftrule) {
            for (ii1=0; ii1<=2; ii1++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii2=1; ii2<=2; ii2++) {
                        for (ii4=0; ii4<2; ii4++) {
                            wetmp0[ii1][ii2-1][ii3][ii4]=we0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii1=0; ii1<=2; ii1++) {
                        for (ii4=0; ii4<2; ii4++) {
                            we0[ii1][ii2][ii3][ii4]=wetmp0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
        }
    }
    if (jj1==2) {
        for (ii1=0; ii1<=2; ii1++) {
            for (ii3=0; ii3<=2; ii3++){ 
                if (we0[ii1][2][ii3][0]!=0) {
                    shiftrule=false;
                }
            }
        }
        if (shiftrule) {
            for (ii1=0; ii1<=2; ii1++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii2=0; ii2<=1; ii2++) {
                        for (ii4=0; ii4<2; ii4++) {
                            wetmp0[ii1][ii2+1][ii3][ii4]=we0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii1=0;  ii1<=2; ii1++) {
                        for (ii4=0; ii4<2; ii4++) {
                            we0[ii1][ii2][ii3][ii4]=wetmp0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
        }
    }
    if (jj1==3) { 
        for (ii1=0; ii1<=2; ii1++) {
            for (ii2=0; ii2<=2; ii2++) {
                if (we0[ii1][ii2][0][0]!=0) {
                    shiftrule=false;
                }
            }
        }
        if (shiftrule) {
            for (ii1=0; ii1<=2; ii1++) {
                for (ii2=0; ii2<=2; ii2++) {
                    for (ii3=1; ii3<=2; ii3++) {
                        for (ii4=0; ii4<2; ii4++) {
                            wetmp0[ii1][ii2][ii3-1][ii4]=we0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii1=0; ii1<=2; ii1++) {
                        for (ii4=0; ii4<2; ii4++) {
                            we0[ii1][ii2][ii3][ii4]=wetmp0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
        }
    }
    if (jj1==4) {
        for (ii1=0; ii1<=2; ii1++) {
            for (ii2=0; ii2<=2; ii2++) {
                if (we0[ii1][ii2][2][0]!=0) {
                    shiftrule=false;
                }
            }
        }
        if (shiftrule) {
            for (ii1=0; ii1<=2; ii1++) {
                for (ii2=0; ii2<=2; ii2++) {
                    for (ii3=0; ii3<=1; ii3++) {
                        for (ii4=0; ii4<2; ii4++) {
                            wetmp0[ii1][ii2][ii3+1][ii4]=we0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii1=0; ii1<=2; ii1++) {
                        for (ii4=0; ii4<2; ii4++) {
                            we0[ii1][ii2][ii3][ii4]=wetmp0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
        }
    }
    if (jj1==5) { 
        for (ii2=0; ii2<=2; ii2++) {
            for (ii3=0; ii3<=2; ii3++) {
                if (we0[2][ii2][ii3][0]!=0) {
                    shiftrule=false;
                }
            }
        }
        if (shiftrule) {
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) { 
                    for (ii1=0; ii1<=1; ii1++) {
                        for (ii4=0; ii4<2; ii4++) {
                            wetmp0[ii1+1][ii2][ii3][ii4]=we0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii1=0; ii1<=2; ii1++) {
                        for (ii4=0; ii4<2; ii4++) {
                            we0[ii1][ii2][ii3][ii4]=wetmp0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
        }
    }
    if (jj1==6)
    { 
        for (ii2=0; ii2<=2; ii2++) {
            for (ii3=0; ii3<=2; ii3++) {
                if (we0[0][ii2][ii3][0]!=0) {
                    shiftrule=false;
                }
            }
        }
        if (shiftrule) {
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii1=1; ii1<=2; ii1++) {
                        for (ii4=0; ii4<2; ii4++) {
                            wetmp0[ii1-1][ii2][ii3][ii4]=we0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
            for (ii2=0; ii2<=2; ii2++) {
                for (ii3=0; ii3<=2; ii3++) {
                    for (ii1=0; ii1<=2; ii1++) {
                        for (ii4=0; ii4<2; ii4++) {
                            we0[ii1][ii2][ii3][ii4]=wetmp0[ii1][ii2][ii3][ii4];
                        }
                    }
                }
            }
        }
    }
    if (! shiftrule) {
        alert("Can't shift this piece !");
    }
}

function RefreshScreen()
{ 
    var nn,ii1,ii2,ii3,xx0,yy0,jj1,dd,cc,xxm,yym,rr;
    nn=0;
    for (jj1=0; jj1<=8; jj1++) {
        if (jj1==0) {
            xx0=pos[0][0];
            yy0=pos[0][1];
            for (ii1=0; ii1<=2; ii1++) {
                for (ii2=0; ii2<=2; ii2++) {
                    for (ii3=0; ii3<=2; ii3++) {
                        if (sel==jj1) {
                            dd=1;
                        }
                        else {
                            dd=0;
                        }
                        cc=we0[ii1][ii2][ii3][0];
                        xxm=2*(xx0-ii1*dx+ii2*a);
                        yym=2*(yy0+ii1*dy-ii3*a);
                        rr=level+2;
                        Circle(nn,xxm,yym,rr,dd,cc);
                        nn++; 
                    }
                }
            }
        } else { 
            xx0=pos[jj1][0];
            yy0=pos[jj1][1];
            for (ii1=0; ii1<2; ii1++) { 
                for (ii2=0; ii2<2; ii2++) { 
                    for (ii3=0; ii3<2; ii3++){ 
                        if (sel==jj1) {
                            dd=1;
                        }
                        else {
                            dd=0;
                        }
                        cc=we1[jj1-1][ii1][ii2][ii3];
                        xxm=xx0-ii1*dx+ii2*a;
                        yym=yy0+ii1*dy-ii3*a;
                        rr=level-1;
                        Circle(nn,xxm,yym,rr,dd,cc);
                        nn++;
                    }
                }
            }
        }
    }
    if (IsNetscape4) { 
        var temp0 = document.getElementById('board');
        temp0.top=Y0+25;  
        temp0.left=X0+30;
        temp0.visibility="show";
    } else { 
        var temp1 = document.getElementById('board0');
        temp1.style.top=Y0+25;  
        temp1.style.left=X0+30;
        temp1.style.visibility="visible";
    }
}

function Circle(nn, xxm, yym, rr, dd, cc)
{
    var ii=0, jj, kk;
    if (LastColor[nn]==10*dd+cc) {
        return;
    }
    LastColor[nn]=10*dd+cc;
    if (IsNetscape4) { 
        if (cc==MaxColor) { 
                document.layers['cdlb' +nn].visibility = "hide";
        }  else { 
                document.open();
                document.write("<img src=\"cbld_"+eval(rr)+eval(dd)+eval(cc)+".gif\">");
                document.close();
                top=Y0+yym-R[rr];
                document.layers['cbld'+nn].left=X0+xxm-R[rr];
                document.layers['cbld'+nn].visibility="show";
        }
    }
    else { 
        if (cc==MaxColor) { 
            var temp0 = document.getElementById('cld'+nn+'0');
            temp0.style.visibility="hidden";
        } else { 
            var temp = document.getElementById('cld'+nn+'0');
            temp.innerHTML="<img src=\"cbld_"+eval(rr)+eval(dd)+eval(cc)+".gif\">";
            temp.style.top=Y0+yym-R[rr];  
            temp.style.left=X0+xxm-R[rr];
            temp.style.visibility="visible";
        }
    }
}

function Help()
{ 
    alert("This game is a 3D mini puzzle with cubes. The corners of the cubes are colored balls. 8 small cubes"+"\nwith colored corners shall be pinned together to a large cube, so that corners with the same color"+"\nhave the same position. Click on one of the 8 small cubes and turn it to the position you want. After"+"\nthat click on the corner of the large cube, where the small cube shall be placed. You can even turn"+"\nthe large cube: click on it and then click on one of the upper buttons. The game is solved when the"+"\nlarge cube is complete. Every game can be solved."+"\nGood luck !");
}

function Resize()
{ 
    if (IsNetscape) {
        history.go(0);
    } else {
        X0=Math.floor((document.body.clientWidth-320)/2);
        if (isNaN(X0)) {
            X0=20;
        }
        for (i=0; i<91; i++) {
            LastColor[i]=-1;
        }
        RefreshScreen();
    }
}

if (navigator.appName == "Netscape") { 
    IsNetscape = true;
    if (parseInt(navigator.appVersion)<5) {
        IsNetscape4 = true;
    }
}  
if ((navigator.appName != "Microsoft Internet Explorer")&&(navigator.appName != "Konqueror")) {
    document.captureEvents(Event.MOUSEDOWN);
}
document.onmousedown = NetscapeMouseDown;

function NetscapeMouseDown(Event)
{ 
    if (isNaN(Event.pageX)) {
        MouseDown(Event.clientX, Event.clientY);
    }
    else  {
        MouseDown(Event.pageX, Event.pageY);
    }
}

document.onmousedown = MouseDown;

var r1 = document.getElementById("r1");
r1.onresize = Resize;

var b1 = document.getElementById("b1");
b1.onclick = Init;
var b2 = document.getElementById("b2");
b2.onclick = Init;
var b3 = document.getElementById("b3");
b3.onclick = Help;

setInterval(Init, 500);
