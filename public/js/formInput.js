/**

This module handles input through html forms.
This module uses JQuery

**/

window.formInput=(function(){
	//private
	var container, onlySelected;

	onlySelected = true;

	function createBlock(name,count){
		var className, add;
		className = name+count;
		add = '<div class="'+className+' inputBox">';
		add += name + count;
		add += ':  <input class="clock start" maxlength="4" type="text">';
		add += ' - <input class="clock end" maxlength="4" type="text">';
		add += '<button class="remove" id="Sleep'+count+'">remove</button>';
		add += '</div>';

		container.innerHTML += add;
	}

	function deleteBlock(name,count){
		
	}

	function blockExists(name,count){
		if($(container).find("."+name+count).length > 0)
			return true;
		else
			return false;
	}

	function updateValues(data){
		var block,start,end;

		for(var name in data){
			for(i = 0; i < data[name].length; i++){
				if(!blockExists(name,i)){
					console.log('hello');
					createBlock(name,i);
				};
				block = $(container).find('.'+name+i);
				start = helpers.minutesToClock(data[name][i].start);
				end = helpers.minutesToClock(data[name][i].end);
				console.log('startend',start,end);
				block.find('.start').val(start);
				block.find('.end').val(end);
			}
		}
	}

	//public:
	return{
		initialize:function(containerDiv){
			container = containerDiv;

			//bind remove buttons
			dom.bindRemoveButtons(container);
		},

		setData:function(data){
			updateValues(data);
		},

		setSelected:function(name,count){
			selected ={
				name:name,
				count:count
			};

			$(container).children().removeClass('selected');
			$(container).find('.'+name+count).addClass('selected');
		}
	}

}())