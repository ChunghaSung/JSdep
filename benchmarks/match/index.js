var i, IsOver, IsRemoving=false, N, Max=16, Move=0, Start=0, StartTime, EndTime, Mode=0;
Level = new Array(2);
Level[0]=0;
Level[1]=1;
Fld = new Array(Max);
Pic= new Array(4);
Pic[0] = new Image();
Pic[0].src = "match"+0+".gif"; 
Pic[1] = new Image();
Pic[1].src = "match"+1+".gif"; 
Pic[2] = new Image();
Pic[2].src = "match"+2+".gif"; 
Pic[3] = new Image();
Pic[3].src = "match"+3+".gif"; 

function SetMode(mmS)
{ 
    Mode=parseInt(mmS);
    Init1(false);
}

function SetStart(ssS)
{ 
    if (IsRemoving) {
        return;
    }
  Start=parseInt(ssS);
  Init1(false);
}

function SetLevel1(nnL1, mmL1)
{ 
    Level[nnL1]=parseInt(mmL1);
}

function SetLevel2(nnL2, mmL2)
{ 
    Level[nnL2]=parseInt(mmL2);
}

function Timer()
{ 
    if (IsOver) {
        return;
    }
  if (IsRemoving) {
      return;
  }
  if (Level[Move]==0) {
      return;
  }
  MakeBestMove();
}

function Init1(IsNew_init1)
{ 
    var ii_init1, ss_init1;
  if (IsRemoving) {
      return;
  }
  if (IsNew_init1) 
  {
      ii_init1=12+Math.floor(Math.random()*5);
      while(ii_init1==N) {
      ii_init1=12+Math.floor(Math.random()*5);
      }
    N=ii_init1;
  }
  ss_init1=Math.floor((Max-N)/2);

  for (ii_init1=0; ii_init1<Max; ii_init1++) {
      Fld[ii_init1]=0;
  }
  for (ii_init1=ss_init1; ii_init1<ss_init1+N; ii_init1++) {
      Fld[ii_init1]=1;
  }
  Move=Start;
  IsOver=false;
  window.document.images[0].src = Pic[Fld[0]].src;
  window.document.images[1].src = Pic[Fld[1]].src;
  window.document.images[2].src = Pic[Fld[2]].src;
  window.document.images[3].src = Pic[Fld[3]].src;
  window.document.images[4].src = Pic[Fld[4]].src;
  window.document.images[5].src = Pic[Fld[5]].src;
  window.document.images[6].src = Pic[Fld[6]].src;
  window.document.images[7].src = Pic[Fld[7]].src;
  window.document.images[8].src = Pic[Fld[8]].src;
  window.document.images[9].src = Pic[Fld[9]].src;
  window.document.images[10].src = Pic[Fld[10]].src;
  window.document.images[11].src = Pic[Fld[11]].src;
  window.document.images[12].src = Pic[Fld[12]].src;
  window.document.images[13].src = Pic[Fld[13]].src;
  window.document.images[14].src = Pic[Fld[14]].src;
  window.document.images[15].src = Pic[Fld[15]].src;
  IsRemoving=false;
  IsOver=false;

  if (Fld[0]+Fld[1]+Fld[2]+Fld[3]+Fld[4]+Fld[5]+Fld[6]+Fld[7]+Fld[8]+Fld[9]+Fld[10]+Fld[11]+Fld[12]+Fld[13]+Fld[14]+Fld[15] > 0) {
      return(false);
  }
  IsOver=true;

  if ((Move+Mode)%2==0) {
      alert("The player at the right side has won!");
  }
  else {
      alert("The player at the left side has won!");
  }
  return(true);
  Now = new Date();
  StartTime = Now.getTime() / 1000;
}





