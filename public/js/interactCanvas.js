$(document).ready(function(){
rangeDebug="no";
window.handle={x:0,y:0};
window.mdown ={};
window.nearest = {};
alreadySelected=false;
lockSleep=false;
snapFive=false;

document.getElementById("lockSleep").addEventListener ("change",checkLockSleep);
document.getElementById("snapFive").addEventListener ("change",checkSnapFive);


function checkLockSleep(){
	if (document.getElementById('lockSleep').checked) {
		lockSleep=true;
	}else{
		lockSleep=false;
	}
}
function checkSnapFive(){
	if (document.getElementById('snapFive').checked) {
		snapFive=true;
	}else{
		snapFive=false;
	}
}

function getMouseCoordinates(e){
	window.mx=e.clientX - canvas.getBoundingClientRect().left;
	window.my=e.clientY - canvas.getBoundingClientRect().top;
	window.dx=e.clientX - canvas.getBoundingClientRect().left-center;
	window.dy=e.clientY - canvas.getBoundingClientRect().top-center;
}
function getTouchCoordinates(e){
	touchObj=e.touches[0];
	window.mx=touchObj.clientX - canvas.getBoundingClientRect().left;
	window.my=touchObj.clientY - canvas.getBoundingClientRect().top;
	window.dx=touchObj.clientX - canvas.getBoundingClientRect().left-center;
	window.dy=touchObj.clientY - canvas.getBoundingClientRect().top-center;

}

document.getElementById("myCanvas").addEventListener('mousedown',mouseDown);
document.getElementById("myCanvas").addEventListener('touchstart',touch);
document.addEventListener('mousemove',getMouseCoordinates);
document.addEventListener('touchmove',getTouchCoordinates);
document.addEventListener('mousemove',move);
document.addEventListener('touchmove',move);
document.addEventListener('mouseup',release);
document.addEventListener('touchend',release);

function touch(e){
getTouchCoordinates(e);
checkHit(e);
}
function mouseDown(e){
	e.preventDefault();
getMouseCoordinates(e);
checkHit(e);
}

function checkHit(e){
dataKeys=Object.keys(data);
	for(d=0;d<dataKeys.length;d++){
countKeys=Object.keys(data[dataKeys[d]]);
	for(i=0;i<countKeys.length;i++){
		
	  if(dataKeys[d]=="charlie"){
		  ctx.beginPath();
		  ctx.arc(senter, senter,totalWidth(40),klokkegrader(data['charlie'][i].start),klokkegrader(data['charlie'][i].end), false);
		  f=minutesToXY_OIC(data.charlie[i].end,73);
		  ctx.lineTo(f.x,f.y);
		  ctx.arc(senter, senter,sirkel3,klokkegrader(data['charlie'][i].end),klokkegrader(data['charlie'][i].start), true);
		  ctx.closePath();
		  if(ctx.isPointInPath(mx,my)){
		  position=calc(XYtoMinutes({x:dx,y:dy}),-data['charlie'][i].start);
		console.log(position);
		  nearest={barHolder:"charlie",count:i,type:"middle",position:position,distance:35}
		  }
	  }
		  
	  
		for(l=0;l<startend.length;l++){
			if(dataKeys[d]=="charlie"){
				minutes=data.charlie[i][startend[l]];
				handle=minutesToXY(minutes);
				distancex=dx-handle.x;
				distancey=dy-handle.y;
				distance=Math.sqrt(distancex*distancex+distancey*distancey);
				if(distance<65){
				if(typeof nearest.distance=="undefined")
				nearest={barHolder:"charlie",count:i,type:startend[l],distance:distance};
				else if(distance<nearest.distance)
				nearest={barHolder:"charlie",count:i,type:startend[l],distance:distance}
				}
				}

		}
		if(dataKeys[d]=="delta"){
	minutes=calc(data.delta[i].start,calc(data.delta[i].end,-data.delta[i].start)/2);
	handle=minutesToXY(minutes);
	distancex=dx-handle.x;
	distancey=dy-handle.y;
	distance=Math.sqrt(distancex*distancex+distancey*distancey);
		  
	if(distance<50){
	if(typeof nearest.distance=="undefined"||distance<nearest.distance){
	position=calc(XYtoMinutes({x:dx,y:dy}),-data['delta'][i].start);
	nearest={barHolder:"delta",count:i,type:"middle",position:position,distance:distance};
	}
	}		
	  
	  }
	}
	}
	mdown=nearest;
	nearest={};
	
}


function move(e){
	if(typeof mdown.barHolder!="undefined"){
		
		if(typeof e.touches!="undefined"){
    e.preventDefault();
		}
	var scale = radius / Math.sqrt(dx * dx + dy * dy);
	var slider = { x : dx * scale , y : dy * scale };
	//set new value
	newValue=XYtoMinutes(slider);
	
	//snap to some values
	if(mdown.type!="middle"){

	for(f=-1;f<24;f++){
	s=(f+0.5)*60;
	if(newValue<s+5&&newValue>s-5)
		newValue=s;
	};
	for(f=-1;f<24;f++){
	s=(f+1)*60;
	if(newValue<s+7&&newValue>s-7)
	 newValue=s;
	 };
	 if(snapFive)
	newValue=5 * Math.round(newValue/5);
	
	}

	if(mdown.type=="start"){
	  rangeDebug=range(newValue,data[mdown.barHolder][mdown.count].end);
	  if(rangeDebug<90||rangeDebug>=1180)
	  newValue=calc(data[mdown.barHolder][mdown.count].end,-90);
	  if(rangeDebug>720&&rangeDebug<1180)
	  newValue=calc(data[mdown.barHolder][mdown.count].end,-720);
	  data[mdown.barHolder][mdown.count].start=newValue;
	  
	  inputFieldStart=mdown.type+barConvert(mdown.barHolder)+mdown.count;
	  document.getElementById(inputFieldStart).value=minutesToClock(newValue);
	  
	 }else if(mdown.type=="end"){
	  rangeDebug=range(data[mdown.barHolder][mdown.count].start,newValue);
	  if(rangeDebug<90||rangeDebug>=1180)
	  newValue=calc(data[mdown.barHolder][mdown.count].start,+90);
	  if(rangeDebug>720&&rangeDebug<1180)
	  newValue=calc(data[mdown.barHolder][mdown.count].start,+720);
	  data[mdown.barHolder][mdown.count].end=newValue;
	  
	  inputFieldEnd=mdown.type+barConvert(mdown.barHolder)+mdown.count;
	  document.getElementById(inputFieldEnd).value=minutesToClock(newValue);
	  
	}else if(mdown.type=="middle"){
	  startValue=calc(newValue,-mdown.position);
	  
	  for(f=-1;f<24;f++){
	  s=(f+1)*60;
	  if(startValue<s+7&&startValue>s-7)
		 startValue=s;
	  };
	  for(f=-1;f<24;f++){
	s=(f+0.5)*60;
	if(startValue<s+4&&startValue>s-4)
		startValue=s;
	};
	 if(snapFive)
	startValue=5 * Math.round(startValue/5);
	  if(lockSleep){
		  sleepArr=["charlie","delta"];
		  oldStartValue=data[mdown.barHolder][mdown.count].start;
		  for(d=0;d<sleepArr.length;d++){
		countKeys=Object.keys(data[sleepArr[d]]);
		for(i=0;i<countKeys.length;i++){
				
			distance=range(oldStartValue,data[sleepArr[d]][countKeys[i]].start);
			val=calc(startValue,distance)
			data[sleepArr[d]][countKeys[i]].start=val;
		  	inputFieldStart="start"+barConvert(sleepArr[d])+countKeys[i];
	  		document.getElementById(inputFieldStart).value=minutesToClock(val);
			
			distance=range(oldStartValue,data[sleepArr[d]][countKeys[i]].end);
			val=calc(startValue,distance)
			data[sleepArr[d]][countKeys[i]].end=val;
			if(sleepArr[d]=="charlie"){
		  	inputFieldEnd="end"+barConvert(sleepArr[d])+countKeys[i];
	  		document.getElementById(inputFieldEnd).value=minutesToClock(val);
			}else{
				
			}
		}
	}
	  
	  }
	  duration=range(data[mdown.barHolder][mdown.count].start,data[mdown.barHolder][mdown.count].end);
	  data[mdown.barHolder][mdown.count].start=startValue;
	  data[mdown.barHolder][mdown.count].end=calc(startValue,duration);
	  
	  if(lockSleep){
		  //edit all inputFields
		  
		  
	  }else{ //edit only one field
	  if(mdown.barHolder=="delta"){
		  	inputFieldStart="start"+barConvert(mdown.barHolder)+mdown.count;
	  		document.getElementById(inputFieldStart).value=minutesToClock(startValue);
	  }else{
	  inputFieldStart="start"+barConvert(mdown.barHolder)+mdown.count;
	  inputFieldEnd="end"+barConvert(mdown.barHolder)+mdown.count;
	  document.getElementById(inputFieldStart).value=minutesToClock(startValue);
	  document.getElementById(inputFieldEnd).value=minutesToClock(calc(startValue,duration)); 
	  }
	}}




	}
	
}


function release(){
	mdown={};
}

/*


}).on('mouseup', function() {
$(document).off('mousemove');
mdown = {};
$('#slider').removeClass('draggable');
});*/

function checkMouseover(){
for(d=0;d<dataKeys.length;d++){
countKeys=Object.keys(data[dataKeys[d]]);
for(i=0;i<countKeys.length;i++){
		
		
		
}
}
}





});