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
		console.log(history,index,history[index].data);
		napchartCore.setSchedule(history[index].data);
		currentElement = index;
	}

	//public:
	return{
		initialize:function(data){
			chartHistory.add(data,'');

			dom.bindBackForward();
		},

		add:function(data,action){
			//adds a history element to the history array
			data = helpers.clone(data);

			//data = snapshot of all chart data
			//action = the last action done

			//if currentElement is not at the end, delete the elements after current
			if(currentElement != history.length-1){
				//TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}

			history.push({
				data:data,
				action:action
			});

			//add to counter
			currentElement++;
		},

		back:function(){
			if(currentElement == -1){
				console.warn('can\'t undo more');
				return;
			}

			switchTo(currentElement-1);
		},

		forward:function(){
			if(currentElement == history.length-1){
				console.warn('already at latest element');
				return;
			}

			switchTo(currentElement+1)
		}
	}

}())