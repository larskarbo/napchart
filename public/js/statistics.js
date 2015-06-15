/**

This module makes statistic information about the current schedule

**/

window.statistics=(function(){
	//private
	var container;

	function merge(data, names){
		//merges specified bars into a new array where no elements overlap
		var start,end;
		var preMerge = [],
		merged = [];

		//go through the specified names in the data object
		//and save all elements in a new preMerge array
		for(var i=0; i < names.length; i++){
			for(count in data[names[i]]){
				preMerge.push(data[names[i]][count])
			}
		}

		//(example) preMerge = [{start:440,end:460},{start:1100,end:100}]

		//to avoid confusion when the end value is lower than the start value, split up those elements

		for(i = 0; i < preMerge.length; i++){
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

			console.log(start,end,prevEnd);
			if(start <= prevEnd && end > prevEnd){
				//start is inside prev. element
				//merge:
				prevEnd = end;
			}
			else if(start > prevEnd){
				//start is outside prev. element
				//create new element in array:
				merged.push({
					start:start,
					end:end
				})
			}

			merged[merged.length-1].end = prevEnd;
		}

		console.log(JSON.stringify(merged));
		return "two minutes";
	}
	//public:
	return{
		initialize:function(cont){
			container = cont;

		},
		update:function(data){
			var totalSleep;

			totalSleep = merge(data,['core']);



			$(".totalSleep.stat-time").html(totalSleep);
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