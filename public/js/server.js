/**

This module handles server interactions to save and load schedules with ajax
This module uses JQuery for ajax handling

**/

window.server=(function(){
	//private
	function callback(success, response){

		if(success){
			napchartCore.setURL(response);
		}else{
			alert('Something went wrong:\n\n' + response);
		}
		
		finish();
		console.log(response);
	}

	function loading(){
		napchartCore.startLoading();
	}

	function finish(){
		napchartCore.finishLoading();
	}

	//public:
	return{
		saveNew:function(data){
			//set loading (will be cancelled by callback())
			loading();

			//check if there the user already has saved an identical version:
			var chartid = chartHistory.checkIfExists(data);
			if(chartid){
				callback(true,chartid);
				return;
			}

			//else save a new
			var json = JSON.stringify(data);

			$.post( "post", {data: json })
			  .done(function(chartid) {
			    callback(true,chartid);
			  })
			  .fail(function(error) {
			  	console.error(error);
			    callback(false,JSON.stringify(error));
			  })
			

		},

		sendMail:function(message,callback){
			$.post( "email-feedback-post", {message: message })
			  .done(function() {
			    callback('success');
			  })
			  .fail(function(error) {
			    callback(error);
			  })
		},


		load:function(){

		},

		save:function(){

		}
	}

}())