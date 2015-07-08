/**

This module handles the shareWindow
Uses jQuery

**/

window.shareWindow=(function(){
	//private
	var SHARE_WINDOW;
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
		},

		open:function(url){
			var img;

			img = draw.getImage();
			console.log(CHART_IMAGE);

			$(CHART_IMAGE).attr('src',img);

			$(SHARE_WINDOW).show();

		},

		close:function(){
			$(SHARE_WINDOW).hide();
		}

	}

}())