function Clicked1(ii_click1)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click1, nn_click1=0;
    if (Move==0) { 
        for (jj_click1=0; jj_click1<=ii_click1; jj_click1++) {
            nn_click1+=Fld[jj_click1];
        }
        if ((nn_click1<1)||(nn_click1>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click1=ii_click1; jj_click1<Max; jj_click1++) {
                nn_click1+=Fld[jj_click1];
            }
            if ((nn_click1<1)||(nn_click1>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click1<1)||(nn_click1>3)) {
        return;
    }
     var kk_click1, pp_click1, mm_click1=0;
  if (Move==0)
  {
      kk_click1=0;
      mm_click1+=Fld[kk_click1];
    while((mm_click1<nn_click1)&&(kk_click1<Max-1)) {
        kk_click1++;
      mm_click1+=Fld[kk_click1];
    }
    for (pp_click1=kk_click1-mm_click1+1; pp_click1<=kk_click1; pp_click1++)
    {
        Fld[pp_click1]+=2;
        window.document.images[pp_click1].src = Pic[Fld[pp_click1]].src;
      Fld[pp_click1]=0;
    }
  }
  else    
  {
      kk_click1=Max-1;
      mm_click1+=Fld[kk_click1];
    while((mm_click1<nn_click1)&&(kk_click1>0)) {
        kk_click1--;
      mm_click1+=Fld[kk_click1];
    }
    for (pp_click1=kk_click1; pp_click1<kk_click1+mm_click1; pp_click1++)
    {
        Fld[pp_click1]+=2;
        window.document.images[pp_click1].src = Pic[Fld[pp_click1]].src;
      Fld[pp_click1]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}

function Clicked2(ii_click2)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click2, nn_click2=0;
    if (Move==0) { 
        for (jj_click2=0; jj_click2<=ii_click2; jj_click2++) {
            nn_click2+=Fld[jj_click2];
        }
        if ((nn_click2<1)||(nn_click2>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click2=ii_click2; jj_click2<Max; jj_click2++) {
                nn_click2+=Fld[jj_click2];
            }
            if ((nn_click2<1)||(nn_click2>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click2<1)||(nn_click2>3)) {
        return;
    }
     var kk_click2, pp_click2, mm_click2=0;
  if (Move==0)
  {
      kk_click2=0;
      mm_click2+=Fld[kk_click2];
    while((mm_click2<nn_click2)&&(kk_click2<Max-1)) {
        kk_click2++;
      mm_click2+=Fld[kk_click2];
    }
    for (pp_click2=kk_click2-mm_click2+1; pp_click2<=kk_click2; pp_click2++)
    {
        Fld[pp_click2]+=2;
        window.document.images[pp_click2].src = Pic[Fld[pp_click2]].src;
      Fld[pp_click2]=0;
    }
  }
  else    
  {
      kk_click2=Max-1;
      mm_click2+=Fld[kk_click2];
    while((mm_click2<nn_click2)&&(kk_click2>0)) {
        kk_click2--;
      mm_click2+=Fld[kk_click2];
    }
    for (pp_click2=kk_click2; pp_click2<kk_click2+mm_click2; pp_click2++)
    {
        Fld[pp_click2]+=2;
        window.document.images[pp_click2].src = Pic[Fld[pp_click2]].src;
      Fld[pp_click2]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}

function Clicked3(ii_click3)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click3, nn_click3=0;
    if (Move==0) { 
        for (jj_click3=0; jj_click3<=ii_click3; jj_click3++) {
            nn_click3+=Fld[jj_click3];
        }
        if ((nn_click3<1)||(nn_click3>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click3=ii_click3; jj_click3<Max; jj_click3++) {
                nn_click3+=Fld[jj_click3];
            }
            if ((nn_click3<1)||(nn_click3>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click3<1)||(nn_click3>3)) {
        return;
    }
     var kk_click3, pp_click3, mm_click3=0;
  if (Move==0)
  {
      kk_click3=0;
      mm_click3+=Fld[kk_click3];
    while((mm_click3<nn_click3)&&(kk_click3<Max-1)) {
        kk_click3++;
      mm_click3+=Fld[kk_click3];
    }
    for (pp_click3=kk_click3-mm_click3+1; pp_click3<=kk_click3; pp_click3++)
    {
        Fld[pp_click3]+=2;
        window.document.images[pp_click3].src = Pic[Fld[pp_click3]].src;
      Fld[pp_click3]=0;
    }
  }
  else    
  {
      kk_click3=Max-1;
      mm_click3+=Fld[kk_click3];
    while((mm_click3<nn_click3)&&(kk_click3>0)) {
        kk_click3--;
      mm_click3+=Fld[kk_click3];
    }
    for (pp_click3=kk_click3; pp_click3<kk_click3+mm_click3; pp_click3++)
    {
        Fld[pp_click3]+=2;
        window.document.images[pp_click3].src = Pic[Fld[pp_click3]].src;
      Fld[pp_click3]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}
function Clicked4(ii_click4)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click4, nn_click4=0;
    if (Move==0) { 
        for (jj_click4=0; jj_click4<=ii_click4; jj_click4++) {
            nn_click4+=Fld[jj_click4];
        }
        if ((nn_click4<1)||(nn_click4>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click4=ii_click4; jj_click4<Max; jj_click4++) {
                nn_click4+=Fld[jj_click4];
            }
            if ((nn_click4<1)||(nn_click4>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click4<1)||(nn_click4>3)) {
        return;
    }
     var kk_click4, pp_click4, mm_click4=0;
  if (Move==0)
  {
      kk_click4=0;
      mm_click4+=Fld[kk_click4];
    while((mm_click4<nn_click4)&&(kk_click4<Max-1)) {
        kk_click4++;
      mm_click4+=Fld[kk_click4];
    }
    for (pp_click4=kk_click4-mm_click4+1; pp_click4<=kk_click4; pp_click4++)
    {
        Fld[pp_click4]+=2;
        window.document.images[pp_click4].src = Pic[Fld[pp_click4]].src;
      Fld[pp_click4]=0;
    }
  }
  else    
  {
      kk_click4=Max-1;
      mm_click4+=Fld[kk_click4];
    while((mm_click4<nn_click4)&&(kk_click4>0)) {
        kk_click4--;
      mm_click4+=Fld[kk_click4];
    }
    for (pp_click4=kk_click4; pp_click4<kk_click4+mm_click4; pp_click4++)
    {
        Fld[pp_click4]+=2;
        window.document.images[pp_click4].src = Pic[Fld[pp_click4]].src;
      Fld[pp_click4]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}
function Clicked5(ii_click5)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click5, nn_click5=0;
    if (Move==0) { 
        for (jj_click5=0; jj_click5<=ii_click5; jj_click5++) {
            nn_click5+=Fld[jj_click5];
        }
        if ((nn_click5<1)||(nn_click5>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click5=ii_click5; jj_click5<Max; jj_click5++) {
                nn_click5+=Fld[jj_click5];
            }
            if ((nn_click5<1)||(nn_click5>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click5<1)||(nn_click5>3)) {
        return;
    }
     var kk_click5, pp_click5, mm_click5=0;
  if (Move==0)
  {
      kk_click5=0;
      mm_click5+=Fld[kk_click5];
    while((mm_click5<nn_click5)&&(kk_click5<Max-1)) {
        kk_click5++;
      mm_click5+=Fld[kk_click5];
    }
    for (pp_click5=kk_click5-mm_click5+1; pp_click5<=kk_click5; pp_click5++)
    {
        Fld[pp_click5]+=2;
        window.document.images[pp_click5].src = Pic[Fld[pp_click5]].src;
      Fld[pp_click5]=0;
    }
  }
  else    
  {
      kk_click5=Max-1;
      mm_click5+=Fld[kk_click5];
    while((mm_click5<nn_click5)&&(kk_click5>0)) {
        kk_click5--;
      mm_click5+=Fld[kk_click5];
    }
    for (pp_click5=kk_click5; pp_click5<kk_click5+mm_click5; pp_click5++)
    {
        Fld[pp_click5]+=2;
        window.document.images[pp_click5].src = Pic[Fld[pp_click5]].src;
      Fld[pp_click5]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}
function Clicked6(ii_click6)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click6, nn_click6=0;
    if (Move==0) { 
        for (jj_click6=0; jj_click6<=ii_click6; jj_click6++) {
            nn_click6+=Fld[jj_click6];
        }
        if ((nn_click6<1)||(nn_click6>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click6=ii_click6; jj_click6<Max; jj_click6++) {
                nn_click6+=Fld[jj_click6];
            }
            if ((nn_click6<1)||(nn_click6>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click6<1)||(nn_click6>3)) {
        return;
    }
     var kk_click6, pp_click6, mm_click6=0;
  if (Move==0)
  {
      kk_click6=0;
      mm_click6+=Fld[kk_click6];
    while((mm_click6<nn_click6)&&(kk_click6<Max-1)) {
        kk_click6++;
      mm_click6+=Fld[kk_click6];
    }
    for (pp_click6=kk_click6-mm_click6+1; pp_click6<=kk_click6; pp_click6++)
    {
        Fld[pp_click6]+=2;
        window.document.images[pp_click6].src = Pic[Fld[pp_click6]].src;
      Fld[pp_click6]=0;
    }
  }
  else    
  {
      kk_click6=Max-1;
      mm_click6+=Fld[kk_click6];
    while((mm_click6<nn_click6)&&(kk_click6>0)) {
        kk_click6--;
      mm_click6+=Fld[kk_click6];
    }
    for (pp_click6=kk_click6; pp_click6<kk_click6+mm_click6; pp_click6++)
    {
        Fld[pp_click6]+=2;
        window.document.images[pp_click6].src = Pic[Fld[pp_click6]].src;
      Fld[pp_click6]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}

function Clicked7(ii_click7)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click7, nn_click7=0;
    if (Move==0) { 
        for (jj_click7=0; jj_click7<=ii_click7; jj_click7++) {
            nn_click7+=Fld[jj_click7];
        }
        if ((nn_click7<1)||(nn_click7>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click7=ii_click7; jj_click7<Max; jj_click7++) {
                nn_click7+=Fld[jj_click7];
            }
            if ((nn_click7<1)||(nn_click7>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click7<1)||(nn_click7>3)) {
        return;
    }
     var kk_click7, pp_click7, mm_click7=0;
  if (Move==0)
  {
      kk_click7=0;
      mm_click7+=Fld[kk_click7];
    while((mm_click7<nn_click7)&&(kk_click7<Max-1)) {
        kk_click7++;
      mm_click7+=Fld[kk_click7];
    }
    for (pp_click7=kk_click7-mm_click7+1; pp_click7<=kk_click7; pp_click7++)
    {
        Fld[pp_click7]+=2;
        window.document.images[pp_click7].src = Pic[Fld[pp_click7]].src;
      Fld[pp_click7]=0;
    }
  }
  else    
  {
      kk_click7=Max-1;
      mm_click7+=Fld[kk_click7];
    while((mm_click7<nn_click7)&&(kk_click7>0)) {
        kk_click7--;
      mm_click7+=Fld[kk_click7];
    }
    for (pp_click7=kk_click7; pp_click7<kk_click7+mm_click7; pp_click7++)
    {
        Fld[pp_click7]+=2;
        window.document.images[pp_click7].src = Pic[Fld[pp_click7]].src;
      Fld[pp_click7]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}

function Clicked8(ii_click8)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click8, nn_click8=0;
    if (Move==0) { 
        for (jj_click8=0; jj_click8<=ii_click8; jj_click8++) {
            nn_click8+=Fld[jj_click8];
        }
        if ((nn_click8<1)||(nn_click8>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click8=ii_click8; jj_click8<Max; jj_click8++) {
                nn_click8+=Fld[jj_click8];
            }
            if ((nn_click8<1)||(nn_click8>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click8<1)||(nn_click8>3)) {
        return;
    }
     var kk_click8, pp_click8, mm_click8=0;
  if (Move==0)
  {
      kk_click8=0;
      mm_click8+=Fld[kk_click8];
    while((mm_click8<nn_click8)&&(kk_click8<Max-1)) {
        kk_click8++;
      mm_click8+=Fld[kk_click8];
    }
    for (pp_click8=kk_click8-mm_click8+1; pp_click8<=kk_click8; pp_click8++)
    {
        Fld[pp_click8]+=2;
        window.document.images[pp_click8].src = Pic[Fld[pp_click8]].src;
      Fld[pp_click8]=0;
    }
  }
  else    
  {
      kk_click8=Max-1;
      mm_click8+=Fld[kk_click8];
    while((mm_click8<nn_click8)&&(kk_click8>0)) {
        kk_click8--;
      mm_click8+=Fld[kk_click8];
    }
    for (pp_click8=kk_click8; pp_click8<kk_click8+mm_click8; pp_click8++)
    {
        Fld[pp_click8]+=2;
        window.document.images[pp_click8].src = Pic[Fld[pp_click8]].src;
      Fld[pp_click8]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}

function Clicked9(ii_click9)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click9, nn_click9=0;
    if (Move==0) { 
        for (jj_click9=0; jj_click9<=ii_click9; jj_click9++) {
            nn_click9+=Fld[jj_click9];
        }
        if ((nn_click9<1)||(nn_click9>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click9=ii_click9; jj_click9<Max; jj_click9++) {
                nn_click9+=Fld[jj_click9];
            }
            if ((nn_click9<1)||(nn_click9>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click9<1)||(nn_click9>3)) {
        return;
    }
     var kk_click9, pp_click9, mm_click9=0;
  if (Move==0)
  {
      kk_click9=0;
      mm_click9+=Fld[kk_click9];
    while((mm_click9<nn_click9)&&(kk_click9<Max-1)) {
        kk_click9++;
      mm_click9+=Fld[kk_click9];
    }
    for (pp_click9=kk_click9-mm_click9+1; pp_click9<=kk_click9; pp_click9++)
    {
        Fld[pp_click9]+=2;
        window.document.images[pp_click9].src = Pic[Fld[pp_click9]].src;
      Fld[pp_click9]=0;
    }
  }
  else    
  {
      kk_click9=Max-1;
      mm_click9+=Fld[kk_click9];
    while((mm_click9<nn_click9)&&(kk_click9>0)) {
        kk_click9--;
      mm_click9+=Fld[kk_click9];
    }
    for (pp_click9=kk_click9; pp_click9<kk_click9+mm_click9; pp_click9++)
    {
        Fld[pp_click9]+=2;
        window.document.images[pp_click9].src = Pic[Fld[pp_click9]].src;
      Fld[pp_click9]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}
function Clicked10(ii_click10)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click10, nn_click10=0;
    if (Move==0) { 
        for (jj_click10=0; jj_click10<=ii_click10; jj_click10++) {
            nn_click10+=Fld[jj_click10];
        }
        if ((nn_click10<1)||(nn_click10>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click10=ii_click10; jj_click10<Max; jj_click10++) {
                nn_click10+=Fld[jj_click10];
            }
            if ((nn_click10<1)||(nn_click10>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click10<1)||(nn_click10>3)) {
        return;
    }
     var kk_click10, pp_click10, mm_click10=0;
  if (Move==0)
  {
      kk_click10=0;
      mm_click10+=Fld[kk_click10];
    while((mm_click10<nn_click10)&&(kk_click10<Max-1)) {
        kk_click10++;
      mm_click10+=Fld[kk_click10];
    }
    for (pp_click10=kk_click10-mm_click10+1; pp_click10<=kk_click10; pp_click10++)
    {
        Fld[pp_click10]+=2;
        window.document.images[pp_click10].src = Pic[Fld[pp_click10]].src;
      Fld[pp_click10]=0;
    }
  }
  else    
  {
      kk_click10=Max-1;
      mm_click10+=Fld[kk_click10];
    while((mm_click10<nn_click10)&&(kk_click10>0)) {
        kk_click10--;
      mm_click10+=Fld[kk_click10];
    }
    for (pp_click10=kk_click10; pp_click10<kk_click10+mm_click10; pp_click10++)
    {
        Fld[pp_click10]+=2;
        window.document.images[pp_click10].src = Pic[Fld[pp_click10]].src;
      Fld[pp_click10]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}


function Clicked11(ii_click11)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click11, nn_click11=0;
    if (Move==0) { 
        for (jj_click11=0; jj_click11<=ii_click11; jj_click11++) {
            nn_click11+=Fld[jj_click11];
        }
        if ((nn_click11<1)||(nn_click11>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click11=ii_click11; jj_click11<Max; jj_click11++) {
                nn_click11+=Fld[jj_click11];
            }
            if ((nn_click11<1)||(nn_click11>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click11<1)||(nn_click11>3)) {
        return;
    }
     var kk_click11, pp_click11, mm_click11=0;
  if (Move==0)
  {
      kk_click11=0;
      mm_click11+=Fld[kk_click11];
    while((mm_click11<nn_click11)&&(kk_click11<Max-1)) {
        kk_click11++;
      mm_click11+=Fld[kk_click11];
    }
    for (pp_click11=kk_click11-mm_click11+1; pp_click11<=kk_click11; pp_click11++)
    {
        Fld[pp_click11]+=2;
        window.document.images[pp_click11].src = Pic[Fld[pp_click11]].src;
      Fld[pp_click11]=0;
    }
  }
  else    
  {
      kk_click11=Max-1;
      mm_click11+=Fld[kk_click11];
    while((mm_click11<nn_click11)&&(kk_click11>0)) {
        kk_click11--;
      mm_click11+=Fld[kk_click11];
    }
    for (pp_click11=kk_click11; pp_click11<kk_click11+mm_click11; pp_click11++)
    {
        Fld[pp_click11]+=2;
        window.document.images[pp_click11].src = Pic[Fld[pp_click11]].src;
      Fld[pp_click11]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}
function Clicked12(ii_click12)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click12, nn_click12=0;
    if (Move==0) { 
        for (jj_click12=0; jj_click12<=ii_click12; jj_click12++) {
            nn_click12+=Fld[jj_click12];
        }
        if ((nn_click12<1)||(nn_click12>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click12=ii_click12; jj_click12<Max; jj_click12++) {
                nn_click12+=Fld[jj_click12];
            }
            if ((nn_click12<1)||(nn_click12>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click12<1)||(nn_click12>3)) {
        return;
    }
     var kk_click12, pp_click12, mm_click12=0;
  if (Move==0)
  {
      kk_click12=0;
      mm_click12+=Fld[kk_click12];
    while((mm_click12<nn_click12)&&(kk_click12<Max-1)) {
        kk_click12++;
      mm_click12+=Fld[kk_click12];
    }
    for (pp_click12=kk_click12-mm_click12+1; pp_click12<=kk_click12; pp_click12++)
    {
        Fld[pp_click12]+=2;
        window.document.images[pp_click12].src = Pic[Fld[pp_click12]].src;
      Fld[pp_click12]=0;
    }
  }
  else    
  {
      kk_click12=Max-1;
      mm_click12+=Fld[kk_click12];
    while((mm_click12<nn_click12)&&(kk_click12>0)) {
        kk_click12--;
      mm_click12+=Fld[kk_click12];
    }
    for (pp_click12=kk_click12; pp_click12<kk_click12+mm_click12; pp_click12++)
    {
        Fld[pp_click12]+=2;
        window.document.images[pp_click12].src = Pic[Fld[pp_click12]].src;
      Fld[pp_click12]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}
function Clicked13(ii_click13)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click13, nn_click13=0;
    if (Move==0) { 
        for (jj_click13=0; jj_click13<=ii_click13; jj_click13++) {
            nn_click13+=Fld[jj_click13];
        }
        if ((nn_click13<1)||(nn_click13>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click13=ii_click13; jj_click13<Max; jj_click13++) {
                nn_click13+=Fld[jj_click13];
            }
            if ((nn_click13<1)||(nn_click13>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click13<1)||(nn_click13>3)) {
        return;
    }
     var kk_click13, pp_click13, mm_click13=0;
  if (Move==0)
  {
      kk_click13=0;
      mm_click13+=Fld[kk_click13];
    while((mm_click13<nn_click13)&&(kk_click13<Max-1)) {
        kk_click13++;
      mm_click13+=Fld[kk_click13];
    }
    for (pp_click13=kk_click13-mm_click13+1; pp_click13<=kk_click13; pp_click13++)
    {
        Fld[pp_click13]+=2;
        window.document.images[pp_click13].src = Pic[Fld[pp_click13]].src;
      Fld[pp_click13]=0;
    }
  }
  else    
  {
      kk_click13=Max-1;
      mm_click13+=Fld[kk_click13];
    while((mm_click13<nn_click13)&&(kk_click13>0)) {
        kk_click13--;
      mm_click13+=Fld[kk_click13];
    }
    for (pp_click13=kk_click13; pp_click13<kk_click13+mm_click13; pp_click13++)
    {
        Fld[pp_click13]+=2;
        window.document.images[pp_click13].src = Pic[Fld[pp_click13]].src;
      Fld[pp_click13]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}
function Clicked14(ii_click14)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click14, nn_click14=0;
    if (Move==0) { 
        for (jj_click14=0; jj_click14<=ii_click14; jj_click14++) {
            nn_click14+=Fld[jj_click14];
        }
        if ((nn_click14<1)||(nn_click14>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click14=ii_click14; jj_click14<Max; jj_click14++) {
                nn_click14+=Fld[jj_click14];
            }
            if ((nn_click14<1)||(nn_click14>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click14<1)||(nn_click14>3)) {
        return;
    }
     var kk_click14, pp_click14, mm_click14=0;
  if (Move==0)
  {
      kk_click14=0;
      mm_click14+=Fld[kk_click14];
    while((mm_click14<nn_click14)&&(kk_click14<Max-1)) {
        kk_click14++;
      mm_click14+=Fld[kk_click14];
    }
    for (pp_click14=kk_click14-mm_click14+1; pp_click14<=kk_click14; pp_click14++)
    {
        Fld[pp_click14]+=2;
        window.document.images[pp_click14].src = Pic[Fld[pp_click14]].src;
      Fld[pp_click14]=0;
    }
  }
  else    
  {
      kk_click14=Max-1;
      mm_click14+=Fld[kk_click14];
    while((mm_click14<nn_click14)&&(kk_click14>0)) {
        kk_click14--;
      mm_click14+=Fld[kk_click14];
    }
    for (pp_click14=kk_click14; pp_click14<kk_click14+mm_click14; pp_click14++)
    {
        Fld[pp_click14]+=2;
        window.document.images[pp_click14].src = Pic[Fld[pp_click14]].src;
      Fld[pp_click14]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}

function Clicked15(ii_click15)
{ 
    if (IsOver) {
        return;
    }
    if (IsRemoving) {
        return;
    }
    var jj_click15, nn_click15=0;
    if (Move==0) { 
        for (jj_click15=0; jj_click15<=ii_click15; jj_click15++) {
            nn_click15+=Fld[jj_click15];
        }
        if ((nn_click15<1)||(nn_click15>3)) {
            alert("You must remove 1, 2 or 3 matches \nfrom the left side!");
        }
    } else { 
        if (Move==0)
        { 
            for (jj_click15=ii_click15; jj_click15<Max; jj_click15++) {
                nn_click15+=Fld[jj_click15];
            }
            if ((nn_click15<1)||(nn_click15>3)) {
                alert("You must remove 1, 2 or 3 matches \nfrom the right side!");
            }
        }
    }
    if ((nn_click15<1)||(nn_click15>3)) {
        return;
    }
     var kk_click15, pp_click15, mm_click15=0;
  if (Move==0)
  {
      kk_click15=0;
      mm_click15+=Fld[kk_click15];
    while((mm_click15<nn_click15)&&(kk_click15<Max-1)) {
        kk_click15++;
      mm_click15+=Fld[kk_click15];
    }
    for (pp_click15=kk_click15-mm_click15+1; pp_click15<=kk_click15; pp_click15++)
    {
        Fld[pp_click15]+=2;
        window.document.images[pp_click15].src = Pic[Fld[pp_click15]].src;
      Fld[pp_click15]=0;
    }
  }
  else    
  {
      kk_click15=Max-1;
      mm_click15+=Fld[kk_click15];
    while((mm_click15<nn_click15)&&(kk_click15>0)) {
        kk_click15--;
      mm_click15+=Fld[kk_click15];
    }
    for (pp_click15=kk_click15; pp_click15<kk_click15+mm_click15; pp_click15++)
    {
        Fld[pp_click15]+=2;
        window.document.images[pp_click15].src = Pic[Fld[pp_click15]].src;
      Fld[pp_click15]=0;
    }
  }

  Move=1-Move;
  IsRemoving=true;
  setTimeout(RefreshScreen,400);  
}


function MakeBestMove()
{
    var ii_best, nn_best=0;

    if (Fld[0]+Fld[1]+Fld[2]+Fld[3]+Fld[4]+Fld[5]+Fld[6]+Fld[7]+Fld[8]+Fld[9]+Fld[10]+Fld[11]+Fld[12]+Fld[13]+Fld[14]+Fld[15]>3) 
    { 
        if (Level[Move]==1) {
            nn_best=Math.floor(Math.random()*3)+1;
        }
        else {
            nn_best=(nn_best-Mode)%4;
        }
        if (nn_best==0) {
            nn_best=Math.floor(Math.random()*3)+1;
        }
    }
    else
    { 
        if ((Mode==1)&&(nn_best>1)) {
            nn_best--;    
        }
    }
    var ii_remove, jj_remove, mm_remove=0;
    if (Move==0)
    {
        ii_remove=0;
        mm_remove+=Fld[ii_remove];
        while((mm_remove<nn_best)&&(ii_remove<Max-1)) {
            ii_remove++;
            mm_remove+=Fld[ii_remove];
        }
        for (jj_remove=ii_remove-mm_remove+1; jj_remove<=ii_remove; jj_remove++) {
            Fld[jj_remove]+=2;
            window.document.images[jj_remove].src = Pic[Fld[jj_remove]].src;
            Fld[jj_remove]=0;
        }
    } else {
        ii_remove=Max-1;
        mm_remove+=Fld[ii_remove];
        while((mm_remove<nn_best)&&(ii_remove>0)) {
            ii_remove--;
            mm_remove+=Fld[ii_remove];
        }
        for (jj_remove=ii_remove; jj_remove<ii_remove+mm_remove; jj_remove++)
        {
            Fld[jj_remove]+=2;
            window.document.images[jj_remove].src = Pic[Fld[jj_remove]].src;
            Fld[jj_remove]=0;
        }
    }

    Move=1-Move;
    IsRemoving=true;
    setTimeout(RefreshScreen,400);  
}


function RefreshScreen()
{
    window.document.images[0].src = Pic[Fld[0]].src;
    window.document.images[1].src = Pic[Fld[1]].src;
    window.document.images[2].src = Pic[Fld[2]].src;
    window.document.images[3].src = Pic[Fld[3]].src;
    window.document.images[4].src = Pic[Fld[4]].src;
    window.document.images[5].src = Pic[Fld[5]].src;
    window.document.images[6].src = Pic[Fld[6]].src;
    window.document.images[7].src = Pic[Fld[7]].src;
    window.document.images[8].src = Pic[Fld[8]].src;
    window.document.images[9].src = Pic[Fld[9]].src;
    window.document.images[10].src = Pic[Fld[10]].src;
    window.document.images[11].src = Pic[Fld[11]].src;
    window.document.images[12].src = Pic[Fld[12]].src;
    window.document.images[13].src = Pic[Fld[13]].src;
    window.document.images[14].src = Pic[Fld[14]].src;
    window.document.images[15].src = Pic[Fld[15]].src;
    IsRemoving=false;
    IsOver=false;

    if (Fld[0]+Fld[1]+Fld[2]+Fld[3]+Fld[4]+Fld[5]+Fld[6]+Fld[7]+Fld[8]+Fld[9]+Fld[10]+Fld[11]+Fld[12]+Fld[13]+Fld[14]+Fld[15] > 0) {
        return(false);
    }
    IsOver=true;

    if ((Move+Mode)%2==0) {
        alert("The player at the right side has won!");
    }
    else {
        alert("The player at the left side has won!");
    }
    return(true);
}

function ShowHelp()
{
    alert("The players alternately remove 1, 2 or 3 matches from the row."+"\nThe player wins (loses), who removes the last match.");
}

Init1(true);
setInterval(Timer,1000);  

var m0 = document.getElementById("m0");
m0.onclick = Clicked0;
var m1 = document.getElementById("m1");
m1.onclick = Clicked1;
var m2 = document.getElementById("m2");
m2.onclick = Clicked2;
var m3 = document.getElementById("m3");
m3.onclick = Clicked3;
var m4 = document.getElementById("m4");
m4.onclick = Clicked4;
var m5 = document.getElementById("m5");
m5.onclick = Clicked5;
var m6 = document.getElementById("m6");
m6.onclick = Clicked6;
var m7 = document.getElementById("m7");
m7.onclick = Clicked7;
var m8 = document.getElementById("m8");
m8.onclick = Clicked8;
var m9 = document.getElementById("m9");
m9.onclick = Clicked9;
var m10 = document.getElementById("m10");
m10.onclick = Clicked10;
var m11 = document.getElementById("m11");
m11.onclick = Clicked11;
var m12 = document.getElementById("m12");
m12.onclick = Clicked12;
var m13 = document.getElementById("m13");
m13.onclick = Clicked13;
var m14 = document.getElementById("m14");
m14.onclick = Clicked14;
var m15 = document.getElementById("m15");
m15.onclick = Clicked15;

var s0 = document.getElementById("s0");
s0.onchange = SetMode;

var s1 = document.getElementById("s1");
s1.onchange = SetLevel1;
var s2 = document.getElementById("s2");
s2.onchange = SetLevel2;
var s3 = document.getElementById("s3");
s3.onchange = SetStart;

var b0 = document.getElementById("b0");
b0.onclick = Init1;
var b1 = document.getElementById("b1");
b1.onclick = Init1;
var b2 = document.getElementById("b2");
b2.onclick = ShowHelp;


