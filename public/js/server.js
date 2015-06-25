/**

This module handles server interactions to save and load schedules with ajax
This module uses JQuery for ajax handling

**/

window.server=(function(){
	//private


	//public:
	return{
		saveNew:function(data, callback){
			var json = JSON.stringify(data);

			$.post( "post", {data: json })
			  .done(function(chartid) {
			    callback(true,chartid);
			  })
			  .fail(function(error) { //// TODO check if this works
			    callback(false,error);
			  })
			

		},

		callback:function(success, response){
			if(success){
				napchartCore.setURL(response);
			}else{
				alert('Something went wrong:\n\n' + response);
			}
			console.log(response);
		},

		load:function(){

		},

		save:function(){

		}
	}

}())