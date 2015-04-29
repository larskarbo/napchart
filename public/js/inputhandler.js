$(document).ready(function(){

window.sliderUpdater=function(slider){
	startvalue=minutesToClock(Math.round($(slider).val()[0]));
	endvalue=minutesToClock(Math.round($(slider).val()[1]));
	id = $(slider).attr("id");
	id=id.replace("Slider","");
	$('#start'+id).val(startvalue);
	$('#end'+id).val(endvalue);
	updateInputValues(true);
};
window.animateInstant=function(target){
dataKeys=Object.keys(target);
for(d=0;d<dataKeys.length;d++){
	if(typeof data[dataKeys[d]]=="undefined"){
	data[dataKeys[d]]={};
}
countKeys=Object.keys(target[dataKeys[d]]);
	for(i=0;i<countKeys.length;i++){
		if(typeof data[dataKeys[d]][countKeys[i]]=="undefined"){
		data[dataKeys[d]][countKeys[i]]={};
		}
		if(typeof target[dataKeys[d]][countKeys[i]].desc!="undefined")
		data[dataKeys[d]][countKeys[i]].desc=target[dataKeys[d]][countKeys[i]].desc;
		data[dataKeys[d]][countKeys[i]].start=target[dataKeys[d]][countKeys[i]].start;
		data[dataKeys[d]][countKeys[i]].end=target[dataKeys[d]][countKeys[i]].end;
		
	}
}
}
window.animate = function(target,duration,easing,callback) {
currentOrigin={};
distance={};
if(typeof easing!="undefined")
if(easing=="quadraticEasingIn")
easeInQuad = function (t, b, c, d) {
	t /= d;
	return c*t*t + b;
};


	  
      var start = new Date().getTime();
	  if(typeof duration=="undefined"){
		  duration=800;
	  }
	  var end = start+ duration;
	  
	  for(barHolder in target){
		currentOrigin[barHolder]={};
		distance[barHolder]={};
		for(id in target[barHolder]){

		distance[barHolder][id]={};
		currentOrigin[barHolder][id]={};
		  if(typeof data[barHolder][id]=='undefined'){
		//viss de e en ny element så må en finne ut korsån den ska bli lagd
		
		if(target[barHolder][id].end<target[barHolder][id].start){
		target[barHolder][id].end+=1440;	
		}

			  s=target[barHolder][id].start;
			  e=target[barHolder][id].end;
			  middlepoint=((e-s)/2)+s;
			  distance[barHolder][id].start=0;
		   	  distance[barHolder][id].end=target[barHolder][id].end-target[barHolder][id].start;
			  currentOrigin[barHolder][id].start=target[barHolder][id].start;
			  currentOrigin[barHolder][id].end=target[barHolder][id].start;
			  }else{
		  distance[barHolder][id].start=shortestWay(target[barHolder][id].start-data[barHolder][id].start);
		  distance[barHolder][id].end=shortestWay(target[barHolder][id].end-data[barHolder][id].end);
		  
			currentOrigin[barHolder][id]={start:data[barHolder][id].start,end:data[barHolder][id].end}; 
			  }
		//
			  
		}
	  }			

console.log(target);

for(barHolderer in distance){
for(id in distance[barHolderer]){
data[barHolderer][id]={};
if(typeof target[barHolderer][id].desc!="undefined")
data[barHolderer][id].desc=target[barHolderer][id].desc;
}}
console.log(JSON.stringify(barHolder));
      var step = function() {
		  

        timestamp = new Date().getTime();
        progress = Math.min((duration - (end - timestamp))/duration, 1);
	  for(barHolder in distance){
		for(id in distance[barHolder]){
		if(typeof data[barHolder][id]!="undefined"){
		var easingstart = easeInOutQuad(progress,currentOrigin[barHolder][id].start,distance[barHolder][id].start,1);
		var easingend = easeInOutQuad(progress,currentOrigin[barHolder][id].end,distance[barHolder][id].end,1);
		if(easingend>=1440)
		easingend-=1440;
		if(easingstart>=1440)
		easingstart-=1440
		if(easingend<0)
		easingend+=1440;
		if(easingstart<0)
		easingstart+=1440
		data[barHolder][id].start=easingstart;		
		data[barHolder][id].end=easingend;
		}
		}
		}
	  
		
        // If the animation hasn't finished, repeat the step.

        if (progress < 1)
		requestNextAnimationFrame(step);
		else if(typeof callback!="undefined")
		callback();
	  }
      // Start the animation
      return step();
    };



window.updateInputValues=function(instant){
if(typeof instant!="undefined")
instant=true;
else
instant=false;
		//sleep
		
		sleepTemp={};
		
		$("#inputContainerSleeps >  .inputBox").each(function(y){
			
			id = this.id;
			count=id.replace("Sleep","");
			startid="#startSleep"+count;
			endid="#endSleep"+count;
			if(validateClock(startid)&&validateClock(endid)){
			 sleepTemp[count]={};
			//start
			val=$(startid).val();
			hours=val.substring(0,2);
			minutes=((val.substring(2,4)*1)+(hours*60));
			sleepTemp[count].start=minutes;
			//end
			val=$(endid).val();
			hours=val.substring(0,2);
			minutes=((val.substring(2,4)*1)+(hours*60));
			sleepTemp[count].end=minutes;
			//desc
			desc=$("#descSleep"+count).val();
			if(desc!="")
			sleepTemp[count].desc=$("#descSleep"+count).val();
			
		}});


		//nap
		napTemp={};
		$("#inputContainerNaps >  .inputBox").each(function(y){
			id = this.id;
			count=id.replace("Nap","");
			startid="#startNap"+count;
			durationid="#durationNap"+count;
			//make duration into clock
			if(validateClock(startid)){
			napTemp[count]={};
			//start
			val=$(startid).val();
			hours=val.substring(0,2);
			minutes=((val.substring(2,4)*1)+(hours*60));
			napTemp[count].start=minutes;
			//end
			duration=$("#durationNap"+count).val();
			minutes=(minutes*1)+(duration*1);
			napTemp[count].end=minutes;
			//desc
			desc=$("#descNap"+count).val();
			if(desc!="")
			napTemp[count].desc=$("#descNap"+count).val();
			}
		});

		//work
		workTemp={};
		$("#inputContainerWorks >  .inputBox").each(function(y){
			id = this.id;
			count=id.replace("Work","");
			startid="#startWork"+count;
			endid="#endWork"+count;
			if(validateClock(startid)&&validateClock(endid)){
			 workTemp[count]={};
			//start
			val=$(startid).val();
			hours=val.substring(0,2);
			minutes=((val.substring(2,4)*1)+(hours*60));
			workTemp[count].start=minutes;
			//end
			val=$(endid).val();
			hours=val.substring(0,2);
			minutes=((val.substring(2,4)*1)+(hours*60));
			workTemp[count].end=minutes;
			//desc
			desc=$("#descWork"+count).val();
			if(desc!="")
			workTemp[count].desc=desc;
			}
		});

		
allTemp={
	alfa:workTemp,
	charlie:sleepTemp,
	delta:napTemp};
	
if(instant)
animateInstant(allTemp);
else
animate(allTemp);


		}

	


});