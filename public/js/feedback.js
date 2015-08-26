/**

This module handles the ajax feedback front end
Uses jQuery and handles DOM by itself

**/

window.feedback=(function(){
	//private

	function answer(){
		$('#question').hide();
		$('#thankyou').show();
		setTimeout(showTextbox,400);
	}

	function showTextbox(){
		$('#feedback-text-question').show();
		$('#feedback-text').show();
	}

	//public:
	return{
		initialize:function(){
			var alreadyAnswered = false;

			if($('.feedback').length == 0){
				console.warn('could not find feedback container')
				return
			};

			container = $('.feedback')[0];

			//search for cookie containing info
			//alreadyAnswered = true;

			//add event listeners to all radios
			$(container).on('change','input', answer);

		}
	}

}())