/*

This module adds support for modifying a schedule
directly on the canvas with mouse or touch

*/

window.directInput = (function(){
	//private:


	//public:
	return{
		initialize:function(canvas){
			canvas.addEventListener('mousemove',this.hover)
		}

		hover:function(e){
			//checks if mouse is hovering something on the canvas

		}
	}

}());