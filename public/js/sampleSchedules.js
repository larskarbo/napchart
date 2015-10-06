/**

This module handles sampleSchedules

**/

window.sampleSchedule = (function () {
	//private:
	var CONTAINER;

	function whichSchedule(data){
		var naps = 0, cores = 0; 

		if(typeof data.nap != 'undefined')
			naps = data.nap.length;

		if(typeof data.core != 'undefined')
			cores = data.core.length;


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

	function chooseSchedule(element){
		var schedule=element.id;
		if(typeof schedules[schedule] != 'undefined'){
			// we don't want to remove busy elements
			var currentSchedule = napchartCore.getSchedule();
			var newSchedule = schedules[schedule];

			if(typeof currentSchedule.busy != 'undefined'){
				newSchedule.busy = currentSchedule.busy;
			}

			setIndicator(schedule, false);
			napchartCore.setSchedule(newSchedule);

		}else{
			throw new Error("Could not find the schedule requested")
		}
	}

	function setIndicator(schedule, animate){
		var container = CONTAINER;
		var indicator = container.querySelector('#scheduleIndicator');

		var targetDiv = container.querySelector('#' + schedule);

		var containerTop = container.getBoundingClientRect().top;
		var targetTop = targetDiv.getBoundingClientRect().top;
		var travel = targetTop - containerTop;

		$(container).children().removeClass('selected');

		if(schedule == 'none'){
			$(indicator).fadeOut();
			return;
		}

		indicator.style.display = "block";

		$(targetDiv).addClass('selected');

		if(animate){
			//use when determined schedule
			$(indicator).animate({top:travel});
		}else{
			//use when click on schedule
			indicator.style.top = travel + 'px';
		}
	};

		var schedules={
			monophasic:	{core:[{start:1410, end:450 }]},
			siesta:	{core:[{start:1380,end:240}],nap:[{start:780,end:870}]},
			segmented: {core:[{start:1320,end:90},{start:210,end:420}]},
			dualcore1: {core:[{start:1320,end:90},{start:390,end:480}],nap:[{start:960,end:980}]},
			triphasic: {core:[],nap:[{start:390,end:480},{start:870,end:960},{start:1350,end:1440}]},
			everyman: {core:[{start:1260,end:30}],nap:[{start:250,end:270},{start:880,end:900},{start:490,end:510}]},
			uberman: {nap:[{start:960,end:980},{start:480,end:500},{start:720,end:740},{start:1200,end:1220},{start:0,end:20},{start:240,end:260}]}
		}


	//public:
	return {
		initialize:function(container){
			CONTAINER = container;
			var scheduleLinks = container.getElementsByClassName('sampleSchedule');

			for(i=0;i<scheduleLinks.length;i++){
				scheduleLinks[i].addEventListener('click',function(){
					chooseSchedule(this);
				})
			};


		},
		getSchedules:function(){
			return schedules;
		},

		detectSchedule:function(data){
			var schedule = whichSchedule(data);

			setIndicator(schedule, true);
		}
	}

}());