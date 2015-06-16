/**

This module makes statistic information about the current schedule

**/

window.statistics=(function(){
	//private
	var container;

	function merge(data, names){
		//merges specified bars into a new array where no elements overlap
		var start,end;
		var data = helpers.clone(data);
		var preMerge = [],
		merged = [];



		console.log('data: ',JSON.stringify(data));

		//go through the specified names in the data object
		//and save all elements in a new preMerge array
		for(var i=0; i < names.length; i++){
			for(count in data[names[i]]){
				preMerge.push(data[names[i]][count])
			}
		}


		//(example) preMerge = [{start:440,end:460},{start:1100,end:100}]

		//to avoid confusion when the end value is lower than the start value, split up those elements

		for(var i = 0; i < preMerge.length; i++){
			start = preMerge[i].start;
			end = preMerge[i].end;

			if(start > end){
				// ex. start:1100 end:100
				preMerge[i].end = 1440;
				preMerge.push ({start:0,end:end})
				// now start:1100 end:1440
				// and start:0 end:100
			}
		}

		//sort preMerge by start value:

		preMerge = preMerge.sort(function(a, b){
			return a.start-b.start
		});


		//push first element
		merged.push(preMerge[0]);

		//then iterate the rest
		for(var i = 1;i < preMerge.length; i++){
			start = preMerge[i].start;
			end = preMerge[i].end;
			prevEnd = merged[merged.length-1].end;

			if(start <= prevEnd && end > prevEnd){
				//start is inside prev. element
				//merge:
				merged[merged.length-1].end = end;
			}
			else if(start > prevEnd){
				//start is outside prev. element
				//create new element in array:
				merged.push({
					start:start,
					end:end
				})
			}

		}
		console.log(JSON.stringify(merged));

		return merged;
	}

	function totalTime(elements,invert){
		//checks how long time all elements in specified array are totally
		var minutes = 0;


		for(var i = 0; i < elements.length; i++){
			if(typeof elements[i] != 'undefined')
				minutes += helpers.calc(elements[i].end,-elements[i].start);
		}

		if(invert==true){
			minutes = 1440-minutes;
		}

		return minutes;
	}

	function prettyTime(min){
		var hours, minutes;

		hours = Math.floor(min / 60) + "";
		minutes = min % 60 + "";
		minutes = Math.floor(minutes);

		return {
			hours:hours,
			minutes:minutes
		};
	};

	//public:
	return{
		initialize:function(cont){
			container = cont;

		},
		update:function(data){
			var sleep, free;

			sleep = totalTime( merge(data,['core','nap']) );
			sleep = prettyTime( sleep );

			free = totalTime( merge(data,['nap','core','busy']) ,true);
			free = prettyTime( free );



			$(".sleep.stat-time").html(sleep.hours + '||' + sleep.minutes);
			$(".free.stat-time").html(free.hours + '||' + free.minutes);

		}
	}

}());

window.statisticsOld = function(){

//totalSleep
totalSleep=0;
$.each(countOverlappingExcluder(['charlie','delta']),function(i,v){
	if(v.end<v.start)
	totalSleep+=((1440-v.start)+v.end);
	else{
	totalSleep+=v.end-v.start;
	}
});
hm=minutesToStatistics(totalSleep);
$(".totalSleep.stat-time").html(hm[0]+"h "+hm[1]+"m");

//totalAwake
//totalAwake=1440-totalSleep;
//hm=minutesToStatistics(totalAwake);
//$("span.totalAwake").html(hm[0]+"h "+hm[1]+"m");
	
//timeSaved and timeSavedYear
timeSaved=480-totalSleep;
if(timeSaved>0){
//hm=minutesToStatistics(timeSaved);
//$("span.timeSaved").html(hm[0]+"h "+hm[1]+"m");

timeSavedYear=timeSaved*365;
hm=minutesToStatistics(timeSavedYear);
$(".timeSavedYear.stat-time").html(hm[0]+"h");

} else{
	//$("span.timeSaved").html("0h 0m");
	$(".timeSavedYear.stat-time").html("0h");
}

//busyTime
busyTime=0;
$.each(countOverlappingExcluder(true,true,true),function(i,v){
	if(v.end<v.start)
	busyTime+=((1440-v.start)+v.end);
	else{
	busyTime+=v.end-v.start;
	}
});

//hm=minutesToStatistics(busyTime);
//$("span.busyTime").html(hm[0]+"h "+hm[1]+"m");

//freeTime
freeTime=1440-busyTime;
hm=minutesToStatistics(freeTime);
$(".freeTime.stat-time").html(hm[0]+"h "+hm[1]+"m");

//totalWork
//totalWork=0;
//$.each(countOverlappingExcluder(true,false,false,false),function(i,v){
//	totalWork+=range(v.start,v.end);
//});
//hm=minutesToStatistics(totalWork);
//$("span.totalWork").html(hm[0]+"h "+hm[1]+"m");
	
};