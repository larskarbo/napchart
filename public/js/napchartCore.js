/*
This module is the core of the application.
It handles low level storing of the current schedule

*/

window.napchartCore=(function(){
	//private:
	var scheduleData, canvas, selected;

	scheduleData={};
	selected = {};
	canvas = document.getElementById("canvas");

	//public:
	return {

		initialize:function(){
			sampleSchedule.initialize(document.getElementById('sampleSchedules'),'schedule');
			directInput.initialize(canvas);
			draw.initialize(canvas);
			draw.drawUpdate();
			formInput.initialize(document.getElementById('formInputContainer'));
			dom.initialize();
		},

		setSchedule:function(data){
			scheduleData=JSON.parse(JSON.stringify(data));

			//draw
			draw.drawFrame(scheduleData);
			formInput.setData(scheduleData);
		},

		getSchedule:function(){
			return JSON.parse(JSON.stringify(scheduleData));
		},

		addElement:function(name,obj){
			if(typeof scheduleData[name]=='undefined'){
				scheduleData[name]=[];
			}

			scheduleData[name].push(obj);
			console.log('set schedule',scheduleData)
			this.setSchedule(scheduleData);
		},

		removeElement:function(name,count){
			scheduleData[name].splice(count,1);

			this.setSchedule(scheduleData);
		},

		start:function(){

		},

		howMany:function(name){
			if(typeof scheduleData[name]=='undefined'){
				scheduleData[name]=[];
			}
			return scheduleData[name].length;
		},

		lastElement:function(name){
			if(typeof scheduleData[name]=='undefined'){
				console.warn('lastElement received an undefined name');
				return false;
			}

			return scheduleData[name][scheduleData[name].length-1];
		},

		returnElement:function(name,count){
			if(typeof scheduleData[name][count]=='undefined'){
				console.warn('Specified element does not exist');
			}
			return scheduleData[name][count];
		},

		elementExists:function(name,count){
			if(typeof scheduleData[name] != 'undefined'
			&& typeof scheduleData[name][count] != 'undefined')
				return true;
			return false;
		},

		modifyElement:function(name,count,newElement){
			if(typeof scheduleData[name][count]=='undefined'){
				console.warn('Specified element does not exist');
			}
			for(var prop in newElement){
				scheduleData[name][count][prop] = newElement[prop];
			}
			this.setSchedule(scheduleData);
		},

		getCanvas:function(){
			return canvas;
		},

		setSelected:function(name,count){
			//if already the same, exit
			if(typeof selected.name != 'undefined' 
				&& selected.name == name 
				&& selected.count == count)
				return;

			selected.name = name;
			selected.count = count;

			//notify forminput module:
			formInput.setSelected(name,count);

			//animate the appearance of shadow and handles
			animate.frameAnimator(function(easing){
				directInput.setSelectedOpacity(easing);
				draw.drawUpdate();
			});

		}
	};

}());