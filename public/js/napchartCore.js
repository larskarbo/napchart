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

		initialize:function(data){
			if(typeof data == 'undefined')
				data = {};

			interactCanvas.initialize(canvas);
			draw.initialize(canvas);
			draw.drawUpdate();
			formInput.initialize(document.getElementById('formInputContainer'));
			dom.bindAddButtons();
			dom.bindSaveButton(document.getElementById('saveContainer'));
			statistics.initialize(document.getElementById('stat-container'));

			chartHistory.initialize(data);

			feedback.initialize();


			//maybe throw this into a chartLoader module?
			if(typeof fromServer != 'undefined'){
				napchartCore.setSchedule(fromServer.data);
			}
		},

		setSchedule:function(data){
			scheduleData=JSON.parse(JSON.stringify(data));

			
			draw.drawFrame(data);
			formInput.setData(data);
			statistics.update(data);
			textSerialize.update(data);
			dom.setOG(draw.getImage);
		},

		getSchedule:function(){
			return JSON.parse(JSON.stringify(scheduleData));
		},

		addElement:function(name,obj){
			if(typeof scheduleData[name]=='undefined'){
				scheduleData[name]=[];
			}

			scheduleData[name].push(obj);
			this.setSchedule(scheduleData);

			chartHistory.add(scheduleData,'added '+name);
		},

		removeElement:function(name,count){
			scheduleData[name].splice(count,1);

			this.setSchedule(scheduleData);

			chartHistory.add(scheduleData,'removed ' + name + ' ' + (count-1));
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



			//if empty
			if(typeof name == 'undefined' || typeof count == 'undefined'){
				selected = {};

				formInput.setSelected();

				return;
			}

			selected.name = name;
			selected.count = count;

			//notify forminput module:
			formInput.setSelected(name,count);

			//animate the appearance of shadow and handles
			animate.frameAnimator(function(easing){
				interactCanvas.setSelectedOpacity(easing);
				draw.drawUpdate();
			});

		},

		setURL:function(chartid){

			textSerialize.setChartid(chartid);

			// if url in browser is wrong
			if(window.location.pathname != '/'+chartid){
				//change url in browser
				window.history.pushState({chartid:chartid}, "", '/'+chartid);
			}else{
				console.info('url was right',chartid)
			}

			//notify chartHistory that current history elements should be linked with this chartid
			chartHistory.setChartid(chartid);
		},

		startLoading:function(){
			//dom.startLoading();
		},

		finishLoading:function(){
			//dom.finishLoading();
		}
	};

}());