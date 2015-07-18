/**

This module handles the ajax feedback front end
Uses jQuery and handles DOM by itself

**/

window.feedback=(function(){
	//private
	var container;
	var totalSteps, currentStep = 1;

	function nextStep(){
		//hide all current steps
		$(container).find('.step-' + currentStep).hide();

		//increment counter
		currentStep++;

		//show
		$(container).find('.step-' + currentStep).show();

	}

	function trigger(){
		//wait
		setTimeout(nextStep,400);
	}

	//public:
	return{
		initialize:function(){
			if($('.feedback').length == 0){
				console.warn('could not find feedback container')
				return
			};

			container = $('.feedback')[0];

			//find out how many steps there are:
			for(var i = 0; true; i++){
				if( $(container).find('.step.step-' + (i+1) ).length == 0 ){
					totalSteps = i;
					break;
				}
			}

			if(totalSteps == 0){
				console.warn('could not find any step blocks');
			}

			//hide all steps
			$('.step').hide();

			//add event listeners to all triggers
			$(container).on('click','.trigger', trigger);

			//show first step
			$('.step-' + currentStep).show();


		}
	}

}())