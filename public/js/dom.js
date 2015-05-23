function addBar(name){
	//find start and end point
	var start=292;
	var end=489;

	obj={
		start:start,
		end:end
	}

	napchartCore.addToSchedule(name,obj);
}


$(document).ready(function(){

	document.getElementById('addCore').addEventListener('click',function(){
		addBar("core");
	})

})


