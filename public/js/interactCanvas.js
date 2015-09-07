/*

This module adds support for modifying a schedule
directly on the canvas with mouse or touch

*/

window.interactCanvas = (function(){
	//private:

	var mouse = {},
	mouseHover = {},
	activeElements = [],
	hoverDistance = 6,
	selectedOpacity = 1;

	function getRelativePosition(e,canvas){
		var mouseX, mouseY, boundingRect;
		if(typeof canvas=='undefined'){
			canvas = e.target || e.srcElement;
		}
		boundingRect = canvas.getBoundingClientRect();

		if (e.touches){
			mouseX = e.touches[0].clientX - boundingRect.left;
			mouseY = e.touches[0].clientY - boundingRect.top;
		}

		else{
			mouseX = e.clientX - boundingRect.left;
			mouseY = e.clientY - boundingRect.top;
		}

		return {
			x : mouseX,
			y : mouseY
		};
	}

	function getCoordinates(e,canvas){
		var mouseX,mouseY,
		//similar to getrelativeposition but here origo is (0,0)
		boundingRect = canvas.getBoundingClientRect();

		if (e.touches){
			mouseX = e.touches[0].clientX - boundingRect.left;
			mouseY = e.touches[0].clientY - boundingRect.top;
		}

		else{
			mouseX = e.clientX - boundingRect.left;
			mouseY = e.clientY - boundingRect.top;
		}

		return {
			x : mouseX-canvas.width/2,
			y : mouseY-canvas.height/2
		};
	}

	function hitDetect(coordinates){
		var canvas = napchartCore.getCanvas();
		var data = data = napchartCore.getSchedule();
		var barConfig = draw.getBarConfig();


		// will return:
		// name (core, nap, busy)
		// count (0, 1, 2 ..)
		// type (start, end, or middle)

		var hit = {};
		var value, point, i, distance;

		//hit detection of handles (will overwrite current mouseHover object
		//from draw if hovering a handle):
		for(var name in data){
			if(typeof barConfig[name].rangeHandles == 'undefined' || !barConfig[name].rangeHandles)
				continue;

			for(i = 0; i < data[name].length; i++){

				// if element is not selected, continue
				if(!napchartCore.isSelected(name,i))
					continue;

				for(s = 0; s < 2; s++){
					value = data[name][i][['start','end'][s]];
					point = helpers.minutesToXY(value,barConfig[name].outerRadius*draw.ratio);

					distance = helpers.distance(point.x,point.y,coordinates.x,coordinates.y);
					if(distance < hoverDistance*draw.ratio){

						if(typeof hit.distance=='undefined'||distance < hit.distance){
							//overwrite current hit object
							hit = {
								name:name,
								count:i,
								type:['start','end'][s],
								distance:distance,
								identifier
							};
						}
					}
				}
			}
		}

		//if no handle is hit, check for middle hit

		if(Object.keys(hit).length == 0){
			var minutes, distanceToCenter;
			var start, end;
			var outerRadius, innerRadius;

			var positionInElement;


			minutes = helpers.XYtoMinutes(coordinates.x,coordinates.y);
			distanceToCenter = helpers.distance(coordinates.x,coordinates.y,0,0);

			//loop through elements
			for(var name in data){
				for(i = 0; i < data[name].length; i++){
					//check if point is inside element horizontally
					start = data[name][i].start;
					end = data[name][i].end;
					if(helpers.pointIsInside(minutes,start,end)){

						//check if point is inside element vertically
						innerRadius = barConfig[name].innerRadius*draw.ratio;
						outerRadius = barConfig[name].outerRadius*draw.ratio;
						if(distanceToCenter > innerRadius && distanceToCenter < outerRadius){

							positionInElement = helpers.calc(minutes,-start);
							hit = {
								name:name,
								count:i,
								type:'whole',
								positionInElement:positionInElement
							};
						}


					}

				}
			}
		}
		
		if(Object.keys(hit).length == 0)
			return false;

		return hit;
	}

	function hover(e){
		var canvas = napchartCore.getCanvas(),
		coordinates = getCoordinates(e,canvas),
		data = napchartCore.getSchedule(),
		barConfig = draw.getBarConfig();

		helpers.requestAnimFrame.call(window,draw.drawUpdate);

		var hit = hitDetect(coordinates);

		mouseHover = hit;

	}

	function touchDown(e){
		e.stopPropagation();

		var canvas = e.target || e.srcElement;
		var coordinates = getCoordinates(e,canvas);
		var hit;

		hit = hitDetect(coordinates);

		//return of no hit
		if(!hit){
			deselect();
			return;
		}

		//set identifier
		hit.identifier = e.touches[0].identifier;

		console.log(hit);
		console.info('touchdown!!', e)
		e.preventDefault();

		hit.canvas = canvas;

		activeElements.push(hit);

		document.addEventListener('touchmove',touchDrag);

		select(hit.name,hit.count);

		touchDrag(e); //to  make sure the handles positions to the cursor even before movement

		helpers.requestAnimFrame.call(window,draw.drawUpdate);
	}

	function touchDrag(e){

	}

	function down(e){
		e.preventDefault();
		e.stopPropagation();

		console.info('down');

		var canvas = e.target || e.srcElement;
		var coordinates = getCoordinates(e,canvas);
		var hit;

		hit = hitDetect(coordinates);

		//return of no hit
		if(!hit){
			deselect();
			return;
		}

		hit.canvas = canvas;

		activeElements.push(hit);

		document.addEventListener('mousemove',drag);
		document.addEventListener('mouseup',function(){
			document.removeEventListener('mousemove',drag);
		});

		select(hit.name,hit.count);
		drag(e); //to  make sure the handles positions to the cursor even before movement

		helpers.requestAnimFrame.call(window,draw.drawUpdate);
	}

	function unfocus(e){
		// checks if click is on a part of the site that should make the
		// current selected elements be deselected

		var x, y;
		var domElement

		x = e.clientX;
		y = e.clientY;

		var domElement = document.elementFromPoint(x, y);

		console.log(domElement);
	}

	function select(name,count){
		//notify core module:
		napchartCore.setSelected(name,count);
	}

	function deselect(name,count){
		if(typeof name == 'undefined'){
			//deselect all
			napchartCore.deselect();
		}
		//deselect one
		napchartCore.deselect(name,count);
	}

	function drag(e){
		new err;
		console.log('dragging with mouse')
		var dragElement = activeElements[0],
		coordinates = getCoordinates(e,dragElement.canvas),
		minutes = helpers.XYtoMinutes(coordinates.x,coordinates.y),
		name = dragElement.name,
		count = dragElement.count,
		element = napchartCore.returnElement(name,count),
		//newValues is an object that will replace the existing one with new values
		newValues = {}, positionInElement, duration, start, end;

		
		


		if(dragElement.type=='start'){
			start = snap(minutes);
			newValues = {start:start};
		}
		else if(dragElement.type=='end'){
			end = snap(minutes);
			newValues = {end:end};
		}
		else if(dragElement.type=='whole'){
			positionInElement = dragElement.positionInElement;
			duration = helpers.range(element.start,element.end);
			start = helpers.calc(minutes,-positionInElement);
			start = snap(start);
			end = helpers.calc(start,duration);
			newValues = {start:start,end:end};
		}
		
		napchartCore.modifyElement(name,count,newValues);


	}

	function up(e){
		console.log('activeElements:',JSON.stringify(activeElements));
		console.log(e);
		var identifier = e.touches[0].identifier;
		if(activeElements.length != 0){
			chartHistory.add(napchartCore.getSchedule(),'moved ' + activeElements[0].name + ' ' + (activeElements[0].count+1));
		}


		//find the shit to remove
		for(var i = 0; i < activeElements.length; i++){

		}

		helpers.requestAnimFrame.call(window,draw.drawUpdate);

	}

	function setCoordinates(e){
		var canvas = napchartCore.getCanvas();
		mouse = getRelativePosition(e,canvas);
	}

	function leave(){
		mouse = {};
	}

	function snap(input){
		var output = input;

		//hour
		if(input%60 < 7)
			output = input-input%60;
		else if(input%60 > 53)
			output = input+(60-input%60);

		//half hours
		else{
			input += 30;

			if(input%60 < 5)
				output = input-input%60-30;
			else if(input%60 > 55)
				output = input+(60-input%60)-30;
		}

		return output;
	}

	//public:
	return{
		initialize:function(canvas){
			
			// canvas.addEventListener('mousemove',hover);
			// canvas.addEventListener('mousemove',setCoordinates);
			// canvas.addEventListener('mouseleave',leave);
			// canvas.addEventListener('mousedown',down);
			// document.addEventListener('mouseup',up);
			document.addEventListener('touchend',up);
			canvas.addEventListener('touchstart',touchDown);
			document.addEventListener('touchstart',deselect);


		},

		getCanvasMousePosition:function(canvas){
			return {x:mouse.x , y:mouse.y};
		},

		setHoverElement:function(hover){
			//ignore if a handle is being hovered
			if(mouseHover.type != 'start' && mouseHover.type != 'end'){
				mouseHover = hover;
			};
		},

		isActive:function(name,count,type){

			for(i=0;i<activeElements.length;i++){

				if(name == activeElements[i].name && count == activeElements[i].count){
					if(typeof type=='undefined' || type == activeElements[i].type)
					return true;
				}
			}
			return false;
		},

		isHover:function(name,count,type){
			if(name == mouseHover.name && count == mouseHover.count){
				if(typeof type=='undefined' || type == mouseHover.type)
				return true;
			}
			return false;
		},


		mouseIsOverCanvas:function(){
			if(typeof mouse.x != 'undefined')
				return true;
			else
				return false;
		},

		getSelectedOpacity:function(){
			return selectedOpacity;
		},

		setSelectedOpacity:function(to){
			selectedOpacity = to;
		}
	};

}());