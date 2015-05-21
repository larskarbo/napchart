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

	barConfig = { //used for defining the radius and color of bars
	core:{
		stack:0,
		color:"#c70e0e",
		innerRadius:29,
		outerRadius:40,
		stroke:{
			lineWidth:2
		}
	},
	nap:{
		stack:1,
		color:"#c70e0e",
		innerRadius:29,
		outerRadius:40,
		stroke:{
			lineWidth:2
		}
	},
	busy:{
		stack:2,
		color:"#1f1f1f",
		innerRadius:29,
		outerRadius:36,
		stroke:{
			lineWidth:2
		}
	}
	}

	clockConfig = { // define how the background clock should be drawn
		circles:[
		{radius:36},
		{radius:29},
		{radius:20},
		{radius:2}
		],
		blurCircle:{
				radius:29,
				opacity:0.6
			}
		}

	// (also private) functions used by draw.initialize()
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
		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
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

		var circles=clockConfig.circles;
		ctx.strokeStyle=defaultstrokecolor;

		for(i=0;i<circles.length;i++){
			ctx.beginPath();
			ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,circles[i].radius*draw.ratio,0, grader(360));
			ctx.stroke();
		}
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

	function drawBars(ctx,data){
		data=[
		{
			name:"core",
			data:[
			{
				start:120,
				end:330
			},
			{
				start:360,
				end:450
			}
			]
		},
		{
			name:"nap",
			data:[
			{
				start:960,
				end:980
			}
			]
		},
		{
			name:"busy",
			data:[
			{
				start:598,
				end:844
			}
			]
		}
		];
		ctx.save();
		console.log(data.length);

		for (var i = 0; i < data.length; i++) {
			console.log("barname: ",data[i].name);
			var innerRadius = barConfig[data[i].name].innerRadius*draw.ratio;
			var outerRadius = barConfig[data[i].name].outerRadius*draw.ratio;
			console.log("color :", barConfig[data[i].name].color)
			ctx.fillStyle=barConfig[data[i].name].color;
			console.log(ctx.lineJoin)

			for (var f = 0; f < data[i].data.length; f++){
				var startRadians=helpers.minutesToRadians(data[i].data[f].start);
				var endRadians=helpers.minutesToRadians(data[i].data[f].end);
				var lineToXY=helpers.minutesToXY_OIC(data[i].data[f].end,innerRadius);

				ctx.beginPath();
				ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
				ctx.lineTo(lineToXY.x+canvas.width/2,lineToXY.y+canvas.height/2);
				ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
				ctx.closePath();

				if(mdown.barHolder=="charlie"&&mdown.count==0)
				ctx.globalAlpha=0.6;
				//else if(ctx.isPointInPath(mx,my))
				//ctx.globalAlpha=0.5;
				else
				ctx.globalAlpha=0.6;

				ctx.fill();

					
			}
		};
		ctx.restore();
	}
	function strokeBars(ctx){
		data=[
		{
			name:"core",
			data:[
			{
				start:120,
				end:330
			},
			{
				start:360,
				end:450
			}
			]
		},
		{
			name:"nap",
			data:[
			{
				start:960,
				end:980
			}
			]
		},
		{
			name:"busy",
			data:[
			{
				start:598,
				end:844
			}
			]
		}
		];
		ctx.save();
		ctx.lineJoin = 'mittel';
		for (var i = 0; i < data.length; i++) {
			if(typeof barConfig[data[i].name].stroke=="undefined")
				continue;
			ctx.lineWidth=barConfig[data[i].name].stroke.lineWidth;
			var innerRadius = barConfig[data[i].name].innerRadius*draw.ratio;
			var outerRadius = barConfig[data[i].name].outerRadius*draw.ratio;
			var blurRadius = clockConfig.blurCircle.radius*draw.ratio;
			if(innerRadius<blurRadius)
				innerRadius = blurRadius;
			ctx.strokeStyle=barConfig[data[i].name].color;

			for (var f = 0; f < data[i].data.length; f++){
				var startRadians=helpers.minutesToRadians(data[i].data[f].start);
				var endRadians=helpers.minutesToRadians(data[i].data[f].end);
				ctx.beginPath();
				ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
				ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
				ctx.closePath();
				ctx.stroke();

				}

			}
		ctx.restore();
		}
	function drawBlurCircle(ctx){
		ctx.save();
		ctx.fillStyle=draw.backgroundColor;
		ctx.globalAlpha=clockConfig.blurCircle.opacity;
		ctx.beginPath();
		ctx.arc(senter,senter,clockConfig.blurCircle.radius*draw.ratio,0,grader(360), false);
		ctx.fill();
		ctx.restore();
		console.info('drawBlurCircle() success');
	}
	function drawAlfa(ctx){
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
		console.info('drawAlfa() success');
	}

	function drawCharlie(ctx){

		if (typeof data.charlie != 'undefined'){
		$.each(data.charlie,function(i){
		ctx.beginPath();
		ctx.arc(senter, senter, totalWidth(40),klokkegrader(data.charlie[i].start),klokkegrader(data.charlie[i].end), false);
		f=minutesToXY_OIC(data.charlie[i].end,73);
		ctx.lineTo(f.x,f.y);
		ctx.arc(senter, senter, sirkel3,klokkegrader(data.charlie[i].end),klokkegrader(data.charlie[i].start), true);
		ctx.save();
		ctx.fillStyle=color["charlie"];
		ctx.fill();
		ctx.restore();
		ctx.beginPath();
		ctx.arc(senter, senter, sirkel3,klokkegrader(data.charlie[i].start),klokkegrader(data.charlie[i].end), false);
		ctx.lineTo(senter,senter);
		ctx.fillStyle=color["charlie"];
		ctx.fill();
		});}
		console.info('drawCharlie() success');

	}

	function drawDelta(ctx){
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
		console.info('drawDelta() success');
	}

	function clearCircle(ctx,radius){
		ctx.save();
		ctx.globalCompositeOperation = 'destination-out'
		ctx.beginPath();
		ctx.arc(senter,senter,radius,0,grader(360), false);
		ctx.fill();
		ctx.restore();
		console.info('clearCircle() success');
	}


	function drawHandles(ctx){
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
		console.info('drawHandles() success');
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
		initialize:function(canvas){
			// the initialize function draws the background clock to an off-screen canvas.
			// This increases performance because the browser doesn't need to redraw everything, every frame
			offScreenCanvas=document.createElement('canvas');
			offScreenCanvas.height=400;
			offScreenCanvas.width=400;
			octx=offScreenCanvas.getContext('2d');

			window.clockWidth=offScreenCanvas.clientHeight;
			window.clockBasepoint=(offScreenCanvas.clientWidth-clockWidth)/2;

			var clockWidth=400;
			this.ratio=clockWidth/100;
			this.backgroundColor="#F4F4F4";

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
			drawLines(octx);
			clearClockCircle(octx,sirkel1p5);
			drawCircles(octx);
			drawImpLines(octx);
			drawClockNumbers(octx);
			//saves to a variable used in drawFrame()
			this.cachedBackground=offScreenCanvas;
			
		},
		drawFrame:function(ctx){
			console.log(canvas);
			ctx.clearRect(0,0,canvas.width,canvas.height);
			if(typeof this.cachedBackground=="undefined")
			throw new Error("Could not find the initialized off-screen canvas. Try running draw.initialize()")
			cachedBackground=this.cachedBackground;


			
			ctx.drawImage(cachedBackground,0,0);

			drawBars(ctx,data);

			if(typeof clockConfig.blurCircle != "undefined")
			drawBlurCircle(ctx);
			strokeBars(ctx);

			//drawHandles(ctx);
			//drawTimeHandles();
			//drawStackedDescriptionText(); //MÅ FIKSAST
		}
	}
}());


draw.initialize(document.getElementById("canvas"));
addInputBox("Sleep");
addInputBox("Sleep");
addInputBox("Nap");
draw.drawFrame(document.getElementById("canvas").getContext("2d"));


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