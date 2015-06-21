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

		load:function(){

		},

		save:function(){

		}
	}

}())