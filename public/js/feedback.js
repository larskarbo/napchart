/**

This module handles the ajax feedback front end
Uses jQuery and handles DOM by itself

**/

window.feedback=(function(){
	//private
	var container;

	function answer(){
		$(container).find('#question').hide();
		$(container).find('#thankyou').show();
		setTimeout(showTextbox,400);
	}

	function showTextbox(){
		$(container).find('#feedback-text-question').show();
		$(container).find('#feedback-text').show();
		$(container).find('.loading-wheel').hide();

		$('#send-feedback').click(submit);
	}

	function submit(){
		var message = $(container).find('textarea').val();

		if(message.length == 0)
			return
		

		loading();
		$(container).find('#thankyou').hide();
		$(container).find('#feedback-question').hide();

		//ajax
		server.sendMail(message,function(response){
			console.info(response);
			if(response != 'success'){
				$(container).find('#feedback-error').show();
			}else{
				$(container).find('#feedback-devthanks').show();
			}

			finishedLoading();
		});
	}

	function loading(){
		$(container).find('.loading-wheel').show();
		$(container).find('.arm').hide();
	}

	function finishedLoading(){
		$(container).find('.loading-wheel').hide();
		$(container).find('.arm').show();
		$(container).find('textarea').val('');
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