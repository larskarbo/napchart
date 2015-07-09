/**

This module handles history - redos and undos as well as what happens when someone clicks back in the browser

**/

window.chartHistory=(function(){
	//private
	var currentElement = -1;

	//the history array contains all the history in history elements
	var history = [];
	//example history element: {data:%data% ,action: 'added core 1', chartid: 'tuw5e'}

	function switchTo(index){
		if(typeof history[index] == 'undefined'){
			console.warn('history element does not exist');
			return;
		}

		//check if element has chartid
		if(typeof history[index].chartid != 'undefined'){
			napchartCore.setURL(history[index].chartid);
		}

		napchartCore.setSchedule(history[index].data);
		currentElement = index;
	}

	function buttonClick(){

		var enabledClasses = 'black-text grey lighten-3 waves-effect';
		var disabledClasses = 'grey-text grey lighten-2 disabled';

		if(currentElement == history.length-1){
			//disable forward button
			$('.history#forward').removeClass(enabledClasses);
			$('.history#forward').addClass(disabledClasses);
		}else{
			//enable forward button
			$('.history#forward').removeClass(disabledClasses);
			$('.history#forward').addClass(enabledClasses);
		}

		if(currentElement == 0){
			//disable back button
			$('.history#back').removeClass(enabledClasses);
			$('.history#back').addClass(disabledClasses);
		}else{
			//enable back button
			$('.history#back').removeClass(disabledClasses);
			$('.history#back').addClass(enabledClasses);
		}


	}

	//public:
	return{
		initialize:function(data){
			chartHistory.add(data,'');

			dom.bindBackForward();

			buttonClick();
		},

		add:function(data,action){
			//adds a history element to the history array

			//clone data
			data = helpers.clone(data);

			//data = snapshot of all chart data
			//action = the last action done

			//check if the new data is different from the previous. If not, abort.
			if(history.length > 0 && JSON.stringify(data) == JSON.stringify(history[history.length-1].data)){
				console.log('history: nothing changed');
				return;
			}

			//if currentElement is not at the end, delete the elements after current
			if(currentElement != history.length-1){
				history.splice(currentElement+1,history.length-(currentElement+1));
			}

			history.push({
				data:data,
				action:action
			});


			//add to counter
			currentElement++;

			buttonClick();
		},

		back:function(){
			if(currentElement == -1){
				console.warn('can\'t undo more');
				return;
			}

			switchTo(currentElement-1);

			buttonClick();
		},

		forward:function(){
			if(currentElement == history.length-1){
				console.warn('already at latest element');
				return;
			}

			switchTo(currentElement+1);

			buttonClick();
		},

		setChartid:function(chartid){
			//assign chartid to current history element
			history[currentElement].chartid = chartid;
		},

		checkIfExists:function(data){
			//takes a data object and checks if the user has saved an identical data object in the history
			//returns the chartid

			//json may be a bad way to compare two objects (http://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects)
			var jsondata = JSON.stringify(data);
			var element;

			for(var index in history){
				element = history[index];

				if(typeof element.chartid == 'undefined')
					continue;

				if(JSON.stringify(element.data) == jsondata){

					return element.chartid;
				}
			}

			return false;
		}
	}

}())