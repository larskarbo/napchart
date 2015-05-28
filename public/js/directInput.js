/*

This module adds support for modifying a schedule
directly on the canvas with mouse or touch

*/

window.directInput = (function(){
	//private:

	var mouseX,mouseY;

	var hoverElements;

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
		if(typeof hoverElements[0] != 'undefined')
		console.log('hit',hoverElements[0].name,hoverElements[0].count)
	}

	//public:
	return{
		initialize:function(canvas){
			canvas.addEventListener('mousemove',hover);
			canvas.addEventListener('mouseleave',mouseLeave);
			canvas.addEventListener('mousedown',down);
			canvas.addEventListener('touchstart',down);
		},

		getCanvasMousePosition:function(e){
			return {x:mouseX,y:mouseY};
		},

		setHoverElements:function(elementsArray){
			hoverElements = elementsArray;
		}
	}

}());