/**

This module makes statistic information about the current schedule

**/

window.statistics=(function(){
	//private
	var container;

	function mergeFuck(data, names){
		var preMerge = [];

		//go through the specified names in the data object
		//and save all elements in a new preMerge array
		for(var i=0; i < names.length; i++){
			console.log(names[i]);
			for(count in data[names[i]]){
				preMerge.push(data[names[i]][count])
			}

		}

		console.log(preMerge);
	}
	//public:
	return{
		initialize:function(cont){
			container = cont;

		},
		update:function(data){
			var totalSleep;

			totalSleep = mergeFuck(data,['core']);



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