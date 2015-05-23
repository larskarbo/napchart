/**
*
*
*
*
**/

window.sampleSchedule = (function () {
	//private:
	function whichSchedule(data){
		if(cores===1&&naps===0)
			return "monophasic";
		else if(cores===2&&naps===0)
			return "segmented";
		else if(cores===1&&naps===1)
			return "siesta";
		else if(cores===2&&naps===1)
			return "dualcore1";
		else if(cores===0&&naps===3)
			return "triphasic";
		else if(cores===1&&naps>=2)
			return "everyman";
		else if(cores===0&&naps===6)
			return "uberman";
		else
			return "none";
	}
	function updateScheduleIndicator(immidiateTo){
		if(typeof immidiateTo=="undefined"){
			currentActive=whichSchedule();	
			if(currentActive=="none"){
				$("#sampleScheduleActive").fadeOut();
				return;
			}
		}
		else{
			currentActive=immidiateTo;}

			prevTop=document.getElementById("sampleSchedules").getBoundingClientRect().top;
			newTop=document.getElementById(currentActive).getBoundingClientRect().top;
			travelTop=newTop-prevTop;
			if(typeof immidiateTo!="undefined"){
				$("#sampleScheduleActive").css("top",travelTop);
				$("#sampleScheduleActive").css("display","default");
			}
			if($("#sampleScheduleActive").css("display")=="none"){
				$("#sampleScheduleActive").css("top",travelTop);
				$("#sampleScheduleActive").fadeIn();
			}else
			$("#sampleScheduleActive").animate({top:travelTop});
	};

	function chooseSchedule(){
		var schedule=this.id;
		if(typeof schedules[schedule] != 'undefined'){
			napchartCore.setSchedule(schedules[schedule]);
		}else{
			throw new Error("Could not find the schedule requested")
		}
	}
	
	var schedules={
		"monophasic":	[{name:"core", data:[{start:120, end:330 }, {start:360, end:450 } ] }, {name:"nap", data:[{start:960, end:980 } ] }, {name:"busy", data:[{start:598, end:844 } ] } ],
		"siesta": [{name:"core", data:[{start:1000, end:100 }, {start:600, end:720 } ] }, {name:"nap", data:[{start:540, end:560 } ] }, {name:"busy", data:[{start:400, end:900 } ] } ]
	}
	


	//public:
	return {
		initialize:function(container,className){
			var scheduleLinks = container.getElementsByClassName(className);
			console.log(scheduleLinks);
			for(i=0;i<scheduleLinks.length;i++){
				scheduleLinks[i].addEventListener('click',chooseSchedule)
			}
		}
	}

}());