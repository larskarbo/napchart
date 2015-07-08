/**

This module handles the shareWindow
Uses jQuery

**/

window.shareWindow=(function(){
	//private
	var SHARE_WINDOW;


	function open(){
		$(SHARE_WINDOW).show();
	}

	//public:
	return{
		initialize:function(window){
			if(!window){
				console.warn('could not find window');
				return
			}
			SHARE_WINDOW = window;
		}

	}

}())