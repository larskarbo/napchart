$(document).ready(function() {
function removeElementsByClass(className){
var elements = document.getElementsByClassName(className);
while(elements.length > 0){
	elements[0].parentNode.removeChild(elements[0]);
}
}
window.restacker=function(){
	dataKeys=["charlie","delta"];
	window.stack={};
	for(d=0;d<dataKeys.length;d++){
	stack[dataKeys[d]]=[];
	countKeys=Object.keys(data[dataKeys[d]]);
		for(i=0;i<countKeys.length;i++){
			arr=[data[dataKeys[d]][countKeys[i]].start,countKeys[i]];
			if(i>0&&arr[0]<stack[dataKeys[d]][i-1][0]){
				temp=stack[dataKeys[d]][i-1];
				stack[dataKeys[d]][i-1]=arr;
				stack[dataKeys[d]][i]=temp;
			}else
			stack[dataKeys[d]].push(arr);
		}
		
	}
	return stack;
}
window.clear=function(barArray){
}
window.removeInputBox=function(deleteObj,callback){
    target={};
	
		dataKeys=Object.keys(deleteObj);
		for(d=0;d<dataKeys.length;d++){
		target[dataKeys[d]]={}
		countKeys=Object.keys(deleteObj[dataKeys[d]]);
			for(i=0;i<countKeys.length;i++){
			selector=barConvert(dataKeys[d])+countKeys[i];
			$("div#"+selector).remove();

			e=data[dataKeys[d]][countKeys[i]].end;
			s=data[dataKeys[d]][countKeys[i]].start;
			middlepoint=calc(((calc(e,-s))/2),s);
			target[dataKeys[d]][countKeys[i]]={start:middlepoint,end:middlepoint};
			}
		}
		
		
		animate(target,200,"quadraticEasingIn",function(dataKeys,countKeys){
			dataKeys=Object.keys(deleteObj);
		for(d=0;d<dataKeys.length;d++){
			countKeys=Object.keys(deleteObj[dataKeys[d]]);
			for(i=0;i<countKeys.length;i++){
				
			removeElementsByClass(dataKeys[d]+countKeys[i]);
			delete data[dataKeys[d]][countKeys[i]];
			}
		}
		if(typeof callback!="undefined")
		callback();
		});
}
function addTextDivs(bar,count){
		timeHandles='<div class="textDom timeHandles '+bar+count+'" id="timeHandles'+bar+count+'start"></div><div class="textDom timeHandles '+bar+count+'" id="timeHandles'+bar+count+'end"></div>';
		descriptionText='<div class="textDom descriptionText '+bar+' '+bar+count+'" id="descriptionText'+bar+count+'"></div>';
		durationText='<div class="textDom durationText '+bar+' '+bar+count+'" id="durationText'+bar+count+'"></div>';
		document.getElementById('textDomContainer').innerHTML+=timeHandles+descriptionText+durationText;
		document.getElementById('textDomContainer').innerHTML+=timeHandles+descriptionText+durationText;
}
window.addInputBox=function(type,startval,endval){
	//Sleep Nap Work
	//Sleep Nap Work
		
	if(type=="Sleep"){
		/*which id is free?*/
		for(i=0;i<200;i++){
			if($("#"+type+i).length==0){
				count=i;
				break;
			}
		}
		
		addTextDivs("charlie",count);
		container="#inputContainerSleeps";
		contentToAdd=
		'<div id="Sleep'+count+'" class="inputBox">Core:  <input class="clock sleep" sleepornap="Sleep"  maxlength="4" id="startSleep'+count+'" size="1" type="text"> - <input class="clock sleep" sleepornap="Sleep" id="endSleep'+count+'" maxlength="4" type="text">  <button class="remove" id="Sleep'+count+'">remove</button></div>';
		
	if(typeof startval=="undefined"||typeof endval=="undefined")
	if($(container+"> .inputBox").length==0){//add default values
	startval=1410;
	endval=180;
	}else{
	for(i in data.charlie)
		id=i;
	if (typeof id==="undefined"){
		startval=720;
		endval=startval+90;
	}else{
	startval=data.charlie[id].end+90;
	endval=data.charlie[id].end+180;}
	}
	$(container).append(contentToAdd);
	$("#startSleep"+count).val(minutesToClock(startval));
	$("#endSleep"+count).val(minutesToClock(endval));
	
	currentEnd["charlie"]=endval;

	
	}
	if(type=="Nap"){
		/*which id is free?*/
		for(i=0;i<200;i++){
			if($("#"+type+i).length==0){
				count=i;
				break;
			}
		}
		

		addTextDivs("delta",count);
		
		container="#inputContainerNaps";
		contentToAdd='<div id="Nap'+count+'" class="inputBox">Nap:  <input class="clock nap" sleepornap="Nap"  maxlength="4" id="startNap'+count+'" size="1" type="text"> - <input sleepornap="Nap" value="20" class="duration" id="durationNap'+count+'" maxlength="4" type="number" min="5" max="90">  <button class="remove" id="Nap'+count+'">remove</button></div>';
		
		
		
	if(typeof startval=="undefined"||typeof endval=="undefined"){
		duration=20;
	if($(container+"> .inputBox").length==0){//add default values
	startval=960;
	}else{
	for(i in data.delta)
		id=i;
	startval=data.delta[id].start+120;
	
	}}
	else{
		duration=calc(endval,-startval);
	}
	$(container).append(contentToAdd);
	$("#startNap"+count).val(minutesToClock(startval));
	$("#durationNap"+count).val(duration);
	//add default values

	}
	if(type=="Work"){
		/*which id is free?*/
		for(i=0;i<200;i++){
			if($("#"+type+i).length==0){
				count=i;
				break;
			}
		}
		
		addTextDivs("alfa",count);
		container="#inputContainerWorks";
		contentToAdd='<div id="Work'+count+'" class="inputBox"><input id="startWork'+count+'" class="work clock" type="text" /> - <input id="endWork'+count+'" class="work clock" type="text" /> <input class="desc" id="descWork'+count+'" type="text"> <button class="remove" id="Work'+count+'">remove</button></div>';
	if(typeof startval=="undefined"||typeof endval=="undefined")
	if($(container+"> .inputBox").length==0){//add default values
	startval=540;
	endval=1020;
	}else if($(container+"> .inputBox").length==1){
	startval=1170;
	endval=1380;
	}else{
	for(i in data.alfa)
	id=i;
	if(data.alfa[id].end<=1320){
	startval=data.alfa[id].end+60+120;
	endval=data.alfa[id].end+180+120;
	}else{
	startval=60;
	endval=180;
	}	
	}
	$(container).append(contentToAdd);
	$("#startWork"+count).val(minutesToClock(startval));
	$("#endWork"+count).val(minutesToClock(endval));


	}
	return (type+count);	
	}

});