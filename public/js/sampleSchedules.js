/**

This module handles sampleSchedules
*Not in use right now

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

	function chooseSchedule(element,dropDown){
		var schedule=element.id;
		if(typeof schedules[schedule] != 'undefined'){
			napchartCore.setSchedule(schedules[schedule]);
			dropDown.innerHTML = schedule;
		}else{
			throw new Error("Could not find the schedule requested")
		}
	}
	
	var schedules={
		monophasic:	{core:[{start:120, end:330 }, {start:360, end:450 } ], nap:[{start:960, end:980 } ] , busy:[{start:600, end:844 } ]},
		siesta:	{core:[{start:320, end:430 }, {start:360, end:450 } ] , nap:[{start:960, end:980 } ] , busy:[{start:600, end:1044 } ]},
		segmented: {busy:[{start:540,end:1020},{start:1080,end:1140},{start:1200,end:1260},{start:1320,end:1380}],core:[{start:1410,end:1530},{start:1620,end:1740},{start:1830,end:1950},{start:2040,end:2160}],nap:[{start:960,end:980},{start:1040,end:1060}]}
	,uberman: {"core":[],"nap":[{"start":242,"end":262},{"start":1197,"end":1217},{"start":959,"end":979},{"start":479,"end":499},{"start":1439,"end":19},{"start":721,"end":741}],"busy":[{"start":503,"end":904}]}
	}
	

	//public:
	return {
		initialize:function(container,dropDown){
			var scheduleLinks;
			scheduleLinks = container.getElementsByTagName('li');


			for(i=0;i<scheduleLinks.length;i++){
				scheduleLinks[i].addEventListener('click',function(){
					chooseSchedule(this,dropDown);
				})
			}
		},
		getSchedules:function(){
			return schedules;
		}
	}

}());