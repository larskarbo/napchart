$(document).ready(function(){
window.center=helpers.totalWidth(50);

window.draw=(function(){
	//private inside function
	defaultstrokecolor="#C9C9C9";
	impstrokecolor="#262626";
	canvasCont=document.getElementById("canvasCont");
	mainCont=document.getElementById("main_content");
	rightPanel=document.getElementById("controlPanelColumn");
	leftPanel=document.getElementById("leftColumn");

	//functions used by draw.initialize()
	function drawLines(ctx){
		ctx.save();
		ctx.strokeStyle=defaultstrokecolor;
		ctx.beginPath();
		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
		for(i=0;i<12;i++){
			c=minutesToXY(i*60);
			ctx.moveTo(c.x,c.y);
			c=minutesToXY(i*60+720);
			ctx.lineTo(c.x,c.y);
		}	
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
		console.info('drawLines() success')
	}

	function drawImpLines(ctx){
		ctx.save();
		ctx.translate(helpers.totalWidth(50),helpers.totalWidth(50));
		ctx.beginPath();
		ctx.strokeStyle=impstrokecolor;
		c=minutesToXY(0);
		ctx.moveTo(c.x,c.y);
		c=minutesToXY(720);
		ctx.lineTo(c.x,c.y);
		c=minutesToXY(240);
		ctx.moveTo(c.x,c.y);
		c=minutesToXY(960);
		ctx.lineTo(c.x,c.y);
		c=minutesToXY(480);
		ctx.moveTo(c.x,c.y);
		c=minutesToXY(1200);
		ctx.lineTo(c.x,c.y);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();	
		console.info('drawImpLines() success');
	}

	function drawCircles(ctx){
		ctx.beginPath();
		ctx.arc(senter, senter, helpers.totalWidth(36), 0, grader(360), false);
		ctx.moveTo(senter+sirkel3,helpers.totalWidth(50));
		ctx.arc(senter, senter, helpers.totalWidth(29), 0, grader(360), false);
		ctx.moveTo(senter+sirkel1p5,helpers.totalWidth(50));
		ctx.arc(senter, senter, sirkel1p5, 0, grader(360), false);
		ctx.moveTo(senter+sirkel1,helpers.totalWidth(50));
		ctx.arc(senter, senter, sirkel1, 0, grader(360), false);
		ctx.closePath();
		ctx.strokeStyle=defaultstrokecolor;
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(senter, senter,helpers.totalWidth(29), 0, grader(360), false);
		ctx.closePath();
		ctx.strokeStyle="#BABABA";
		ctx.stroke();
		console.info('drawCircles() success');
	}

	function drawClockNumbers(ctx){
		impfontpixels=helpers.currentProp()*20;
		ctx.fillStyle="black";
		numberRadius=helpers.totalWidth(44);
		ctx.font=impfontpixels+"px Verdana";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.fillStyle="#262626";
		for(i=0;i<24;i++){
			if(i==0||i==4||i==16||i==20||i==8||i==12){
			degrees=(grader((15*i)+270));
			xval=helpers.totalWidth(50)+Math.cos(degrees)*numberRadius;
			yval=helpers.totalWidth(50)+Math.sin(degrees)*numberRadius;
			if(i==0)
			ctx.fillText("0",xval,yval);
			else if(i==12)
			ctx.fillText("12",xval,yval);
			else
			ctx.fillText(i,xval,yval);
		}}
		console.info('drawClockNumbers() success');
	}

	function clearClockCircle(ctx,radius){
		ctx.save();
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.arc(senter,senter,radius,0,grader(360), false);
		ctx.lineTo(senter,senter);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		console.info('clearClockCircle() success');
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
		});}
	}

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
		});}
	}

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
		ctx.restore();
		ctx.beginPath();
		ctx.arc(senter, senter,sirkel3,klokkegrader(data['delta'][i].start-2),klokkegrader(data['delta'][i].end+2), false);
		f=minutesToXY_OIC(data.delta[i].end,73);
		ctx.lineTo(senter,senter);
		ctx.fillStyle=color["delta"];
		ctx.fill();
		});}
	}

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
	}

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

	return { //exposed to public
		initialize:function(context){
			// the initialize function draws the background clock to an off-screen canvas.
			// This increases performance because the browser doesn't need to redraw everything, every frame
			
			canvas=context.canvas;
			ctx=context;

			window.clockWidth=canvas.clientHeight;
			window.clockBasepoint=(canvas.clientWidth-clockWidth)/2;
			
			radius=helpers.totalWidth(40);
			sirkel1=helpers.totalWidth(2);
			sirkel1p5=helpers.totalWidth(20);
			sirkel2=helpers.totalWidth(26);
			sirkel3=helpers.totalWidth(29);
			sirkel3p5=helpers.totalWidth(32.5);
			sirkel4=helpers.totalWidth(36);
			window.center=helpers.totalWidth(50);
			senter=helpers.totalWidth(50);
			supportNumbers=helpers.currentProp()*11;
			durationNumbers=helpers.currentProp()*16;
			
			//draw clock
			drawLines(ctx);
			clearClockCircle(ctx,sirkel1p5);
			drawCircles(ctx);
			drawImpLines(ctx);
			drawClockNumbers(ctx);
				
			//canvasCont.style.height=canvasCont.clientWidth+"px";
				console.log(mainCont.clientHeight);
			//rightPanel.style.height=mainCont.clientHeight-10+"px";
			//leftPanel.style.height=mainCont.clientHeight-10+"px";
		},
		drawFrame:function(){
			clearCanvas();
			drawAlfa();
			drawCharlie();
			drawDelta();
			//drawHandles();
			//drawOpacityCircle(sirkel3,0.8);
			//drawTimeHandles();
			//drawStackedDescriptionText(); //MÅ FIKSAST
		}
	}
}());


draw.initialize(document.getElementById("canvas").getContext('2d'));

window.render = function() {
canvasRound++;
keys=Object.keys(data.charlie);

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
    //render();
	


});