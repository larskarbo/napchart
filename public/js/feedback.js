/**

This module handles the ajax feedback front end
Uses jQuery and handles DOM by itself

**/

window.feedback=(function(){
	//private
	var container;


	function submit(event){
		event.stopPropagation();
		event.preventDefault();
		var message = $(container).find('textarea').val();

		$(container).find('#feedback-error').addClass('hidden');
		$(container).find('#feedback-devthanks').addClass('hidden');

		loading();

		//ajax
		server.sendFeedback(message,function(err, response){
			console.info(response);
			if(err){
				$(container).find('#feedback-error').removeClass('hidden');
			}else{
				$(container).find('#feedback-devthanks').removeClass('hidden');
				$(container).find('#token').val(response);
			}

			finishedLoading();
		});
	}
	function linkEmail(event){
		event.stopPropagation();
		event.preventDefault();
		var email = $(container).find('#email').val();
		var token = $(container).find('#token').val();
		//
		// $(container).find('#feedback-error').addClass('hidden');
		// $(container).find('#feedback-devthanks').addClass('hidden');

		loading();

		//ajax
		server.linkEmailToFeedback(token, email,function(err, response){
			console.info(response);
			if(err){
				$(container).find('#linkemailerror').removeClass('hidden');
			}else{
				$(container).find('#linkemailsuccess').removeClass('hidden');
			}

			finishedLoading();
		});
	}

	function loading(){
		$(container).find('.loading-wheel').removeClass('hidden');
		$(container).find('.arm').hide();
	}

	function finishedLoading(){
		$(container).find('.loading-wheel').addClass('hidden');
		$(container).find('.arm').show();
		$(container).find('textarea').val('');
		$(container).find('#email').val('');
		$(container).find('.emailoptional').removeClass('hidden');
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

			$('#send-feedback').on("mousedown touchstart",submit);
			$('#linkEmail').on("mousedown touchstart",linkEmail);

		}
	}

}())
