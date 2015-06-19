/**

This module makes statistic information about the current schedule

**/

window.statistics=(function(){
	//private
	var container;


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

			sleep = totalTime( helpers.merge(data,['core','nap']) );
			sleep = prettyTime( sleep );

			free = totalTime( helpers.merge(data,['nap','core','busy']) ,true);
			free = prettyTime( free );



			$(".sleep.stat-time").html(sleep.hours + '||' + sleep.minutes);
			$(".free.stat-time").html(free.hours + '||' + free.minutes);

		}
	}

}());
