function scene()
{
    this.solid_number = 0;
    this.solid = new Array();
    this.observer = [0, 0, 0];
    this.distance = -650;
}

var world = new scene();

var colore = 'rgb(255,255,255)';
var alpha = 0.6;
var teta_x_global = 0;
var teta_y_global = 0;
var motion = 1;
var id_timer=0;


function init()
{
    world.solid[world.solid_number++] = new  dinosaur([255,255,255],[0,0,0]);
    scale_solid([3, 3, 3],world.solid[world.solid_number-1]);
    translate_solid([-world.solid[world.solid_number-1].center[0], -world.solid[world.solid_number-1].center[1], -world.solid[world.solid_number-1].center[2]],world.solid[world.solid_number-1]);
    translate_solid([0, 0, -1100],world.solid[world.solid_number-1]);



    document.onclick = onKeyDown;
    document.onmousemove = onMouseMove;
    var id = document.getElementById("modello");
    id.onclick = changeModel;
    id.onchange = changeModel;
    setInterval(draw,5);

}

function changeModel()
{
    clearInterval(id_timer);
    var canvas = document.getElementById("display");

    if (canvas.getContext) 
    {
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0,0,1000,550);

    }

    var key = Math.floor((Math.random() * 70) + 1);

    if (key == 1 || document.getElementById("modello").value=='dino')
    {
        world.solid[0] = new  dinosaur([255,255,255],[0,0,0]);
        scale_solid([3, 3, 3],world.solid[world.solid_number-1]);
        translate_solid([-world.solid[world.solid_number-1].center[0], -world.solid[world.solid_number-1].center[1], -world.solid[world.solid_number-1].center[2]],world.solid[world.solid_number-1]);
        translate_solid([0, 0, -1100],world.solid[world.solid_number-1]);
    }
    if (key == 2 || document.getElementById("modello").value=='heli')
    {
        world.solid[0] = new  helicopter([255,255,255],[0,0,0]);
        scale_solid([12, 12, 12],world.solid[world.solid_number-1]);
        translate_solid([-world.solid[world.solid_number-1].center[0], -world.solid[world.solid_number-1].center[1], -world.solid[world.solid_number-1].center[2]],world.solid[world.solid_number-1]);
        translate_solid([0, 0, -1100],world.solid[world.solid_number-1]);
    }
    if (key == 3 || document.getElementById("modello").value=='ship')
    {
        world.solid[0] = new  ship([255,255,255],[0,0,0]);
        scale_solid([3, 3, 3],world.solid[world.solid_number-1]);
        translate_solid([-world.solid[world.solid_number-1].center[0], -world.solid[world.solid_number-1].center[1], -world.solid[world.solid_number-1].center[2]],world.solid[world.solid_number-1]);
        translate_solid([0, 0, -1100],world.solid[world.solid_number-1]);
    }

    id_timer =setInterval(draw,5);
}

function onKeyDown(evt) 
{
    // MODIFIED by CH
    // random between 1 and 100
    var key = Math.floor((Math.random() * 100) + 1);
    var keyCode = 0;
    if (key === 1) {
        keyCode = 77;
    } else if (key === 2) {
        keyCode = 82;
    } else if (key === 3) {
        keyCode = 71;
    } else if (key === 4) {
        keyCode = 89;
    } else if (key === 5) {
        keyCode = 66;
    } else if (key === 6) {
        keyCode = 87;
    } else if (key === 7) {
        keyCode = 49;
    } else if (key === 8) {
        keyCode = 50;
    } else if (key === 9) {
        keyCode = 51;
    } else if (key === 10) {
        keyCode = 52;
    } else if (key === 11) {
        keyCode = 53;
    } else if (key === 12) {
        keyCode = 54;
    } else if (key === 13) {
        keyCode = 55;
    } else if (key === 14) {
        keyCode = 56;
    } else if (key === 15) {
        keyCode = 57;
    } else if (key === 16) {
        keyCode = 48;
    }

    if(keyCode==77) {
        motion = (motion+1) % 2;
    }
    if(keyCode==82) {
        colore = 'rgb(255,0,0)';
    }
    if(keyCode==71) {
        colore = 'rgb(0,255,0)'; 
    }
    if(keyCode==89) {
        colore = 'rgb(255,255,0)';
    }
    if(keyCode==66) {
        colore = 'rgb(0,0,255)';  
    }
    if(keyCode==87) {
        colore = 'rgb(255,255,255)';    
    }
    if(keyCode==49) {
        alpha = 0.1;
    }
    if(keyCode==50) {
        alpha = 0.15;
    }
    if(keyCode==51) {
        alpha = 0.2;
    }
    if(keyCode==52) {
        alpha = 0.25;
    }
    if(keyCode==53) {
        alpha = 0.3;
    }
    if(keyCode==54) {
        alpha = 0.4;
    }
    if(keyCode==55) {
        alpha = 0.5;
    }
    if(keyCode==56) {
        alpha = 0.6;
    }
    if(keyCode==57) {
        alpha = 0.7;
    } 
    if(keyCode==48) {
        alpha = 0.8;
    }
}

