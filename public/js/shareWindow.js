/**

This module handles the shareWindow
Uses jQuery

**/

window.shareWindow=(function(){
	//private
	var SHARE_WINDOW;
	var OVERLAY;
	var CHART_IMAGE = $('.chart-preview');
	var URL_FIELD = $('.share-url-field');

	//public:
	return{
		initialize:function(window){
			if(!window){
				console.warn('could not find window');
				return
			}
			SHARE_WINDOW = window;
			OVERLAY = $(SHARE_WINDOW).parent()
		},

		open:function(url){
			var img;

			img = draw.getImage();
			console.log(CHART_IMAGE);

			$(CHART_IMAGE).attr('src',img);

			$(OVERLAY).show();

			$(OVERLAY).on('click',function(){
				
				//check if click is outside the actual share window
				if(! $(SHARE_WINDOW).is(':hover')){
					shareWindow.close()
				}
			});
		},

		close:function(){
			$(OVERLAY).hide();
		}

	}

}())