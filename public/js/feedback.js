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
		server.sendMail(message,function(response){
			console.info(response);
			if(response != 'success'){
				$(container).find('#feedback-error').removeClass('hidden');
			}else{
				$(container).find('#feedback-devthanks').removeClass('hidden');
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

		}
	}

}())
