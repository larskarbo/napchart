/*

This module adds support for modifying a schedule
directly on the canvas with mouse or touch

*/

window.directInput = (function(){
	//private:

	var mouseX,mouseY;

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

	//public:
	return{
		initialize:function(canvas){
			canvas.addEventListener('mousemove',hover);
			canvas.addEventListener('mouseleave',mouseLeave);
		},
		getCanvasMousePosition:function(e){
			return {x:mouseX,y:mouseY};
		}
	}

}());