$(document).ready(function(){

canvasCont=document.getElementById("canvasCont");
mainCont=document.getElementById("main_content");
rightPanel=document.getElementById("controlPanelColumn");
leftPanel=document.getElementById("leftColumn");

function initialize(){
	

canvasCont=document.getElementById('canvasCont');

    
	
		canvasCont=document.getElementById('canvasCont');
  ctx.canvas.width  = canvasCont.clientWidth ;
  ctx.canvas.height = canvasCont.clientWidth ;
  cctx.canvas.width  = canvasCont.clientWidth ;
  cctx.canvas.height = canvasCont.clientWidth ;
	
	window.clockWidth=canvas.clientHeight;
window.clockBasepoint=(canvas.clientWidth-clockWidth)/2;

myCanvasOffset=document.getElementById("myCanvas").getBoundingClientRect();

radius=totalWidth(40);
sirkel1=totalWidth(2);
sirkel1p5=totalWidth(20);
sirkel2=totalWidth(26);
sirkel3=totalWidth(29);
sirkel3p5=totalWidth(32.5);
sirkel4=totalWidth(36);
window.center=totalWidth(50);
senter=totalWidth(50);
supportNumbers=currentProp()*11;
durationNumbers=currentProp()*16;
	
  drawLines();
clearClockCircle(sirkel1p5);
drawCircles();
drawImpLines();
drawClockNumbers();
	
//canvasCont.style.height=canvasCont.clientWidth+"px";
	console.log(mainCont.clientHeight);
//rightPanel.style.height=mainCont.clientHeight-10+"px";
//leftPanel.style.height=mainCont.clientHeight-10+"px";
  
}




window.addEventListener("resize", initialize);


defaultstrokecolor="#C9C9C9";
impstrokecolor="#262626";


function drawLines(){
cctx.save();
cctx.strokeStyle=defaultstrokecolor;
cctx.beginPath();
cctx.translate(totalWidth(50),totalWidth(50));
for(i=0;i<12;i++){
c=minutesToXY(i*60);
cctx.moveTo(c.x,c.y);
c=minutesToXY(i*60+720);
cctx.lineTo(c.x,c.y);
}	
cctx.closePath();
cctx.stroke();
cctx.restore();
}

function drawImpLines(){
cctx.save();
cctx.translate(totalWidth(50),totalWidth(50));
cctx.beginPath();
cctx.strokeStyle=impstrokecolor;

c=minutesToXY(0);
cctx.moveTo(c.x,c.y);
c=minutesToXY(720);
cctx.lineTo(c.x,c.y);
c=minutesToXY(240);
cctx.moveTo(c.x,c.y);
c=minutesToXY(960);
cctx.lineTo(c.x,c.y);
c=minutesToXY(480);
cctx.moveTo(c.x,c.y);
c=minutesToXY(1200);
cctx.lineTo(c.x,c.y);

cctx.closePath();
cctx.stroke();
cctx.restore();	
}


function drawCircles(){
cctx.beginPath();
cctx.arc(senter, senter, totalWidth(36), 0, grader(360), false);
cctx.moveTo(senter+sirkel3,totalWidth(50));
cctx.arc(senter, senter, totalWidth(29), 0, grader(360), false);
cctx.moveTo(senter+sirkel1p5,totalWidth(50));
cctx.arc(senter, senter, sirkel1p5, 0, grader(360), false);
cctx.moveTo(senter+sirkel1,totalWidth(50));
cctx.arc(senter, senter, sirkel1, 0, grader(360), false);
cctx.closePath();
cctx.strokeStyle=defaultstrokecolor;
cctx.stroke();

cctx.beginPath();
cctx.arc(senter, senter, totalWidth(29), 0, grader(360), false);
cctx.closePath();
cctx.strokeStyle="#BABABA";
cctx.stroke();

}


function drawClockNumbers(){
impfontpixels=currentProp()*20;
cctx.fillStyle="black";
numberRadius=totalWidth(44);
	cctx.font=impfontpixels+"px Verdana";
	cctx.textAlign="center";
	cctx.textBaseline="middle";
cctx.fillStyle="#262626";
for(i=0;i<24;i++){
	if(i==0||i==4||i==16||i==20||i==8||i==12){
	degrees=(grader((15*i)+270));
	xval=totalWidth(50)+Math.cos(degrees)*numberRadius;
	yval=totalWidth(50)+Math.sin(degrees)*numberRadius;
	if(i==0)
	cctx.fillText("0",xval,yval);
	else if(i==12)
	cctx.fillText("12",xval,yval);
	else
	cctx.fillText(i,xval,yval);
}}
}
	
	


function clearCanvas(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
}



function drawAlfa(){
if (typeof data['alfa'] != 'undefined'){
$.each(data['alfa'],function(i){
ctx.beginPath();
ctx.arc(senter,senter, sirkel3,klokkegrader(data['alfa'][i].start),klokkegrader(data['alfa'][i].end), false);
f=minutesToXY_OIC(data.alfa[i].end,73);
ctx.lineTo(f.x,f.y);
ctx.arc(senter, senter, sirkel3p5,klokkegrader(data.alfa[i].end),klokkegrader(data.alfa[i].start), true);
ctx.save();
if(typeof mdown.barHolder=="alfa"&&mdown.count==i)
ctx.globalAlpha=0.5;
else
ctx.globalAlpha=0.6;
ctx.fillStyle=color['alfa'];
ctx.fill();
ctx.restore();
});}}
function drawCharlie(){
if (typeof data.charlie != 'undefined'){
$.each(data.charlie,function(i){
ctx.beginPath();
ctx.arc(senter, senter, totalWidth(40),klokkegrader(data.charlie[i].start),klokkegrader(data.charlie[i].end), false);
f=minutesToXY_OIC(data.charlie[i].end,73);
ctx.lineTo(f.x,f.y);
ctx.arc(senter, senter, sirkel3,klokkegrader(data.charlie[i].end),klokkegrader(data.charlie[i].start), true);
ctx.save();
if(mdown.barHolder=="charlie"&&mdown.count==0)
ctx.globalAlpha=0.6;
else if(ctx.isPointInPath(mx,my))
ctx.globalAlpha=0.5;
else
ctx.globalAlpha=0.6;
ctx.fillStyle=color["charlie"];
ctx.fill();
ctx.restore();
ctx.beginPath();
ctx.arc(senter, senter, sirkel3,klokkegrader(data.charlie[i].start),klokkegrader(data.charlie[i].end), false);
ctx.lineTo(senter,senter);
ctx.fillStyle=color["charlie"];
ctx.fill();
});}}

function drawDelta(){
if (typeof data['delta'] != 'undefined'){
$.each(data['delta'],function(i){
ctx.save();
ctx.beginPath();
ctx.arc(senter, senter,totalWidth(40),klokkegrader(data['delta'][i].start),klokkegrader(data['delta'][i].end), false);
f=minutesToXY_OIC(data.delta[i].end,73);
ctx.lineTo(f.x,f.y);
ctx.arc(senter, senter,sirkel3,klokkegrader(data['delta'][i].end),klokkegrader(data['delta'][i].start), true);
ctx.closePath();
ctx.fillStyle=color["delta"];
if(mdown.barHolder=="delta"&&mdown.count==0)
ctx.globalAlpha=0.6;
else if(ctx.isPointInPath(mx,my))
ctx.globalAlpha=0.5;
else
ctx.globalAlpha=0.6;
ctx.fill();
//ctx.lineWidth = 2;
//ctx.strokeStyle="grey";
//ctx.stroke();
ctx.restore();

ctx.beginPath();
ctx.arc(senter, senter,sirkel3,klokkegrader(data['delta'][i].start-2),klokkegrader(data['delta'][i].end+2), false);
f=minutesToXY_OIC(data.delta[i].end,73);
ctx.lineTo(senter,senter);
ctx.fillStyle=color["delta"];
ctx.fill();
});}}


function clearCircle(radius){
ctx.save();
ctx.globalCompositeOperation = 'destination-out'
ctx.beginPath();
ctx.arc(senter,senter,radius,0,grader(360), false);
ctx.fill();
ctx.restore();
}
function drawOpacityCircle(radius,opacity){
ctx.save();
ctx.fillStyle=canvasbgcolor;
ctx.globalAlpha=opacity;
ctx.beginPath();
ctx.arc(senter,senter,radius,0,grader(360), false);
ctx.fill();
ctx.restore();
}
function clearClockCircle(radius){
cctx.save();
cctx.globalCompositeOperation = 'destination-out'
cctx.beginPath();
cctx.arc(senter,senter,radius,0,grader(360), false);
cctx.lineTo(senter,senter);
cctx.closePath();
cctx.fill();
cctx.restore();
}


function drawHandles(){
ctx.save();
ctx.translate(senter,senter);
//outer grey
	
dataKeys=["charlie","alfa"];
for(d=0;d<dataKeys.length;d++){
	if(dataKeys[d]=="charlie"){
countKeys=Object.keys(data[dataKeys[d]]);
	for(i=0;i<countKeys.length;i++){
		
		for(f=0;f<2;f++){
		
ctx.fillStyle = '#a8a8a8';
		ctx.beginPath();
		o=minutesToXY(data.charlie[countKeys[i]][startend[f]]);
		ctx.arc(o.x,o.y,10,0, 2 * Math.PI, false);
		ctx.fill();
		if(mdown.barHolder=="charlie"&&mdown.count==i&&mdown.type==[startend[f]]){
		ctx.beginPath();
			
		console.log(data.charlie[countKeys[i]][startend[f]]);
		o=minutesToXY(data.charlie[countKeys[i]][startend[f]]);
		ctx.fillStyle = '#c95e5e';
		ctx.arc(o.x,o.y,10,0, 2 * Math.PI, false);
		ctx.fill();
		}
		}
	}
	}
}

ctx.fillStyle = 'black';
for (i = 0; i < keys.length; i++) {
for(f=0;f<2;f++){
ctx.beginPath();
o=minutesToXY(data.charlie[keys[i]][startend[f]]);
ctx.arc(o.x,o.y,5,0, 2 * Math.PI, false);
ctx.fill();
}
};
ctx.restore();
};

function drawTimeHandles(){
	restacker();
dataKeys=Object.keys(data);
for(d=0;d<dataKeys.length;d++){
countKeys=Object.keys(data[dataKeys[d]]);
	for(i=0;i<countKeys.length;i++){
		//durationText
		duration=range(data[dataKeys[d]][countKeys[i]].start,data[dataKeys[d]][countKeys[i]].end);
		middlepoint=calc(data[dataKeys[d]][countKeys[i]].start,(duration/2));
		if(dataKeys[d]=="alfa")
		o=minutesToXY_OIC(middlepoint,110);
		else
		o=minutesToXY_OIC(middlepoint,40);
		div=document.getElementById('durationText'+dataKeys[d]+countKeys[i]);
		if(duration>119){
		m=minutesToStatistics(duration);
		c=m[0]+"h "+m[1]+"m";
		div.innerHTML=c;
		}else{
		div.innerHTML=Math.floor(duration)+"m";
		}
		div.style.left=o.x-div.clientWidth/2+"px";
		div.style.top=o.y-div.clientHeight/2+"px";
		//timeHandles
		if(dataKeys[d]=="charlie"||dataKeys[d]=="alfa")
		for(f=0;f<2;f++){
		o=minutesToXY_OIC(data[dataKeys[d]][countKeys[i]][startend[f]],120);
		div=document.getElementById('timeHandles'+dataKeys[d]+countKeys[i]+startend[f]);
		div.innerHTML=minutesToClock(data[dataKeys[d]][countKeys[i]][startend[f]]);
		div.style.left=o.x-div.clientWidth/2+"px";
		div.style.top=o.y-div.clientHeight/2+"px";
		}
		else if(dataKeys[d]=="delta"){
			o=minutesToXY_OIC(data[dataKeys[d]][countKeys[i]].start,120);
			div=document.getElementById('timeHandles'+dataKeys[d]+countKeys[i]+"start");
			div.innerHTML=minutesToClock(data[dataKeys[d]][countKeys[i]].start);
			div.style.left=o.x-div.clientWidth/2+"px";
			div.style.top=o.y-div.clientHeight/2+"px";
			
		}
		//descriptionText
		o=minutesToXY_OIC(middlepoint,130);
		if(dataKeys[d]=="alfa"){
		div=document.getElementById('descriptionText'+dataKeys[d]+countKeys[i]);
		div.innerHTML=data[dataKeys[d]][countKeys[i]].desc;
		div.style.left=o.x-div.clientWidth/2+"px";
		div.style.top=o.y-div.clientHeight/2+"px";
		}else{

		}
	}
}
}
function drawStackedDescriptionText(){
dataKeys=["charlie","delta"];
for(d=0;d<dataKeys.length;d++){
	for(i=0;i<stack[dataKeys[d]].length;i++){
		//ok, denne er litt på kanten lars. her har jeg brukt litt omvendt sykologi. heheheh
		count=stack[dataKeys[d]][i][1];
		duration=range(data[dataKeys[d]][count].start,data[dataKeys[d]][count].end);
		middlepoint=calc(data[dataKeys[d]][count].start,(duration/2));
		div=document.getElementById('descriptionText'+dataKeys[d]+count);
		if(dataKeys[d]=="charlie"){
		div.innerHTML="Core";
		o=minutesToXY_OIC(middlepoint,120);
		}
		else{
		div.innerHTML="Nap";
		o=minutesToXY_OIC(middlepoint,140);
		}div.style.left=o.x-div.clientWidth/2+"px";
		div.style.top=o.y-div.clientHeight/2+"px";
	}
}

}








initialize();

canvasRound=0;
cores=0;
naps=0;

window.render = function() {
canvasRound++;
keys=Object.keys(data.charlie);
clearCanvas();
drawAlfa();
drawCharlie();
drawDelta();


drawHandles();
drawOpacityCircle(sirkel3,0.8);

drawTimeHandles();
drawStackedDescriptionText(); //MÅ FIKSAST
if(canvasRound%8==0)
statistics();

if(cores!=Object.keys(data.charlie).length||naps!=Object.keys(data.delta).length){
	changeActiveSchedule();
	cores=Object.keys(data.charlie).length;
	naps=Object.keys(data.delta).length;
}

//asdfasdf
if(debugging)
debuggerScript();

      requestAnimationFrame(render);
   };
    render();
	


});