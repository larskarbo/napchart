$(document).ready(function(){

window.draw=(function(){
	//private inside function
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
		},
		rangeHandles:true,
		opacity:0.6,
		hoverOpacity:0.5,
		activeOpacity:0.2
	},
	nap:{
		stack:1,
		color:"#c70e0e",
		innerRadius:29,
		outerRadius:40,
		stroke:{
			lineWidth:2
		},
		opacity:0.6,
		hoverOpacity:0.5,
		activeOpacity:0.2
	},
	busy:{
		stack:2,
		color:"#1f1f1f",
		innerRadius:29,
		outerRadius:36,
		stroke:{
			lineWidth:2
		},
		rangeHandles:true,
		opacity:0.6,
		hoverOpacity:0.5,
		activeOpacity:0.2
	}
	}

	clockConfig = { // define how the background clock should be drawn
		circles:[
		{radius:36},
		{radius:29},
		{radius:20},
		{radius:2}
		],
		clearCircle: 20,
		blurCircle:{
				radius:29,
				opacity:0.8
			},
		strokeColor:"#C9C9C9",
		impStrokeColor:"#262626"

		}

	// (also private) functions used by draw.initialize()
	function drawLines(ctx){
		var radius=40*draw.ratio;
		ctx.save();
		ctx.strokeStyle=clockConfig.strokeColor;
		ctx.beginPath();
		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
		for(i=0;i<12;i++){
			c=helpers.minutesToXY(i*60,radius);
			ctx.moveTo(c.x,c.y);
			c=helpers.minutesToXY(i*60+720,radius);
			ctx.lineTo(c.x,c.y);
		}	
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	}

	function drawImpLines(ctx){
		var radius=40*draw.ratio;
		ctx.save();
		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
		ctx.beginPath();
		ctx.strokeStyle=clockConfig.impStrokeColor;

		c=helpers.minutesToXY(0,radius);
		ctx.moveTo(c.x,c.y);
		c=helpers.minutesToXY(720,radius);
		ctx.lineTo(c.x,c.y);
		c=helpers.minutesToXY(240,radius);
		ctx.moveTo(c.x,c.y);
		c=helpers.minutesToXY(960,radius);
		ctx.lineTo(c.x,c.y);
		c=helpers.minutesToXY(480,radius);
		ctx.moveTo(c.x,c.y);
		c=helpers.minutesToXY(1200,radius);
		ctx.lineTo(c.x,c.y);
		ctx.closePath();
		ctx.stroke();
		ctx.restore();		
}

	function drawCircles(ctx){

		var circles=clockConfig.circles;
		ctx.strokeStyle=clockConfig.strokeColor;

		for(i=0;i<circles.length;i++){
			ctx.beginPath();
			ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,circles[i].radius*draw.ratio,0, 2*Math.PI);
			ctx.stroke();
		}
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
			degrees=(helpers.degreesToRadiens((15*i)+270));
			xval=helpers.totalWidth(50)+Math.cos(degrees)*numberRadius;
			yval=helpers.totalWidth(50)+Math.sin(degrees)*numberRadius;
			if(i==0)
			ctx.fillText("0",xval,yval);
			else if(i==12)
			ctx.fillText("12",xval,yval);
			else
			ctx.fillText(i,xval,yval);
		}}
	}

	function clearClockCircle(ctx,radius){
		ctx.save();
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.arc(senter,senter,radius,0,2*Math.PI, false);
		ctx.lineTo(senter,senter);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	function drawBars(ctx,data){
		var mouse = directInput.getCanvasMousePosition(),
		hoverElements = [];

		ctx.save();
		for (name in data){
			var innerRadius = barConfig[name].innerRadius*draw.ratio,
			outerRadius = barConfig[name].outerRadius*draw.ratio,
			opacity = barConfig[name].opacity,
			hoverOpacity = barConfig[name].hoverOpacity,
			activeOpacity = barConfig[name].activeOpacity;

			ctx.fillStyle=barConfig[name].color;

			for (var i = 0; i < data[name].length; i++){
				var startRadians=helpers.minutesToRadians(data[name][i].start);
				var endRadians=helpers.minutesToRadians(data[name][i].end);
				var lineToXY=helpers.minutesToXY_OIC(data[name][i].end,innerRadius);

				ctx.beginPath();
				ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
				ctx.lineTo(lineToXY.x+canvas.width/2,lineToXY.y+canvas.height/2);
				ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
				ctx.closePath();

				if(ctx.isPointInPath(mouse.x,mouse.y)){
					ctx.globalAlpha=hoverOpacity;
					hoverElements.push({name:name,count:i})
				}
				else
					ctx.globalAlpha=opacity;

				ctx.fill();

					
			}
			//notify directInput module about which elements are being
			//hovered. Used hit detection
			directInput.setHoverElements(hoverElements);
		}
		for (var i = 0; i < data.length; i++) {};
		ctx.restore();
	}

	function strokeBars(ctx,data){
		ctx.save();
		ctx.lineJoin = 'mittel';
		for (var name in data){
			if(typeof barConfig[name].stroke=="undefined")
				continue;
			ctx.lineWidth=barConfig[name].stroke.lineWidth;
			var innerRadius = barConfig[name].innerRadius*draw.ratio;
			var outerRadius = barConfig[name].outerRadius*draw.ratio;
			var blurRadius = clockConfig.blurCircle.radius*draw.ratio;
			if(innerRadius<blurRadius)
				innerRadius = blurRadius;
			ctx.strokeStyle=barConfig[name].color;

			for (var i = 0; i < data[name].length; i++){
				var startRadians=helpers.minutesToRadians(data[name][i].start);
				var endRadians=helpers.minutesToRadians(data[name][i].end);
				ctx.beginPath();
				ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
				ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
				ctx.closePath();
				ctx.stroke();

				}

			}
		ctx.restore();
		}

	function drawShadows(ctx,data){
		ctx.save();
		for (var name in data) {
			var innerRadius = 0;
			var outerRadius = barConfig[name].innerRadius*draw.ratio;
			ctx.fillStyle=barConfig[name].color;

			for (var i = 0; i < data[name].length; i++){
				var startRadians=helpers.minutesToRadians(data[name][i].start);
				var endRadians=helpers.minutesToRadians(data[name][i].end);
				var lineToXY=helpers.minutesToXY_OIC(data[name][i].end,innerRadius);

				ctx.beginPath();
				ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
				ctx.lineTo(lineToXY.x+canvas.width/2,lineToXY.y+canvas.height/2);
				ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
				ctx.closePath();

				ctx.globalAlpha=0.1;

				ctx.fill();

					
			}
		};
		ctx.restore();
	
	}

	function drawBlurCircle(ctx){
		ctx.save();
		ctx.fillStyle=draw.backgroundColor;
		ctx.globalAlpha=clockConfig.blurCircle.opacity;
		ctx.beginPath();
		ctx.arc(senter,senter,clockConfig.blurCircle.radius*draw.ratio,0,2*Math.PI, false);
		ctx.fill();
		ctx.restore();
	}

	function clearCircle(ctx,radius){
		ctx.save();
		ctx.globalCompositeOperation = 'destination-out'
		ctx.beginPath();
		ctx.arc(senter,senter,radius,0,grader(360), false);
		ctx.fill();
		ctx.restore();
	}


	function drawHandles(ctx,data){
		ctx.save();

		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
		for (var name in data) {
			if(typeof barConfig[name].rangeHandles == 'undefined' || !barConfig[name].rangeHandles)
				continue;

			for (var i = 0; i < data[name].length; i++){
				for(s=0;s<2;s++){
					var point=helpers.minutesToXY(data[name][i][['start','end'][s]], barConfig[name].outerRadius*draw.ratio);

					ctx.fillStyle = 'white';
					ctx.beginPath();
					ctx.arc(point.x,point.y,1*draw.ratio,0, 2 * Math.PI, false);
					ctx.fill();
					
					ctx.fillStyle = barConfig[name].color;
					ctx.beginPath();
					ctx.arc(point.x,point.y,0.7*draw.ratio,0, 2 * Math.PI, false);
					ctx.fill();
				}
			}
		}
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
			offScreenCanvas.height=canvas.width;
			offScreenCanvas.width=canvas.width;
			octx=offScreenCanvas.getContext('2d');

			window.clockWidth=offScreenCanvas.height;
			window.clockBasepoint=(offScreenCanvas.clientWidth-clockWidth)/2;

			var clockWidth=offScreenCanvas.width;
			this.ratio=clockWidth/100;
			this.backgroundColor="#F4F4F4";
			this.ctx=canvas.getContext("2d");

			window.center=helpers.totalWidth(50);
			senter=helpers.totalWidth(50);
			supportNumbers=helpers.currentProp()*11;
			durationNumbers=helpers.currentProp()*16;
			
			//draw clock
			drawLines(octx);
			clearClockCircle(octx,clockConfig.clearCircle*draw.ratio);
			drawCircles(octx);
			drawImpLines(octx);
			drawClockNumbers(octx);
			//saves to a variable used in drawFrame()
			this.cachedBackground=offScreenCanvas;
			
		},
		drawFrame:function(data){
			if(typeof data=='undefined')
				throw new Error("drawFrame did not receive data in argument")
			ctx=draw.ctx;
			ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			if(typeof this.cachedBackground=="undefined")
			throw new Error("Could not find the initialized off-screen canvas. Try running draw.initialize()")
			cachedBackground=this.cachedBackground;

			ctx.drawImage(cachedBackground,0,0);
			drawBars(ctx,data);

			if(typeof clockConfig.blurCircle != "undefined")
			drawBlurCircle(ctx);
			strokeBars(ctx,data);
			drawShadows(ctx,data);
			drawHandles(ctx,data);
		},
		drawUpdate:function(){
			data = napchartCore.getSchedule();
			draw.drawFrame(data);
		}
	}
}());

sampleSchedule.initialize(document.getElementById('sampleSchedules'),'schedule');
directInput.initialize(document.getElementById("canvas"));
draw.initialize(document.getElementById("canvas"));
draw.drawUpdate();


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