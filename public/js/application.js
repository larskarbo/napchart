/*

This module starts the app

*/
$(document).ready(function(){
	var data = {}, chartid = false;

	if(typeof fromServer != 'undefined'){
		data = fromServer.data;
		chartid = fromServer.chartid;
	}

	napchartCore.initialize(data);

	if(chartid){
		napchartCore.setURL(chartid);
	}

}); 