function onMouseMove(evt) 
{
    var x = evt.pageX-document.getElementById("display").offsetLeft;
    var y = evt.pageY-document.getElementById("display").offsetTop;
    // MODIFIED by CH
    x = Math.floor((Math.random() * 30000) + 1);
    y = Math.floor((Math.random() * 15000) + 1);

    if ((x>0) && (x<1000) &&(y>0) && (y<550))
    {
        teta_y_global = 0.10*(x-500)/500;
        teta_x_global = 0.10*(y-275)/275;
    }

}

function draw() 
{
    var canvas = document.getElementById("display");
    if (canvas.getContext) 
    {
        var ctx = canvas.getContext("2d");

        if (motion==0)
        {
            ctx.clearRect(0,0,1000,550);
        }
        else
        {
            ctx.globalAlpha= 0.2;
            ctx.fillStyle = 'rgb(255,255,255)';
            ctx.fillRect(0,0,1000,550);
        } 



        ctx.fillStyle = colore;
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.lineWidth = 0.5;
        ctx.globalAlpha= alpha;

        var parametrig1 = get_rotation_parameter([0, 0, -1100], [0, 1, 0], teta_y_global);
        var parametrig2 = get_rotation_parameter([0, 0, 0], [0, 1, 0], teta_y_global);
        var parametrig1a = get_rotation_parameter([0, 0, -1100], [1, 0, 0], teta_x_global);
        var parametrig2a = get_rotation_parameter([0, 0, 0], [1, 0, 0], teta_x_global);



        for (var i=0; i<world.solid_number; i++)
        {
            rotate_solid_fast(parametrig1, parametrig2, world.solid[i]);
            rotate_solid_fast(parametrig1a, parametrig2a, world.solid[i]);
        }      





        var contatore = 0;

        visible_polygons = new Array();

        var delta_x;
        var delta_y;
        var delta_z;
        for (var j=0; j<world.solid_number; j++)
        {
            for (var i=0; i<world.solid[j].points_number; i++)
            {  world.solid[j].distances[i]= Math.pow(world.solid[j].points[i][0],2) + Math.pow(world.solid[j].points[i][1],2) + Math.pow(world.solid[j].points[i][2],2);
            }}

        for (var j=0; j<world.solid_number; j++)
        {
            for (var i=0; i<world.solid[j].faces_number; i++)
            {
                var max =world.solid[j].distances[world.solid[j].faces[i][0]];
                for (var w=1; w<world.solid[j].faces[i].length; w++)
                {
                    if (world.solid[j].distances[world.solid[j].faces[i][w]]>max) {
                     max=world.solid[j].distances[world.solid[j].faces[i][w]]; 
                    }
                }  
                visible_polygons[contatore++] = {solid:j, vertex:world.solid[j].faces[i], fillcolor:world.solid[j].fillcolor, linecolor:world.solid[j].linecolor, distance:max};							
            }
        }

        visible_polygons.sort(sortfunction);

        var projected_points = new Array();

        for (var j=0; j<world.solid_number; j++)
        {
            projected_points[j]=new Array();
            for (var i=0; i<world.solid[j].points.length; i++)
            {
                projected_points[j][i] = project(world.distance, world.solid[j].points[i]);
            }
        }
        for (var i=0; i<contatore; i++)
        {	

            ctx.beginPath();
            var indice_solido = visible_polygons[i].solid;
            var indici_vertici = visible_polygons[i].vertex;

            ctx.moveTo(projected_points[indice_solido][indici_vertici[0]][0],projected_points[indice_solido][indici_vertici[0]][1]);
            for (var z=1;z<visible_polygons[i].vertex.length;z++) {
                ctx.lineTo(projected_points[indice_solido][indici_vertici[z]][0],projected_points[indice_solido][indici_vertici[z]][1]);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    }
}


function sortfunction(a, b)
{
    return(b.distance-a.distance);
}



//// design.js
function dinosaur(fillcolor, linecolor)
{
      
    this.points=[[0,0,0],[-31.75,-22.61,-150.88], [-10.67,-68.07,-84.84]];
    this.faces=[[3,2,1], [555,377,383]];

    this.normals = new Array();

    for (var i=0; i<this.faces.length; i++)
    {
        this.normals[i] = [0, 0, 0];
    }

    this.center = [0, 0, 0];

    for (var i=0; i<this.points.length; i++)
    {
        this.center[0] += this.points[i][0];
        this.center[1] += this.points[i][1];
        this.center[2] += this.points[i][2];
    }

    this.distances = new Array();
    for (var i=1; i<this.points.length; i++)
    {
        this.distances[i] = 0;
    }

    this.points_number = this.points.length;
    this.center[0] = this.center[0]/(this.points_number-1);
    this.center[1] = this.center[1]/(this.points_number-1);
    this.center[2] = this.center[2]/(this.points_number-1);

    this.faces_number = this.faces.length;
    this.axis_x = [1, 0, 0];
    this.axis_y = [0, 1, 0];
    this.axis_z = [0, 0, 1];
    this.fillcolor = fillcolor;
    this.linecolor = linecolor;
}	
			
			
function helicopter(fillcolor, linecolor)
{

    this.points=[[0,0,0], [0.000000,2.760000,3.060000]];
    this.faces=[[1,6,7], [674,675,625]];

    this.normals = new Array();

    for (var i=0; i<this.faces.length; i++)
    {
        this.normals[i] = [0, 0, 0];
    }

    this.center = [0, 0, 0];

    for (var i=0; i<this.points.length; i++)
    {
        this.center[0] += this.points[i][0];
        this.center[1] += this.points[i][1];
        this.center[2] += this.points[i][2];
    }

    this.distances = new Array();
    for (var i=1; i<this.points.length; i++)
    {
        this.distances[i] = 0;
    }

    this.points_number = this.points.length;
    this.center[0] = this.center[0]/(this.points_number-1);
    this.center[1] = this.center[1]/(this.points_number-1);
    this.center[2] = this.center[2]/(this.points_number-1);

    this.faces_number = this.faces.length;
    this.axis_x = [1, 0, 0];
    this.axis_y = [0, 1, 0];
    this.axis_z = [0, 0, 1];
    this.fillcolor = fillcolor;
    this.linecolor = linecolor;
}	
			
			
function ship(fillcolor, linecolor)
{

    this.points=[[0,0,0], [106.123833,1.943451,21.253679]];
    this.faces=[[212,206,33,27,21,15,9,3,224,218], [428,425,423,424]];

    this.normals = new Array();

    for (var i=0; i<this.faces.length; i++)
    {
        this.normals[i] = [0, 0, 0];
    }

    this.center = [0, 0, 0];

    for (var i=0; i<this.points.length; i++)
    {
        this.center[0] += this.points[i][0];
        this.center[1] += this.points[i][1];
        this.center[2] += this.points[i][2];
    }

    this.distances = new Array();
    for (var i=1; i<this.points.length; i++)
    {
        this.distances[i] = 0;
    }

    this.points_number = this.points.length;
    this.center[0] = this.center[0]/(this.points_number-1);
    this.center[1] = this.center[1]/(this.points_number-1);
    this.center[2] = this.center[2]/(this.points_number-1);

    this.faces_number = this.faces.length;
    this.axis_x = [1, 0, 0];
    this.axis_y = [0, 1, 0];
    this.axis_z = [0, 0, 1];
    this.fillcolor = fillcolor;
    this.linecolor = linecolor;
}	

// transform.js
function rotate_x(center, sin_cos_angle, point)
{
	var diff1 = point[1]-center[1];
	var diff2 = center[2]-point[2];

	point[1] = center[1]+diff1*sin_cos_angle[1]+diff2*sin_cos_angle[0];
	point[2] = center[2]-diff2*sin_cos_angle[1]+diff1*sin_cos_angle[0];
}

function rotate_x_normal(sin_cos_angle, point)
{
	var temp = point[1];
	
	point[1] = temp*sin_cos_angle[1]-point[2]*sin_cos_angle[0];
	point[2] = point[2]*sin_cos_angle[1]+temp*sin_cos_angle[0];
}

function rotate_y(center, sin_cos_angle, point)
{		
	var diff1 = point[0]-center[0];
	var diff2 = point[2]-center[2];

	point[0] = center[0]+diff1*sin_cos_angle[1]+diff2*sin_cos_angle[0];
	point[2] = center[2]+diff2*sin_cos_angle[1]-diff1*sin_cos_angle[0];
}

function rotate_y_normal(sin_cos_angle, point)
{
	var temp = point[0];
	
	point[0] = temp*sin_cos_angle[1]+point[2]*sin_cos_angle[0];
	point[2] = point[2]*sin_cos_angle[1]-temp*sin_cos_angle[0];
}

function rotate_z(center, sin_cos_angle, point)
{
	var diff1 = point[0]-center[0];
	var diff2 = point[1]-center[1];

	point[0] = center[0]+diff1*sin_cos_angle[1]-diff2*sin_cos_angle[0];
	point[1] = center[1]+diff2*sin_cos_angle[1]+diff1*sin_cos_angle[0];
}
	
function rotate_z_normal(sin_cos_angle, point)
{
	var temp = point[0];
	
	point[0] = temp*sin_cos_angle[1]-point[1]*sin_cos_angle[0];
	point[1] = point[1]*sin_cos_angle[1]+temp*sin_cos_angle[0];
}		

			
function get_rotation_parameter(center, vector, teta)
{
	var result = new Array();
	
	var u_u = vector[0]*vector[0];
	var v_v = vector[1]*vector[1];
	var w_w = vector[2]*vector[2]; 

	var v_v_p_w_w = (v_v+w_w);
	var u_u_p_w_w = (u_u+w_w);
	var u_u_p_v_v = (u_u+v_v);

	var b_v_p_c_w = center[1]*vector[1]+center[2]*vector[2];
	var a_u_p_c_w = center[0]*vector[0]+center[2]*vector[2];
	var a_u_p_b_v = center[0]*vector[0]+center[1]*vector[1];

	var b_w_m_c_v = center[1]*vector[2]-center[2]*vector[1];
	var c_u_m_a_w = center[2]*vector[0]-center[0]*vector[2];
	var a_v_m_b_u = center[0]*vector[1]-center[1]*vector[0];

	var den = v_v+u_u+w_w;

	result[0] = den;

	result[1] = v_v_p_w_w;
	result[2] = u_u_p_w_w;
	result[3] = u_u_p_v_v;

	result[4] = center[0]*v_v_p_w_w;
	result[5] = center[1]*u_u_p_w_w;
	result[6] = center[2]*u_u_p_v_v;

	result[7] = b_v_p_c_w;
	result[8] = a_u_p_c_w;
	result[9] = a_u_p_b_v;

	result[10] = Math.cos(teta);

	result[11] = Math.sin(teta)*Math.sqrt(den);

	result[12] = b_w_m_c_v;
	result[13] = c_u_m_a_w;
	result[14] = a_v_m_b_u;

	result[15] = center[0];
	result[16] = center[1];
	result[17] = center[2];
	result[18] = vector[0];
	result[19] = vector[1];
	result[20] = vector[2];

	
	return result;
}

			
function rotate(p, point)
{
	var p_20_p_2 = p[20]*point[2];
	var p_19_p_1 = p[19]*point[1];
	var p_18_p_0 = p[18]*point[0];
	var u_x_p_v_y_p_w_z = p_18_p_0+p_19_p_1+p_20_p_2;
	
	var temp0 = point[0];
	var temp1 = point[1];

	point[0] = (p[4]+p[18]*(-p[7]+u_x_p_v_y_p_w_z)+((temp0-p[15])*p[1]+p[18]*(p[7]-p_19_p_1-p_20_p_2))*p[10]+p[11]*(p[12]-p[20]*temp1+p[19]*point[2]))/p[0];
	point[1] = (p[5]+p[19]*(-p[8]+u_x_p_v_y_p_w_z)+((temp1-p[16])*p[2]+p[19]*(p[8]-p_18_p_0-p_20_p_2))*p[10]+p[11]*(p[13]+p[20]*temp0-p[18]*point[2]))/p[0];
	point[2] = (p[6]+p[20]*(-p[9]+u_x_p_v_y_p_w_z)+((point[2]-p[17])*p[3]+p[20]*(p[9]-p_18_p_0-p_19_p_1))*p[10]+p[11]*(p[14]-p[19]*temp0+p[18]*temp1))/p[0];
}

function translate(vector, point)
{
	point[0] = point[0] + vector[0];
	point[1] = point[1] + vector[1];
	point[2] = point[2] + vector[2];
}

function scale(vector, point)
{
	point[0] = point[0] * vector[0];
	point[1] = point[1] * vector[1];
	point[2] = point[2] * vector[2];
}


function translate_solid(vector, solid)
{
	translate(vector, solid.center);
	
	for (var i=0; i<solid.points_number; i++)
	{
		translate(vector, solid.points[i]);
	}
}

function translate_solid_direction(vector, delta, solid)
{
	translate([vector[0]*delta, vector[1]*delta, vector[2]*delta], solid.center);
	
	for (var i=0; i<solid.points_number; i++)
	{
		translate([vector[0]*delta, vector[1]*delta, vector[2]*delta], solid.points[i]);
	}
}

function scale_solid(vector, solid)
{
	var da = solid.center;
	var a = [-solid.center[0], -solid.center[1], -solid.center[2]];
		
	translate_solid(a, solid);
	for (var i=0; i<solid.points_number; i++)
	{
		scale(vector, solid.points[i]);
	}
	
	translate_solid(da, solid);
}


function rotate_solid(point, vector, angle, solid)
{
	parametri = get_rotation_parameter(point, vector, angle);
	parametri2 = get_rotation_parameter([0, 0, 0], vector, angle);

	rotate(parametri, solid.center);
	rotate(parametri2, solid.axis_x);
	rotate(parametri2, solid.axis_y);
	rotate(parametri2, solid.axis_z);
	
	for (var i=0; i<solid.faces_number; i++)
	{
		rotate(parametri2, solid.normals[i]);
	}
		
	for (var j=0; j<solid.points_number; j++)
	{
		rotate(parametri, solid.points[j]);					
	}
}

function rotate_solid_fast(parametri1, parametri2, solid)
{
	rotate(parametri1, solid.center);
	rotate(parametri2, solid.axis_x);
	rotate(parametri2, solid.axis_y);
	rotate(parametri2, solid.axis_z);
	
	for (var i=0; i<solid.faces_number; i++)
	{
		rotate(parametri2, solid.normals[i]);
	}
		
	for (var j=0; j<solid.points_number; j++)
	{
		rotate(parametri1, solid.points[j]);					
	}
}

function rotate_solid_x(center, angle, solid)
{

	var sin_cosin_teta = [Math.sin(angle), Math.cos(angle)];

	rotate_x(center, sin_cosin_teta, solid.center);
	rotate_x_normal(sin_cosin_teta, solid.axis_x);
	rotate_x_normal(sin_cosin_teta, solid.axis_y);
	rotate_x_normal(sin_cosin_teta, solid.axis_z);
	
	for (var i=0; i<solid.faces_number; i++)
	{
		rotate_x_normal(sin_cosin_teta, solid.normals[i]);
	}
		
	for (var j=0; j<solid.points_number; j++)
	{
			rotate_x(center, sin_cosin_teta, solid.points[j]);					
	}
}

function rotate_solid_y(center, angle, solid)
{
	var sin_cosin_teta = [Math.sin(angle), Math.cos(angle)];

	rotate_y(center, sin_cosin_teta, solid.center);
	rotate_y_normal(sin_cosin_teta, solid.axis_x);
	rotate_y_normal(sin_cosin_teta, solid.axis_y);
	rotate_y_normal(sin_cosin_teta, solid.axis_z);
	
	for (var i=0; i<solid.faces_number; i++)
	{
		rotate_y_normal(sin_cosin_teta, solid.normals[i]);
	}
		
	for (var j=0; j<solid.points_number; j++)
	{
		rotate_y(center, sin_cosin_teta, solid.points[j]);					
	}
}

function rotate_solid_z(center, angle, solid)
{
	var sin_cosin_teta = [Math.sin(angle), Math.cos(angle)];

	rotate_z(center, sin_cosin_teta, solid.center);
	rotate_z_normal(sin_cosin_teta, solid.axis_x);
	rotate_z_normal(sin_cosin_teta, solid.axis_y);
	rotate_z_normal(sin_cosin_teta, solid.axis_z);
	
	for (var i=0; i<solid.faces_number; i++)
	{
		rotate_z_normal(sin_cosin_teta, solid.normals[i]);
	}
	
	for (var j=0; j<solid.points_number; j++)
	{
		rotate_z(center, sin_cosin_teta, solid.points[j]);					
	}
}

function project(distance, point)
{
	var result = new Array();

	result[0] = point[0]*distance/point[2]+500;
	result[1] = 275-point[1]*distance/point[2];
	result[2] = distance;

	return result;
}
