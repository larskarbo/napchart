
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
		},
		general:{
			textSize:4
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
		stroke:0.32,
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
					//make some extra room
					startSup = helpers.calc(startSup,-10);
					endSup = helpers.calc(endSup,10);

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
		ctx.lineWidth = clockConfig.stroke *draw.ratio;
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
		ctx.lineWidth = clockConfig.stroke *draw.ratio;

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

		ctx.lineWidth = clockConfig.stroke *draw.ratio;

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
			var canvas = ctx.canvas;

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


					if(interactCanvas.isActive(name,count,'whole') || napchartCore.isSelected(name,count)){
						ctx.globalAlpha = activeOpacity;
					}

					else if(interactCanvas.isActive(name,count) || interactCanvas.isHover(name,count,'whole')){
						ctx.globalAlpha=hoverOpacity;
					}

					else{
						ctx.globalAlpha=opacity;
					}
					ctx.fill();

				}
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

				if(!interactCanvas.isActive(name,count) && !napchartCore.isSelected(name,count))
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

	function drawBlurCircle(ctx,backgroundColor){
		var width = ctx.canvas.width;
		var height = ctx.canvas.height;

		ctx.save();
		ctx.fillStyle=backgroundColor;
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
		// this should loop through all selected elements instead
		// var selected = napchartCore.returnSelected();
		// if(typeof selected.name == 'undefined'){
		// 	return;
		// }

		// var name, count, stroke, lineWidth, innerRadius, expand, outerRadius, startRadians, endRadians;
		// name = selected.name;
		// count = selected.count;
		// strokeColor = barConfig[name].selected.strokeColor;
		// lineWidth = barConfig[name].selected.lineWidth*draw.ratio;
		// expand = barConfig[name].selected.expand;
		// innerRadius = barConfig[name].innerRadius*draw.ratio - expand;
		// outerRadius = barConfig[name].outerRadius*draw.ratio + expand;
		// startRadians=helpers.minutesToRadians(data[name][count].start - expand);
		// endRadians=helpers.minutesToRadians(data[name][count].end + expand);

		// ctx.save();

		// ctx.beginPath();
		// ctx.lineWidth = lineWidth;
		// ctx.strokeStyle = strokeColor;
		// ctx.arc(canvas.width/2,canvas.height/2,outerRadius,startRadians,endRadians);
		// ctx.arc(canvas.width/2,canvas.height/2,innerRadius,endRadians,startRadians,true);
		// ctx.closePath();
		// ctx.stroke();

		// ctx.restore();
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
				

				if(!napchartCore.isSelected(name,count))
					continue;

				for(s=0;s<2;s++){
					var point=helpers.minutesToXY(element[['start','end'][s]], barConfig[name].outerRadius*draw.ratio);

					if(interactCanvas.isActive(name,i,['start','end'][s])){
						outerColor = 'red';
						innerColor = 'green';
					}
					else if(interactCanvas.isHover(name,i,['start','end'][s]) && !interactCanvas.isActive(name,i)){
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

	function drawDistanceToNearElements(ctx,data,selectedElement,bars){
		// draws the distance to the nearby elements of the selected element
		var array = [], elementPush, selected, before, after;

		if(bars.indexOf(selectedElement.name) == -1)
			return;

		if(!interactCanvas.isActive(selectedElement.name,selectedElement.count))
			return;

		// FIRST - find the elements near the selected element (max one on each side):

		// loop through the bar types specified
		for (var i = 0; i < bars.length; i++){

			if(typeof data[bars[i]] == 'undefined')
				continue;

			//add elements into new array
			for(var f = 0; f < data[bars[i]].length; f++){

				if(typeof data[bars[i]][f] != 'undefined' ){
					elementPush = data[bars[i]][f];

					if(napchartCore.isSelected(bars[i],f)){
						elementPush.selected = true;
					}

					array.push(elementPush);
				}
			}
		}

		//nothing to do if only one element
		if(array.length == 1)
			return;

		//sort array
		array = array.sort(function(a, b){
			return a.start-b.start
		});

		//find out which element in new array is the selected one
		for(var i = 0; i < array.length; i++){
			if(typeof array[i].selected != 'undefined'){
				selected = i;
			}
		}

		//ok, great we have an array with sorted values and know what element is selected
		//then all we have to do is to find the two elements besides the selected element in the array, right?
		before = selected - 1;
		if(before < 0)
			before = array.length - 1;

		after = selected + 1;
		if(after > array.length - 1)
			after = 0;

		//SECOND - find out if they are close enough, then draw
		var radius = 45*draw.ratio;
		var textRadius = 36*draw.ratio;
		var canvas = ctx.canvas;
		var fontSize = barConfig.general.textSize * draw.ratio;

		ctx.save();

		ctx.strokeStyle= '#d2d2d2';
		ctx.lineWidth= 3;
		ctx.font = fontSize + "px verdana";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.globalAlpha = ctx.globalAlpha*0.5;

		//push start and endpoints to draw array
		var drawArr = [];
		drawArr.push({
			start:array[before].end,
			end:array[selected].start
		});
		drawArr.push({
			start:array[selected].end,
			end:array[after].start
		});

		drawArr.forEach(function(element){
			var distance, start, end, middle, startRadians, endRadians, text;

			distance = helpers.range(element.start,element.end);
			text = helpers.minutesToReadable(distance, 120);

			if(distance <= 720 && distance >= 60){
				start = element.start;
				end = element.end;
				middle = helpers.calc(start,distance/2);

				startRadians = helpers.minutesToRadians(start);
				endRadians = helpers.minutesToRadians(end);
				middleXY = helpers.minutesToXY(middle, textRadius, canvas.width/2, canvas.height/2)
				
				//stroke
				ctx.beginPath();
				ctx.arc(canvas.width/2,canvas.height/2,radius,startRadians,endRadians);
				ctx.stroke();

				//text
				ctx.fillText(text,middleXY.x,middleXY.y);
			}
		});
		
		ctx.restore();
	}

	function drawElementInfo(ctx,selected){
		var element, name, count, duration, middle, radius;
		var position = {};
		var radius = 22 * draw.ratio;
		var canvas = ctx.canvas;

		name = selected.name;
		count = selected.count;
		element = napchartCore.returnElement(name,count);
		duration = helpers.minutesToReadable( helpers.range(element.start, element.end) ,120);

		//find position
		middle = helpers.middle(element.start,element.end);
		position = helpers.minutesToXY(middle, radius, canvas.width/2, canvas.height/2);

		ctx.save();

		//ctx config
		ctx.font = barConfig.general.textSize * draw.ratio + "px verdana";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.globalAlpha = ctx.globalAlpha*0.6;

		//draw
		ctx.fillText(duration,position.x,position.y);

		ctx.restore();
	}

	function drawTimeIndicators(ctx,selected){
		var element, name, count, duration, radius, time;
		var position = {};
		var pointsToDraw = [];
		var canvas = ctx.canvas;

		name = selected.name;
		count = selected.count;
		element = napchartCore.returnElement(name,count);
		duration = helpers.range(element.start, element.end);
		radius = (barConfig[name].outerRadius + 4) * draw.ratio;

		//push start
		pointsToDraw.push({
			minutes:element.start
		});

		//if element is big enough, push end
		if(duration > 90){
			pointsToDraw.push({
				minutes:element.end
			});
		}

		ctx.save();

		//ctx config
		ctx.font = 3 * draw.ratio + "px verdana";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.globalAlpha = ctx.globalAlpha*0.4;

		for(var i = 0; i < pointsToDraw.length; i++){

			minutes = pointsToDraw[i].minutes;

			//skip if close to 0, 4, 8, 12, 16 or 20 (every 240 minutes)
			if(minutes%240 <= 15 || minutes%240 >= 225)
				continue;

			time = helpers.minutesToClock(minutes);
			position = helpers.minutesToXY(minutes, radius, canvas.width/2, canvas.height/2);

			//draw
			ctx.fillText(time,position.x,position.y);
		}


		ctx.restore();
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
			var ctx=canvas.getContext("2d");
			var devicePixelRatio = window.devicePixelRatio || 14;
			var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
			                            ctx.mozBackingStorePixelRatio ||
			                            ctx.msBackingStorePixelRatio ||
			                            ctx.oBackingStorePixelRatio ||
			                            ctx.backingStorePixelRatio || 1;

			console.log('backingstore:',backingStoreRatio);
			console.log('dpr:',devicePixelRatio);

			var backingRatio = devicePixelRatio / backingStoreRatio;

			// upscale the canvas if the two ratios don't match
		    if (devicePixelRatio !== backingStoreRatio) {
		    	console.log('upscaling');

		        var oldWidth = canvas.width;
		        var oldHeight = canvas.height;

		        //DIG INTO THIS SHIT SOME TIME 

		        //now disabled



		        // canvas.width = oldWidth * backingRatio;
		        // canvas.height = oldHeight * backingRatio;

		        // canvas.style.width = oldWidth + 'px';
		        // canvas.style.height = oldHeight + 'px';

		        // now scale the context to counter
		        // the fact that we've manually scaled
		        // our canvas element
		        // ctx.scale(backingRatio, backingRatio);

		    }

		    this.ctx = ctx;

			
			//draw clock
			drawLines(octx);
			clearClockCircle(octx,clockConfig.clearCircle*draw.ratio);
			drawCircles(octx);
			drawImpLines(octx);
			drawClockNumbers(octx);
			//saves to a variable used in drawFrame()
			this.cachedBackground=offScreenCanvas;
			
		},
		drawFrame:function(data,thumb){
			if(typeof data=='undefined')
				throw new Error("drawFrame did not receive data in argument");
			var dataWithPhantoms, selectedElement, ctx, backgroundColor;

			//clone data object
			data = JSON.parse(JSON.stringify(data));

			// remove overlapping of nap and busy bars
			// this will be used for some functions, while other functions use data
			dataWithPhantoms = removeOverlapping(data,'busy','nap');

			selectedElement = napchartCore.returnSelected()[0];

			ctx=draw.ctx;
			ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			if(typeof this.cachedBackground=="undefined")
				throw new Error("Could not find the initialized off-screen canvas. Try running draw.initialize()");

			ctx.drawImage(this.cachedBackground,0,0);

			drawBars(ctx,dataWithPhantoms);
			if(typeof clockConfig.blurCircle != "undefined"){
				if(typeof thumb != 'undefined')
					backgroundColor = 'white';
				else
					backgroundColor = draw.backgroundColor;
				drawBlurCircle(ctx,backgroundColor);
			}
			drawSelected(ctx,dataWithPhantoms);
			strokeBars(ctx,dataWithPhantoms);

			for(var name in data){
				if(name == 'busy')
					continue;
				for(var i = 0; i < data[name].length; i++){
					drawElementInfo(ctx,{name:name,count:i});
					drawTimeIndicators(ctx,{name:name,count:i});
				}
			}

			ctx.save();
			ctx.globalAlpha=interactCanvas.getSelectedOpacity();

			drawShadows(ctx,data);
			drawHandles(ctx,data);

			if(typeof selectedElement != 'undefined'){
				//something is selected
				drawDistanceToNearElements(ctx,data,selectedElement,['nap','core']);

				if(selectedElement.name
				 == 'busy'){
					drawElementInfo(ctx,selectedElement);
					drawTimeIndicators(ctx,selectedElement);
				}
			}

			ctx.restore();

		},
		drawUpdate:function(){
			data = napchartCore.getSchedule();
			draw.drawFrame(data);
		},

		getBarConfig:function(){
			return JSON.parse(JSON.stringify(barConfig));
		},


		getImage:function(){
			var ctx = draw.ctx;
			var canvas = ctx.canvas;
			var img;

			img = canvas.toDataURL();

			return img;
		}
	};
}());