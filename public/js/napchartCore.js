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

		addToSchedule:function(name,data){
			console.log(name,data,scheduleData);
		},

		removeFromSchedule:function(data){

		},

		start:function(){

		}
	}

}());