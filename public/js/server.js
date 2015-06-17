/**

This module handles server interactions to save and load schedules with ajax
This module uses JQuery for ajax handling

**/

window.server=(function(){
	//private


	//public:
	return{
		saveNew:function(data){
			var json = JSON.stringify(data);

			$.post( "post", {data: json })
			  .done(function() {
			    alert( "success" );
			  })
			  .fail(function() {
			    alert( "error" );
			  })
			  
		},

		load:function(){

		},

		save:function(){

		}
	}

}())