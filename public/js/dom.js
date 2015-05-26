$(document).ready(function(){

	document.getElementById('addCore').addEventListener('click',function(){
		barhandler.addBar("core");
	})
	document.getElementById('addNap').addEventListener('click',function(){
		barhandler.addBar("nap");
	})
	document.getElementById('addBusy').addEventListener('click',function(){
		barhandler.addBar("busy");
	})

	document.getElementById('removeAll').addEventListener('click',function(){
		barhandler.removeAllBars();
	})

})


