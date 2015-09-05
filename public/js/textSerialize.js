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

				if(output.length > 0){
					output += '\n';
				}

				output += nameCap + ' ' + (i+1) + ': ' + start + ' - ' + end;

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

	function resize(){
		var lineBreaks = (TEXTAREA.value.match(/\n/g)||[]).length;

		if(lineBreaks < 4)
			lineBreaks = 4;
		else
			lineBreaks++;

		TEXTAREA.rows = lineBreaks;
	}

	//public:
	return{
		update:function(data){
			if(typeof data == 'undefined'){
				var data = prevData;
			}
			var text = dataToText(data);

			if(helpers.compare(data,prevData)){
				//if nothing changed
				return
			}

			TEXTAREA.innerHTML = text;
			resize();

			prevData = data;
		},

		setChartid:function(chartid){
			var string = 'http://napchart.com/' + chartid;
			textSerialize.update();

			flash();

			if(TEXTAREA.innerHTML.search(string) >= 0)
				return;

			TEXTAREA.innerHTML += '\n' + string;
			resize();
		}

	}

}())