$(document).ready(function(){

window.draw=(function(){
	//private inside function

	// used when calling drawUpdate()
	var lastData = {};

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
		activeOpacity:0.5,
		selected:{
			strokeColor:'#FF6363',
			lineWidth:1,
			expand:0.5
		}
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
		activeOpacity:0.5,
		selected:{
			strokeColor:'grey',
			lineWidth:1,
			expand:0.5
		}
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
		activeOpacity:0.5,
		selected:{
			strokeColor:'#FF6363',
			lineWidth:1,
			expand:0.5
		}
	}
	};

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

		};

	function removeOverlapping(data,inferior,superior){
		//this function will prevent two bars from overlapping
		//if they overlap, the superior wins
		var startInf, endInf, startSup, endSup, startIsInside, endIsInside, newData, trim;

		//clone data object
		var data = JSON.parse(JSON.stringify(data));
		
		//if there are no inferior elements, return
		if(typeof data[inferior] == 'undefined' || data[inferior].length == 0)
			return data;

		//if there are no superior elements, return
		if(typeof data[superior] == 'undefined' || data[superior].length == 0)
			return data;

		//iterate inferior elements
		var length = data[inferior].length; //we dont want do iterate array elements that are dynamically added inside the loop
		for(var i = 0; i < length; i++){
			startInf = data[inferior][i].start;
			endInf = data[inferior][i].end;
			trim = [];

			//iterate superior elements
			for(var f = 0; f < data[superior].length; f++){
				startSup = data[superior][f].start;
				endSup = data[superior][f].end;

				startIsInside = helpers.pointIsInside(startSup,startInf,endInf);
				endIsInside = helpers.pointIsInside(endSup,startInf,endInf);

				if(startIsInside || endIsInside){
					if(startIsInside && endIsInside){
						//make some extra room if whole element is inside
						startSup = helpers.calc(startSup,-10);
						endSup = helpers.calc(endSup,10);
					}

					trim.push({
						start:startSup,
						end:endSup
					})
				}
			}
			if(trim.length > 0){
				trim=trim.sort(function(a, b){
				 return a.start-b.start
				})
				var trimmed = [data[inferior][i]];
				for(var t = 0; t<trim.length; t++){
					var start, end;
					var last = trimmed.length-1;

					start = trimmed[last].start;
					end = trimmed[last].end;

					var startIsInside = helpers.pointIsInside(trim[t].start,start,end);
					var endIsInside = helpers.pointIsInside(trim[t].end,start,end);
					if(startIsInside && endIsInside){

						//split
						trimmed[last] = {
							start:start,
							end:trim[t].start
						};
						trimmed.push({
							start:trim[t].end,
							end:end
						})
					}
					else if(startIsInside){
						trimmed[last] = {
							start:start,
							end:trim[t].start
						};
					}
					else if(endIsInside){
						trimmed[last] = {
							start:trim[t].end,
							end:end
						};
					}
				}
				//set the original element empty and set all the new ones to point to the old
				data[inferior][i]={};
				for(t=0; t<trimmed.length; t++){
					trimmed[t].phantom = i;
				}

				data[inferior] = data[inferior].concat(trimmed);
			}
		
		}

		return data;
		
	}
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
		var width = ctx.canvas.width;
		var height = ctx.canvas.height;

		impfontpixels=5*draw.ratio;
		ctx.fillStyle="black";
		numberRadius=44*draw.ratio//helpers.totalWidth(44);
		ctx.font=impfontpixels+"px Verdana";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.fillStyle="#262626";

		for(i=0;i<24;i++){
			if(i===0||i==4||i==16||i==20||i==8||i==12){
			degrees=(helpers.degreesToRadiens((15*i)+270));
			xval=width/2+Math.cos(degrees)*numberRadius;
			yval=height/2+Math.sin(degrees)*numberRadius;
			if(i===0)
			ctx.fillText("0",xval,yval);
			else if(i==12)
			ctx.fillText("12",xval,yval);
			else
			ctx.fillText(i,xval,yval);
		}}
	}

	function clearClockCircle(ctx,radius){
		var width = ctx.canvas.width;
		var height = ctx.canvas.height;

		ctx.save();
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.arc(width/2,height/2,radius,0,2*Math.PI, false);
		ctx.lineTo(width/2,height/2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	function drawBars(ctx,data){
		var canvas = ctx.canvas,
		mouse = directInput.getCanvasMousePosition(canvas),
		mouseHover = {};

		ctx.save();
		for (var name in data){
			var innerRadius = barConfig[name].innerRadius*draw.ratio,
			outerRadius = barConfig[name].outerRadius*draw.ratio,
			opacity = barConfig[name].opacity,
			hoverOpacity = barConfig[name].hoverOpacity,
			activeOpacity = barConfig[name].activeOpacity;

			ctx.fillStyle=barConfig[name].color;

			for (var i = 0; i < data[name].length; i++){
				var startRadians=helpers.minutesToRadians(data[name][i].start);
				var endRadians=helpers.minutesToRadians(data[name][i].end);
				var lineToXY=helpers.minutesToXY(data[name][i].end,innerRadius);
				var count;

				if(typeof data[name][i].phantom != 'undefined'){
					count = data[name][i].phantom;
				}else{
					count = i;
				}

				ctx.beginPath();
				ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
				ctx.lineTo(lineToXY.x+canvas.width/2,lineToXY.y+canvas.height/2);
				ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
				ctx.closePath();

				if(ctx.isPointInPath(mouse.x,mouse.y)){
					mouseHover = {name:name,count:count,type:'whole'};
				}
			
				if(directInput.isActive(name,count,'whole') || directInput.isSelected(name,count)){
					ctx.globalAlpha = activeOpacity;
				}

				else if(directInput.isActive(name,count) || (ctx.isPointInPath(mouse.x,mouse.y) && directInput.isHover(name,count)) || directInput.isHover(name,count,'whole')){
					ctx.globalAlpha=hoverOpacity;
				}

				else{
					ctx.globalAlpha=opacity;
				}
				ctx.fill();

			}
		}
		//notify directInput module about which elements are being
		//hovered. Used for hit detection
		if(directInput.mouseIsOverCanvas()){
			directInput.setHoverElement(mouseHover);
		}

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

				var count = i;

				if(!directInput.isActive(name,count) && !directInput.isSelected(name,count))
					continue;

				ctx.save();
				var startRadians=helpers.minutesToRadians(data[name][count].start);
				var endRadians=helpers.minutesToRadians(data[name][count].end);
				var lineToXY=helpers.minutesToXY(data[name][count].end,innerRadius);
				ctx.beginPath();
				ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
				ctx.lineTo(lineToXY.x+canvas.width/2,lineToXY.y+canvas.height/2);
				ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
				ctx.closePath();
				ctx.globalAlpha=0.1*ctx.globalAlpha;

				ctx.fill();
				ctx.restore();

					
			}
		}
		ctx.restore();
	
	}

	function drawBlurCircle(ctx){
		var width = ctx.canvas.width;
		var height = ctx.canvas.height;

		ctx.save();
		ctx.fillStyle=draw.backgroundColor;
		ctx.globalAlpha=clockConfig.blurCircle.opacity;
		ctx.beginPath();
		ctx.arc(width/2,height/2,clockConfig.blurCircle.radius*draw.ratio,0,2*Math.PI, false);
		ctx.fill();
		ctx.restore();
	}

	function clearCircle(ctx,radius){
		var width = ctx.canvas.width;
		var height = ctx.canvas.height;

		ctx.save();
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.arc(width/2,height/2,radius,0,grader(360), false);
		ctx.fill();
		ctx.restore();
	}

	function drawSelected(ctx,data){
		var selected = directInput.returnSelected();
		if(typeof selected.name == 'undefined'){
			return;
		}

		var name, count, stroke, lineWidth, innerRadius, expand, outerRadius, startRadians, endRadians;
		name = selected.name;
		count = selected.count;
		strokeColor = barConfig[name].selected.strokeColor;
		lineWidth = barConfig[name].selected.lineWidth*draw.ratio;
		expand = barConfig[name].selected.expand;
		innerRadius = barConfig[name].innerRadius*draw.ratio - expand;
		outerRadius = barConfig[name].outerRadius*draw.ratio + expand;
		startRadians=helpers.minutesToRadians(data[name][count].start - expand);
		endRadians=helpers.minutesToRadians(data[name][count].end + expand);

		ctx.save();

		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeColor;
		ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
		ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
		ctx.closePath();
		ctx.stroke();

		ctx.restore();
	}

	function drawHandles(ctx,data){
		var outerColor, innerColor;
		ctx.save();

		ctx.translate(ctx.canvas.width/2,ctx.canvas.height/2);
		for (var name in data) {
			if(typeof barConfig[name].rangeHandles == 'undefined' || !barConfig[name].rangeHandles)
				continue;

			for (var i = 0; i < data[name].length; i++){

				var element = data[name][i],
				count = i;
				

				if(!directInput.isSelected(name,count))
					continue;

				for(s=0;s<2;s++){
					var point=helpers.minutesToXY(element[['start','end'][s]], barConfig[name].outerRadius*draw.ratio);

					if(directInput.isActive(name,i,['start','end'][s])){
						outerColor = 'red';
						innerColor = 'green';
					}
					else if(directInput.isHover(name,i,['start','end'][s]) && !directInput.isActive(name,i)){
						outerColor = 'white';
						innerColor = 'blue';
					}else{
						outerColor = 'white';
						innerColor = barConfig[name].color;
					}
					ctx.fillStyle = outerColor;
					ctx.beginPath();
					ctx.arc(point.x,point.y,1*draw.ratio,0, 2 * Math.PI, false);
					ctx.fill();

					
					ctx.fillStyle = innerColor;
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
				throw new Error("drawFrame did not receive data in argument");
			var dataWithPhantoms;

			//clone data object
			data = JSON.parse(JSON.stringify(data));

			// remove overlapping of nap and busy bars
			// this will be used for some functions, while other functions use data
			dataWithPhantoms = removeOverlapping(data,'busy','nap');

			//lastData = data;
			ctx=draw.ctx;
			ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			if(typeof this.cachedBackground=="undefined")
				throw new Error("Could not find the initialized off-screen canvas. Try running draw.initialize()");
			cachedBackground=this.cachedBackground;

			ctx.drawImage(cachedBackground,0,0);
			drawBars(ctx,dataWithPhantoms);

			if(typeof clockConfig.blurCircle != "undefined")
			drawBlurCircle(ctx);
			drawSelected(ctx,dataWithPhantoms);
			strokeBars(ctx,dataWithPhantoms);

			ctx.save();
			ctx.globalAlpha=directInput.getSelectedOpacity();
			drawShadows(ctx,data);
			drawHandles(ctx,data);
			ctx.restore();

		},
		drawUpdate:function(){
			data = napchartCore.getSchedule();//soon draw.getLastData();
			draw.drawFrame(data);
		},

		getBarConfig:function(){
			return JSON.parse(JSON.stringify(barConfig));
		}
	};
}());

napchartCore.initialize();


window.render = function() {
canvasRound++;
keys=Object.keys(data.charlie);

if(canvasRound%8===0)
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