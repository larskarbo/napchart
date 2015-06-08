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
		add = '<div class="'+className+'">';
		add += 'ALLLOOOOHHOHOHOHOHOHO';
		add += '</div>';
		container.innerHTML += add;
	}

	function deleteBlock(name,count){
		
	}

	function blockExists(name,count){
		console.log($(container).find("."+name+count).length );
		if($(container).find("."+name+count).length > 0)
			return true;
		else
			return false;
	}

	function updateValues(data){

		for(var name in data){
			for(i = 0; i < data[name].length; i++){
				if(!blockExists(name,i)){
					createBlock(name,i);
				}
			}
		}
	}

	//public:
	return{
		initialize:function(containerDiv){
			container = containerDiv;

		},

		setData:function(data){
			updateValues(data);
		}
	}

}())