/**

This module handles input through html forms.
This module uses jQuery

**/

window.formInput=(function(){
	//private
	var container, showAllElements;
	var prevData;

	function createBlock(name,count){
		var className, add;
		className = name+count;
		add = '<div class="'+className+' inputBox">';
		add += name + ' ' + (count+1);
		add += ':  <input class="clock start" length="4" type="text">';

		if(name == 'nap')
			add += ' - <input class="duration" type="number" min="10" max="90" value="20"> min'
		else
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

		if(typeof data == 'undefined'){
			var data = prevData;
		}

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

		if(!showAllElements){
			$(container).children().addClass('hidden');
		}else{
			$(container).children().removeClass('hidden');
		}

		prevData = data;
	}

	function prune(data){
		//removes blocks not specified in the data objects
		var blocks, name, count;

		$.each( $(container).find('.inputBox') , function(key,block){

			name = $(block).find('[name="name"]').val();
			count = $(block).find('[name="count"]').val();

			if(!napchartCore.elementExists(name,count)){
				$(block).remove();
			}
		})
	}

	function unfocus(){
		var block, name, count, type, minutes, clock;
		var newElement = {};

		block = $(this).parent();

		name = $(block).find('[name="name"]').val();
		count = $(block).find('[name="count"]').val();

		if($(this).hasClass('start'))
			type = 'start';
		else if($(this).hasClass('end'))
			type = 'end';

		clock = validate($(this).val());
		$(this).val(clock);
		minutes = helpers.clockToMinutes(clock);

		newElement[type] = minutes;

		napchartCore.modifyElement(name,count,newElement);
	}

	function validate(value){
		var hours, minutes;

		if(value.length == 1)
			value="0"+value+"00";
		if(value.length == 2)
			value=value+"00";
		if(value.length == 3)
			value="0"+value;
		
		hours = value.substring(0,2);
		minutes = value.substring(2,4);

		if(hours<=23 && minutes<=59){
			return value;
		}else{
			return false;
		}
		

	}


	//public:
	return{
		initialize:function(containerDiv){
			container = containerDiv;

			//bind remove buttons
			dom.bindRemoveButtons(container);

			//bind hover events
			dom.bindHoverOnFormInput(container);

			//bind unfocus events
			$(container).on('blur','.clock',unfocus);

			//prevent deselecting
			container.addEventListener('mousedown',function(e){
				e.stopPropagation();
			});
		},

		setData:function(data){
			updateValues(data);
			prune(data);
		},

		setSelected:function(array){

			$(container).children().removeClass('selected');

			if(typeof array == 'undefined'){
				selected = [];
				return
			}

			array.forEach(function(k){
				$(container).find('.'+k.name+k.count).addClass('selected').removeClass('hidden');
			})
			

		},

		setSettings:function(object){
			showAllElements = object.showAllElements;
			console.log(showAllElements);
			updateValues();
		}
	}

}())