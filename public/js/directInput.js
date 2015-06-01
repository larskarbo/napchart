/*

This module adds support for modifying a schedule
directly on the canvas with mouse or touch

*/

window.directInput = (function(){
	//private:

	var mouseX,mouseY;

	var mouseHover = {},
	activeElements = [];

	function getRelativePosition(e){
		var canvas = e.target || e.srcElement,
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
		var relativePosition = getRelativePosition(e),
		data = napchartCore.getSchedule,
		barConfig = draw.getBarConfig,
		points = [], point, value;

		mouseX = relativePosition.x;
		mouseY = relativePosition.y;

		//draws a new frame and checks for hit detection on bars
		helpers.requestAnimFrame.call(window,draw.drawUpdate);

		//hit detection of handles (will overwrite current mouseHover object
		//from draw if hovering a handle):
		for(var name in data){
			for(i = 0; i < data[name].length; i++){
				for(s = 0; s < 2; s++){
					value = data[name][i][['start','end'][s]];
					point = helpers.minutesToXY(value , barConfig[name].outerRadius*draw.ratio);
					//distance
				}
			}
		}
	}

	function mouseLeave(e){
		mouseX = null;
		mouseY = null;
	}

	function down(e){
		e.preventDefault();

		//return of no hit
		if(typeof mouseHover.name == 'undefined'||typeof mouseHover.count == 'undefined'){
			return;
		}

		var canvas = e.target || e.srcElement,
		coordinates = getCoordinates(e,canvas),
		minutes = helpers.XYtoMinutes(coordinates.x,coordinates.y),
		name = mouseHover.name,
		count = mouseHover.count,
		element = napchartCore.returnElement(name,count),
		positionInElement=helpers.calc(minutes,-element.start);
		


		activeElements.push({
			name:name,
			count:count,
			positionInElement:positionInElement,
			what:'dragWhole',
			canvas:canvas
		});


		document.addEventListener('mousemove',drag);
		document.addEventListener('mouseup',function(){
			document.removeEventListener('mousemove',drag);
		});

		helpers.requestAnimFrame.call(window,draw.drawUpdate);
	}

	function drag(e){

		var dragElement = activeElements[0],
		coordinates = getCoordinates(e,dragElement.canvas),
		minutes = helpers.XYtoMinutes(coordinates.x,coordinates.y),
		name = dragElement.name,
		count = dragElement.count,
		element = napchartCore.returnElement(name,count),
		positionInElement = dragElement.positionInElement,
		duration = helpers.range(element.start,element.end),
		start = helpers.calc(minutes,-positionInElement),
		end = helpers.calc(start,duration);
		newValues = {};


		//newValues is an object that will replace the existing one with new values
		if(dragElement.what=='dragWhole'){
			newValues = {start:start,end:end};
		}
		
		napchartCore.modifyElement(name,count,newValues);


	}

	function up(){
		//function must be modified when adding multitouch support
		activeElements = [];

		helpers.requestAnimFrame.call(window,draw.drawUpdate);
	}

	//public:
	return{
		initialize:function(canvas){
			canvas.addEventListener('mousemove',hover);
			canvas.addEventListener('mouseleave',mouseLeave);
			canvas.addEventListener('mousedown',down);
			canvas.addEventListener('touchstart',down);
			document.addEventListener('mouseup',up);

			/*document.body.addEventListener('touchmove', function(event) {
			  event.preventDefault();
			}, false); */

		},

		getCanvasMousePosition:function(e){
			return {x:mouseX,y:mouseY};
		},

		setHoverElements:function(hover){
			mouseHover = hover;
		},

		isActive:function(name,count){
			for(i=0;i<activeElements.length;i++){
				if(name == activeElements[i].name && count == activeElements[i].count){
					return true;
				}
			}
			return false;
		},

		isHover:function(name,count){
			if(name == mouseHover.name && count == mouseHover.count){
				return true;
			}
			return false;
		}
	};

}());