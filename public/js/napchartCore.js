/*
This module is the core of the application.
It handles low level storing of the current schedule

*/

window.napchartCore=(function(){
	//private:
	var scheduleData={

	};

	var canvas = document.getElementById("canvas");

	//public:
	return {

		initialize:function(){
			sampleSchedule.initialize(document.getElementById('sampleSchedules'),'schedule');
			directInput.initialize(canvas);
			draw.initialize(canvas);
			draw.drawUpdate();
		},

		setSchedule:function(data){
			console.dir(data);
			scheduleData=JSON.parse(JSON.stringify(data));

			//draw
			draw.drawFrame(scheduleData);
		},

		getSchedule:function(){
			return JSON.parse(JSON.stringify(scheduleData));
		},

		addToSchedule:function(name,obj){
			if(typeof scheduleData[name]=='undefined'){
				scheduleData[name]=[];
			}

			scheduleData[name].push(obj);
			this.setSchedule(scheduleData);
		},

		removeFromSchedule:function(name,index){
			scheduleData[name].splice(index,1);
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

		modifyElement:function(name,count,newElement){
			if(typeof scheduleData[name][count]=='undefined'){
				console.warn('Specified element does not exist');
			}
			for(var prop in newElement){
				scheduleData[name][count][prop] = newElement[prop];
			}
			draw.drawFrame(scheduleData);
		},

		getCanvas:function(){
			return canvas;
		}
	};

}());