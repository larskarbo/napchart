/**

This module serializes the schedule to a easily readable and understandable form in text
Uses jQuery for the flash effect

**/

window.textSerialize=(function(){
	//private
	var TEXTAREA = document.getElementById('textSchedule');
	var prevData;

	function dataToText(data){
		var data = helpers.clone(data);
		var output = "";

		for(var name in data){

			//sort array by start value:

			data[name] = data[name].sort(function(a, b){
			    return a.start-b.start
			});

			//name to uppercase
			var nameCap = name[0].toUpperCase() + name.slice(1);
			var start, end;

			//iterate and add
			for(var i = 0; i < data[name].length; i++){
				start = helpers.minutesToClock(data[name][i].start);
				end = helpers.minutesToClock(data[name][i].end);

				output += nameCap + ' ' + (i+1) + ': ' + start + ' - ' + end + '\n';
			}

		}
		return output;
	}

	function flash(){
		// $(TEXTAREA).flash();
		$(TEXTAREA).parent().parent().addClass('flash');
		setTimeout(function(){
			$(TEXTAREA).parent().parent().removeClass('flash');
		},2000)
	}

	//public:
	return{
		update:function(data){
			if(typeof data == 'undefined'){
				var data = prevData;
			}else{
				prevData = data;
			}

			var text = dataToText(data);

			TEXTAREA.innerHTML = text;
		},

		setChartid:function(chartid){
			textSerialize.update();
			TEXTAREA.innerHTML += 'http://napchart.com/' + chartid;
			flash();
		}

	}

}())