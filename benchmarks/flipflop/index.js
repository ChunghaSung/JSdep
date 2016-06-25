var l, n, m, IsOver, Max=4, IsPattern, StartTime, EndTime, Muster;
PreFld = new Array(Max);
for (n=0; n < Max; n++)
{
    PreFld[n]=new Array(Max); 
} 
Fld = new Array(Max);
for (n=0; n < Max; n++)
{
    Fld[n]=new Array(Max); 
}
Pic= new Array(14);
Pic[0] = new Image(); 
Pic[0].src = "0.gif"; 
Pic[1] = new Image();
Pic[1].src = "1.gif";
Pic[2] = new Image(); 
Pic[2].src = "2.gif";   
Pic[3] = new Image(); 
Pic[3].src = "3.gif";   
Pic[4] = new Image();
Pic[4].src = "4.gif";   
Pic[5] = new Image();
Pic[5].src = "5.gif";  
Pic[6] = new Image();
Pic[6].src = "6.gif";  
Pic[7] = new Image();
Pic[7].src = "7.gif";  
Pic[8] = new Image();
Pic[8].src = "8.gif";  
Pic[9] = new Image();
Pic[9].src = "9.gif";  
Pic[10] = new Image(); 
Pic[10].src = "l.gif";  
Pic[11] = new Image();
Pic[11].src = "r.gif";  
Pic[12] = new Image(); 
Pic[12].src = "u.gif";  
Pic[13] = new Image();
Pic[13].src = "d.gif";  

function Clicked1(nn_clicked1, mm_clicked1)
{
    if (! IsOver) { 
        Pressed(nn_clicked1, mm_clicked1);
        RefreshScreen1();
    }
} 


