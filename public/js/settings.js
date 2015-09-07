/**

This module handles settings.
This module uses jQuery
Uses cookies to save preferences

**/

window.settings=(function(){
	//private
	var switchBox;

	var showAllElements;

	//public:
	return{
		initialize:function(container){
			switchBox = container;

			console.log($(switchBox).find('#showAllElements').length);
			$(switchBox).find('#showAllElements').on('change',function(){
				formInput.setSettings();
			});
		},

		getValue:function(id){
			console.log(switchBox);
			var value = $(switchBox).find('#' + id).attr('checked');

			if(value)
				return true;
			else
				return false;
			}
		}

}())