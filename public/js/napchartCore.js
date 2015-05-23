window.napchartCore=(function(){
	//private:
	var scheduleData=[]

	//public:
	return {

		setSchedule:function(data){
			console.dir(data);
			scheduleData=data;

			//draw
			draw.drawFrame(scheduleData);
		},

		addToScedule:function(data){

		},

		removeFromSchedule:function(data){

		},

		start:function(){

		}
	}

}());