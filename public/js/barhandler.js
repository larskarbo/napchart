/*
this module handles adding and deleting of bars from the dom
*/


window.barhandler = (function(){
	//private:
	barAddRules={
		core:{
			size:120,
			location:1410,
			distance:90
		},
		nap:{
			size:20,
			location:960,
			distance:60
		},
		busy:{			
			size:60,
			location:540,
			distance:60,
			specific:{
				0:{
					size:480
				}
			}
		}
	}

	//public:
	return {
		addBar:function(name){

			var count = napchartCore.howMany(name);
			var lastElement = napchartCore.lastElement(name);
			var rules = {};

			//loop through object to see if any specific rules exist
			//for this count.
			for(var rule in barAddRules[name]){
				if(typeof barAddRules[name].specific!='undefined'
					&& typeof barAddRules[name].specific[count]!='undefined'
					&& typeof barAddRules[name].specific[count][rule]!='undefined'){
					//specific rule for this count
					//for example: first core added should be longer
					rules[rule]=barAddRules[name].specific[count][rule];
				}else{
					rules[rule]=barAddRules[name][rule]
				}
			}

			if(count>0)
				var start=helpers.calc(lastElement.end,rules.distance);
			else{
				var start = rules.location;
			}
			
			var end = helpers.calc(start,rules.size);

			obj={
				start:start,
				end:end
			}
			
			napchartCore.addElement(name,obj);
		},
	
		removeBar:function(name,count){
			napchartCore.removeElement(name,count);
		},

		removeAllBars:function(names){
			//removes all bars within the specified name object
			//names could be: ['nap','core']

			//removes all if names==empty

			var data=napchartCore.getSchedule();

			if(typeof names=='undefined'){
				names=Object.keys(data)
			}

			for(i=0;i<names.length;i++){
				delete data[names[i]];
			}
			napchartCore.setSchedule(data);
		}
	}

}())