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
		var canvas = e.currentTarget || e.srcElement,
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

	function hover(e){
		var relativePosition = getRelativePosition(e);

		mouseX = relativePosition.x;
		mouseY = relativePosition.y;
		helpers.requestAnimFrame.call(window,draw.drawUpdate);
	}

	function mouseLeave(e){
		mouseX = null;
		mouseY = null;
	}

	function down(e){
		e.preventDefault();

		//return of no hit
		if(typeof mouseHover == {}){
			return
		}

		var relativePosition = getRelativePosition(e),
		minutes = helpers.XYtoMinutes(relativePosition.x,relativePosition.y)
		name,
		count,
		positionInElement,
		element;


		name = mouseHover.name;
		count = mouseHover.count;
		element = napchartCore.returnElement(name,count);

		console.log('hit',name,count);

		positionInElement=helpers.calc(minutes,-element.start);
		activeElements.push({name:name,count:count,position:positionInElement,what:'dragWhole'});


		document.addEventListener('mousemove',drag);
		document.addEventListener('mouseup',function(){
			document.removeEventListener('mousemove',drag)
		})

		helpers.requestAnimFrame.call(window,draw.drawUpdate);
	}

	function drag(e){
		var dragElement = activeElements[0],
		relativePosition = getRelativePosition(e),
		minutes = helpers.XYtoMinutes(relativePosition.x,relativePosition.y),
		name = dragElement.name,
		count = dragElement.count,
		positionInElement = dragElement.positionInElement,
		start = calc(minutes,-positionInElement);

		//newValues is an object that will replace the existing one with new values
		newValues = {}

		if(dragElement.what=='dragWhole'){
			napchartCore.modifyElement(name,count,newValues)
		}


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
		console.log(mouseHover.name,mouseHover.count);
			mouseHover = hover;
		},

		isActive:function(name,count){
			for(i=0;i<activeElements.length;i++){
				if(name == activeElements[i].name && count == activeElements[i].count){
					return true
				}
			}
			return false
		},

		isHover:function(name,count){
			if(name == mouseHover.name && count == mouseHover.count){
				return true
			}
			return false
		}
	}

}());