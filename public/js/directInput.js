/*

This module adds support for modifying a schedule
directly on the canvas with mouse or touch

*/

window.directInput = (function(){
	//private:

	var mouse = {},
	mouseHover = {},
	selected = {},
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

	function hover(e){
		var canvas = napchartCore.getCanvas(),
		coordinates = getCoordinates(e,canvas),
		data = napchartCore.getSchedule(),
		barConfig = draw.getBarConfig(),
		points = [], point, value, distance, handlesMouseHover;

		
		//draws a new frame and checks for hit detection on bars
		helpers.requestAnimFrame.call(window,draw.drawUpdate);
		
		handlesMouseHover = {};
		//hit detection of handles (will overwrite current mouseHover object
		//from draw if hovering a handle):
		for(var name in data){
			if(typeof barConfig[name].rangeHandles == 'undefined' || !barConfig[name].rangeHandles)
				continue;
			for(i = 0; i < data[name].length; i++){
				if(!directInput.isSelected(name,i))
					continue;
				for(s = 0; s < 2; s++){
					value = data[name][i][['start','end'][s]];
					point = helpers.minutesToXY(value,barConfig[name].outerRadius*draw.ratio);

					distance = helpers.distance(point.x,point.y,coordinates.x,coordinates.y);
					if(distance < hoverDistance*draw.ratio){
						if(typeof handlesMouseHover.distance=='undefined'||distance < handlesMouseHover.distance){
							//overwrite current hover object
							handlesMouseHover ={
								name:name,
								count:i,
								type:['start','end'][s],
								distance:distance
							};
						}
					}
				}
			}
		}
		if(Object.keys(handlesMouseHover).length==0 && (mouseHover.type == 'start' || mouseHover.type == 'end')){
			mouseHover = {};
		}else if(Object.keys(handlesMouseHover).length > 0){
			mouseHover = handlesMouseHover;
		};
	}

	function mouseLeave(e){
		//mouseX = null;
		//mouseY = null;
	}

	function down(e){
		e.preventDefault();

		//return of no hit
		if(typeof mouseHover.name == 'undefined'){
			deselect();
			return;
		}

		var canvas = e.target || e.srcElement,
		coordinates = getCoordinates(e,canvas),
		minutes = helpers.XYtoMinutes(coordinates.x,coordinates.y),
		name = mouseHover.name,
		count = mouseHover.count,
		type = mouseHover.type,
		element = napchartCore.returnElement(name,count),
		positionInElement=helpers.calc(minutes,-element.start);
		

		activeElements.push({
			name:name,
			count:count,
			positionInElement:positionInElement,
			type:type,
			canvas:canvas
		});

		document.addEventListener('mousemove',drag);
		document.addEventListener('mouseup',function(){
			document.removeEventListener('mousemove',drag);
		});

		select(name,count);
		drag(e); //to  make sure the handles positions to the cursor even before movement

		helpers.requestAnimFrame.call(window,draw.drawUpdate);
	}

	function select(name,count){
		selected = {
			name:name,
			count:count
		};
		//notify core module:
		napchartCore.setSelected(name,count);
	}

	function deselect(name,count){
		selected = {};
		//notify core module:
		napchartCore.setSelected(name,count);
	}

	function drag(e){

		var dragElement = activeElements[0],
		coordinates = getCoordinates(e,dragElement.canvas),
		minutes = helpers.XYtoMinutes(coordinates.x,coordinates.y),
		name = dragElement.name,
		count = dragElement.count,
		element = napchartCore.returnElement(name,count),
		//newValues is an object that will replace the existing one with new values
		newValues = {}, positionInElement, duration, start, end;

		
		


		if(dragElement.type=='start'){
			start = minutes;
			newValues = {start:start};
		}
		else if(dragElement.type=='end'){
			end = minutes;
			newValues = {end:end};
		}
		else if(dragElement.type=='whole'){
			positionInElement = dragElement.positionInElement;
			duration = helpers.range(element.start,element.end);
			start = helpers.calc(minutes,-positionInElement);
			end = helpers.calc(start,duration);
			newValues = {start:start,end:end};
		}
		
		napchartCore.modifyElement(name,count,newValues);


	}

	function up(){
		//function must be modified when adding multitouch support
		activeElements = [];

		helpers.requestAnimFrame.call(window,draw.drawUpdate);
	}

	function setCoordinates(e){
		var canvas = napchartCore.getCanvas();
		mouse = getRelativePosition(e,canvas);
	}

	function leave(){
		mouse = {};
	}

	//public:
	return{
		initialize:function(canvas){
			canvas.addEventListener('mousemove',hover);
			canvas.addEventListener('mousemove',setCoordinates);
			canvas.addEventListener('mouseleave',leave);
			canvas.addEventListener('mousedown',down);
			canvas.addEventListener('touchstart',down);
			document.addEventListener('mouseup',up);

			/*document.body.addEventListener('touchmove', function(event) {
			  event.preventDefault();
			}, false); */

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

		isSelected:function(name,count){
			if(name == selected.name && count == selected.count){
				return true;
			}
			return false;
		},

		returnSelected:function(){

			//check if selected exists or is removed
			if(typeof selected.name != 'undefined'
			&& !napchartCore.elementExists(selected.name,selected.count)){
				selected = {}
			}
			return selected;
		},

		deselect:function(){
			deselect();
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