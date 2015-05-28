/*

This module adds support for modifying a schedule
directly on the canvas with mouse or touch

*/

window.directInput = (function(){
	//private:

	var mouseX,mouseY;

	var hoverElements = [],
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
		var relativePosition = getRelativePosition(e);

		//check if point is over an element (hoverElements array)
		if(typeof hoverElements[0] != 'undefined'){
			console.log('hit',hoverElements[0].name,hoverElements[0].count);
			activeElements.push({name:hoverElements[0].name,count:hoverElements[0].count})
		}
		
		helpers.requestAnimFrame.call(window,draw.drawUpdate);
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
			canvas.addEventListener('mouseup',up);
		},

		getCanvasMousePosition:function(e){
			return {x:mouseX,y:mouseY};
		},

		setHoverElements:function(elementsArray){
			hoverElements = elementsArray;
		},

		isActive:function(name,count){
			for(i=0;i<activeElements.length;i++){
				if(name == activeElements[i].name && count == activeElements[i].count){
					return true
				}
			}
			return false
		}
	}

}());