function Scramble()
{
    IsPattern=Math.round(Math.random()*100)%2;
    for (n_scram1=0; n_scram1<Max; n_scram1++)
    { 
        for (m_scram1=0; m_scram1<Max; m_scram1++)
        {
            if ((n_scram1==0)||(m_scram1==0)||(n_scram1==Max-1)||(m_scram1==Max-1)){
                PreFld[n_scram1][m_scram1]=0;
            }
            else {
                PreFld[n_scram1][m_scram1]=(n_scram1+m_scram1)%2+1;
            }
        }
    }
    Muster=1;
    if (IsPattern)
    {
        Muster=Math.round(Math.random()*100)%2;
        if (Muster==0) {
            PreFld[2][2]=0;
        }
        else
        { 
            PreFld[1][1]=0;
            PreFld[3][1]=0;
            PreFld[1][3]=0;
            PreFld[3][3]=0;
        }
    }
    l_scram1=0;
    for (n_scram1=0; n_scram1<Max; n_scram1++)
    {
        for (m_scram1=0; m_scram1<Max; m_scram1++)
        {
            if (PreFld[n_scram1][m_scram1]>0) {
                PreFld[n_scram1][m_scram1]=++l_scram1;
            }
        }
    }
    for (n_scram1=0; n_scram1<Max; n_scram1++)
    { 
        for (m_scram1=0; m_scram1<Max; m_scram1++) {
            Fld[n_scram1][m_scram1]=PreFld[n_scram1][m_scram1];
        }
    }
    if (IsPattern)
    {
        for (l_scram1=0; l_scram1<29; l_scram1++)
        {
            n_scram1=Math.round(Math.random()*100)%(Max-2)+1;
            m_scram1=Math.round(Math.random()*100)%(Max-2)+1;
            if (2*n_scram1>=Max) {
                Pressed(0, m_scram1);
            }
            else {
                Pressed(Max-1, m_scram1);
            }
            if (2*m_scram1>=Max) {
                Pressed(n_scram1, 0);
            }
            else {
                Pressed(n_scram1, Max-1);
            }
            if (2*n_scram1>=Max) {
                Pressed(Max-1, m_scram1);
            }
            else {
                Pressed(0, m_scram1);
            }
            if (2*m_scram1>=Max) {
                Pressed(n_scram1, Max-1);
            }
            else {
                Pressed(n_scram1, 0);
            }
            n_scram1=Math.round(Math.random()*100)%(Max-2)+1;
            m_scram1=Math.round(Math.random()*100)%(Max-2)+1;
            if (2*m_scram1>=Max) {
                Pressed(n_scram1, 0);
            }
            else {
                Pressed(n_scram1, Max-1);
            }
            if (2*n_scram1>=Max) {
                Pressed(0, m_scram1);
            }
            else {
                Pressed(Max-1, m_scram1);
            }
            if (2*m_scram1>=Max) {
                Pressed(n_scram1, Max-1);
            }
            else {
                Pressed(n_scram1, 0);
            }
            if (2*n_scram1>=Max) {
                Pressed(Max-1, m_scram1);
            }
            else {
                Pressed(0, m_scram1);
            }
        }
    }
    for (l_scram1=0; l_scram1<39; l_scram1++)
    { 
        n_scram1=Math.round(Math.random()*100)%(Max-2)+1;
        m_scram1=Math.round(Math.random()*100)%(Max-2)+1;
        if (2*n_scram1<Max) {
            Pressed(0, m_scram1);
        }
        else {
            Pressed(Max-1, m_scram1);
        }
        if (2*m_scram1<Max) {
            Pressed(n_scram1, 0);
        }
        else {
            Pressed(n_scram1, Max-1);
        }
        if (2*n_scram1<Max) {
            Pressed(Max-1, m_scram1);
        }
        else {
            Pressed(0, m_scram1);
        }
        if (2*m_scram1<Max) {
            Pressed(n_scram1, Max-1);
        }
        else {
            Pressed(n_scram1, 0);
        }
        n_scram1=Math.round(Math.random()*100)%(Max-2)+1;
        m_scram1=Math.round(Math.random()*100)%(Max-2)+1;
        if (2*m_scram1<Max) {
            Pressed(n_scram1, 0);
        }
        else {
            Pressed(n_scram1, Max-1);
        }
        if (2*n_scram1<Max) {
            Pressed(0, m_scram1);
        }
        else {
            Pressed(Max-1, m_scram1);
        }
        if (2*m_scram1<Max) {
            Pressed(n_scram1, Max-1);
        }
        else {
            Pressed(n_scram1, 0);
        }
        if (2*n_scram1<Max) {
            Pressed(Max-1, m_scram1);
        }
        else {
            Pressed(0, m_scram1);
        }
    }
    OverTest();
    while (IsOver) {
        if (IsPattern)
        {
            for (l_scram1=0; l_scram1<29; l_scram1++)
            {
                n_scram1=Math.round(Math.random()*100)%(Max-2)+1;
                m_scram1=Math.round(Math.random()*100)%(Max-2)+1;
                if (2*n_scram1>=Max) {
                    Pressed(0, m_scram1);
                }
                else {
                    Pressed(Max-1, m_scram1);
                }
                if (2*m_scram1>=Max) {
                    Pressed(n_scram1, 0);
                }
                else {
                    Pressed(n_scram1, Max-1);
                }
                if (2*n_scram1>=Max) {
                    Pressed(Max-1, m_scram1);
                }
                else {
                    Pressed(0, m_scram1);
                }
                if (2*m_scram1>=Max) {
                    Pressed(n_scram1, Max-1);
                }
                else {
                    Pressed(n_scram1, 0);
                }
                n_scram1=Math.round(Math.random()*100)%(Max-2)+1;
                m_scram1=Math.round(Math.random()*100)%(Max-2)+1;
                if (2*m_scram1>=Max) {
                    Pressed(n_scram1, 0);
                }
                else {
                    Pressed(n_scram1, Max-1);
                }
                if (2*n_scram1>=Max) {
                    Pressed(0, m_scram1);
                }
                else {
                    Pressed(Max-1, m_scram1);
                }
                if (2*m_scram1>=Max) {
                    Pressed(n_scram1, Max-1);
                }
                else {
                    Pressed(n_scram1, 0);
                }
                if (2*n_scram1>=Max) {
                    Pressed(Max-1, m_scram1);
                }
                else {
                    Pressed(0, m_scram1);
                }
            }
        }
        for (l_scram1=0; l_scram1<39; l_scram1++)
        { 
            n_scram1=Math.round(Math.random()*100)%(Max-2)+1;
            m_scram1=Math.round(Math.random()*100)%(Max-2)+1;
            if (2*n_scram1<Max) {
                Pressed(0, m_scram1);
            }
            else {
                Pressed(Max-1, m_scram1);
            }
            if (2*m_scram1<Max) {
                Pressed(n_scram1, 0);
            }
            else {
                Pressed(n_scram1, Max-1);
            }
            if (2*n_scram1<Max) {
                Pressed(Max-1, m_scram1);
            }
            else {
                Pressed(0, m_scram1);
            }
            if (2*m_scram1<Max) {
                Pressed(n_scram1, Max-1);
            }
            else {
                Pressed(n_scram1, 0);
            }
            n_scram1=Math.round(Math.random()*100)%(Max-2)+1;
            m_scram1=Math.round(Math.random()*100)%(Max-2)+1;
            if (2*m_scram1<Max) {
                Pressed(n_scram1, 0);
            }
            else {
                Pressed(n_scram1, Max-1);
            }
            if (2*n_scram1<Max) {
                Pressed(0, m_scram1);
            }
            else {
                Pressed(Max-1, m_scram1);
            }
            if (2*m_scram1<Max) {
                Pressed(n_scram1, Max-1);
            }
            else {
                Pressed(n_scram1, 0);
            }
            if (2*n_scram1<Max) {
                Pressed(Max-1, m_scram1);
            }
            else {
                Pressed(0, m_scram1);
            }
        }
        OverTest();
    }
    RefreshScreen1();  
    Now = new Date();
    StartTime = Now.getTime() / 1000;
}

