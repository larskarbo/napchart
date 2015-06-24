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
		add += name + ' ' + (count+1);
		add += ':  <input class="clock start" length="4" type="text">';
		add += ' - <input class="clock end" length="4" type="text">';
		add += '<input type="hidden" name="name" value="'+name+'">';
		add += '<input type="hidden" name="count" value="'+count+'">';
		add += '<button class="remove">remove</button>';
		add += '</div>';

		$(container).append(add);
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
					createBlock(name,i);
				};
				block = $(container).find('.'+name+i);
				start = helpers.minutesToClock(data[name][i].start);
				end = helpers.minutesToClock(data[name][i].end);
				block.find('.start').val(start);
				block.find('.end').val(end);
			}
		}
	}

	function prune(data){
		//removes blocks not specified in the data objects
		var blocks, name, count;

		$.each($(container).find('.inputBox'), function(key,block){
			name = $(block).find('[name="name"]').val();
			count = $(block).find('[name="count"]').val();
			if(!napchartCore.elementExists(name,count)){
				$(block).remove();
			}
		})
	}

	//public:
	return{
		initialize:function(containerDiv){
			container = containerDiv;

			//bind remove buttons
			dom.bindRemoveButtons(container);

			//bind hover events
			dom.bindHoverOnFormInput(container);
		},

		setData:function(data){
			updateValues(data);
			prune(data);
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