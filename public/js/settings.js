/**

This module handles settings.
This module uses jQuery
Uses cookies to save preferences

**/

window.settings=(function(){
	//private
	var switchBox;

	// var items = {
	// 	showAllElements:false,
	// 	napDuration:20
	// }

	function addEventListeners(){

		$(switchBox).find('#showAllElements').on('change',function(){
			formInput.setSettings({
				showAllElements:getValue('showAllElements')
			});
		});


		$(switchBox).find('#napDuration').on('change',function(){
			barhandler.setSettings({
				napDuration:getValue('napDuration')
			});
		});
	}

	function getValue(id){
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

	//public:
	return{
		initialize:function(container){
			switchBox = container;

			console.log($(switchBox).find('#showAllElements').length);

			addEventListeners();
		}

		
	}

}())