function Pressed(ii_press, jj_press)
{
    var kk_press;
    var nn_press;
    nn_press=0;
    if (Fld[ii_press][jj_press]!=0) {
        return(false);
    }
    if ((ii_press==0)&&(jj_press!=0)&&(jj_press!=Max-1))
    {
        for (kk_press=0; kk_press<Max; kk_press++)
        {
            if (Fld[kk_press][jj_press]>0) {
                nn_press++;
            }
        }
        if (nn_press!=Max-2) {
            return(false);
        }
        for (kk_press=0; kk_press<Max-1; kk_press++) {
            Fld[kk_press][jj_press]=Fld[kk_press+1][jj_press];
        }
        Fld[Max-1][jj_press]=0;
        return(true);
    }
    if ((ii_press==Max-1)&&(jj_press!=0)&&(jj_press!=Max-1))
    { 
        for (kk_press=0; kk_press<Max; kk_press++)
        { 
            if (Fld[kk_press][jj_press]>0) {
                nn_press++;
            }
        }
        if (nn_press!=Max-2) {
            return(false);
        }
        for (kk_press=Max-1; kk_press>0; kk_press--) {
            Fld[kk_press][jj_press]=Fld[kk_press-1][jj_press];
        }
        Fld[0][jj_press]=0;
        return(true);
    }
    if ((jj_press==0)&&(ii_press!=0)&&(ii_press!=Max-1))
    { 
        for (kk_press=0; kk_press<Max; kk_press++)
        {
            if (Fld[ii_press][kk_press]>0) {
                nn_press++;
            }
        }
        if (nn_press!=Max-2) {
            return(false);
        }
        for (kk_press=0; kk_press<Max-1; kk_press++) {
            Fld[ii_press][kk_press]=Fld[ii_press][kk_press+1];
        }
        Fld[ii_press][Max-1]=0;
        return(true);
    }
    if ((jj_press==Max-1)&&(ii_press!=0)&&(ii_press!=Max-1))
    { 
        for (kk_press=0; kk_press<Max; kk_press++)
        {
            if (Fld[ii_press][kk_press]>0) {
                nn_press++;
            }
        }
        if (nn_press!=Max-2) {
            return(false);
        }
        for (kk_press=Max-1; kk_press>0; kk_press--) {
            Fld[ii_press][kk_press]=Fld[ii_press][kk_press-1];
        }
        Fld[ii_press][0]=0;
        return(true);
    }
    return(false);
}



function OverTest()
{
    IsOver=true;
    for (n_over=0; n_over<Max; n_over++)
    { 
        for (m_over=0; m_over<Max; m_over++)
        { 
            if (PreFld[n_over][m_over]!=Fld[n_over][m_over]) {
                IsOver=false;
            }
        }
    }
    return(IsOver);
}

function RefreshScreen1()
{
    for (n_refresh=0; n_refresh < Max; n_refresh++)
    {
        for (m_refresh=0; m_refresh < Max; m_refresh++) 
        {
            window.document.images[Max*n_refresh+m_refresh].src = Pic[Fld[n_refresh][m_refresh]].src;
            if (Fld[n_refresh][m_refresh]==0)
            {
                if (!(((n_refresh==0)&&(m_refresh==0))||((n_refresh==0)&&(m_refresh==Max-1))||((n_refresh==Max-1)&&(m_refresh==0))||((n_refresh==Max-1)&&(m_refresh==Max-1))))
                {
                    if (m_refresh==0) {
                        window.document.images[Max*n_refresh+m_refresh].src = Pic[10].src;
                    }
                    if (m_refresh==Max-1) {
                        window.document.images[Max*n_refresh+m_refresh].src = Pic[11].src;
                    }
                    if (n_refresh==0) {
                        window.document.images[Max*n_refresh+m_refresh].src = Pic[12].src;
                    }
                    if (n_refresh==Max-1) {
                        window.document.images[Max*n_refresh+m_refresh].src = Pic[13].src;
                    }
                }
            }
        }     
    }
    if (OverTest()) 
    {
        Now = new Date();
        EndTime = Now.getTime() / 1000;
        n_refresh=Math.floor(EndTime - StartTime);
        if (window.opener)
        {
            if (window.opener.SetHighscores)
            {
                if (IsPattern) 
                {
                    if (Muster==1) {
                        window.opener.SetHighscores("FlipFlop","Easy",n_refresh,-1);
                    }
                    else {
                        window.opener.SetHighscores("FlipFlop","Hard",n_refresh,-1);
                    }
                }
                else {
                    window.opener.SetHighscores("FlipFlop","Medium",n_refresh,-1);
                }
            }
        }
        alert("Super, you solved this game in "+n_refresh+ " seconds !");
    }
}

function Help()
{
    alert("Shift the pieces until all numbers are in ascending order"+"\n(from left to right and top to bottom). Good luck!");
}

var b0 = document.getElementById("b0");
b0.onmousedown = Clicked1;
var b1 = document.getElementById("b1");
b1.onmousedown = Clicked1;

var b2 = document.getElementById("b2");
b2.onmousedown = Clicked1;

var b3 = document.getElementById("b3");
b3.onmousedown = Clicked1;


var c0 = document.getElementById("c0");
c0.onclick = Help;
var c1 = document.getElementById("c1");
c1.onclick = Scramble;

Scramble();

