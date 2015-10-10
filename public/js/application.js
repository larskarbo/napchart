/*

This module starts the app

*/
$(document).ready(function(){
	var data = {}, chartid = false;

	if(typeof fromServer.data != 'undefined' && typeof fromServer.chartid != 'undefined'){
		data = fromServer.data;
		chartid = fromServer.chartid;
	}
	napchartCore.initialize(data);

	if(chartid){
		napchartCore.setURL(chartid);
	}

}); 