/**

This module handles settings.
This module uses jQuery
Uses cookies to save preferences

**/

window.settings=(function(){
	//private
	var switchBox;

	var showAllElements;

	function addEventListeners(){

		$(switchBox).find('#showAllElements').on('change',function(){
			formInput.setSettings({
				showAllElements:settings.getValue('showAllElements')
			});
		});


		$(switchBox).find('#napDuration').on('change',function(){
			barhandler.setSettings({
				napDuration:settings.getValue('napDuration')
			});
		});
	}

	//public:
	return{
		initialize:function(container){
			switchBox = container;

			console.log($(switchBox).find('#showAllElements').length);

			addEventListeners();
		},

		getValue:function(id){
			var element = $(switchBox).find('#' + id)[0];
			var value;
			console.log(element);

			if(element.type == 'checkbox'){
				value = element.checked;
			}else{
				value = element.value;
			}

			return value;
		}
	}

}())