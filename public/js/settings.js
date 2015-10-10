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

		$(switchBox).find('#ampm').on('change',function(){
			if(this.checked == true){
				draw.changeClockConfig('numberRadius',46);
				draw.changeClockConfig('timeLocation',6);
			}else{
				draw.changeClockConfig('numberRadius',44);
				draw.changeClockConfig('timeLocation',4);
			};
			draw.reInit();
		});

		$(switchBox).find('#darkmode').on('change',function(){
			if(this.checked == true){
				napchartCore.dmToggle(true);
			}else{
				napchartCore.dmToggle(false);
			}
		});
	}

	function getValue(id){
		var element = $(switchBox).find('#' + id)[0];
		var value;

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
		},

		getValue:function(id){
			return getValue(id);
		}

		
	}

}())