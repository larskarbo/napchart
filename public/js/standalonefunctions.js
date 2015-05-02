$(document).ready(function(){


window.shortestWay=function(s){
	console.log(s);
if(s<-720)
return calc(1440,s);
if(s>720)
return s-1440;
return s;
}
window.convertCanvasToImage=function() {
	var image = new Image();
	image.src = clockCanvas.toDataURL("image/png");
	document.getElementById('canvasImg').appendChild(image);
}
window.range=function(start,end){
	if(end<start){
	return 1440-start+end}
	else{
	return end-start;}
}
window.barConvert=function(indata){
	if(indata=="alfa")
	out="Work";
	if(indata=="charlie")
	out="Sleep";
	if(indata=="delta")
	out="Nap";
	if(indata=="Work")
	out="alfa";
	if(indata=="Sleep")
	out="charlie";
	if(indata=="Nap")
	out="delta";
	return out;
}

window.rangeObject=function(arr){
	return range(arr.start,arr.end);
}

window.middlepointFinder=function(obj){
	return calc(rangeObject(obj)/2,obj.start);
}
oldColor={
	alfa:color.alfa,
	charlie:color.charlie,
	delta:color.delta
}
window.currentlyGray=function(){
color={
	alfa:"#616161",
	charlie:"#616161",
	delta:"#919191"
}
};
window.cancelGray=function(){
color={
	alfa:oldColor.alfa,
	charlie:oldColor.charlie,
	delta:oldColor.delta
}
}

window.calc=function(minutes,plus){
	if(minutes+plus<0){
	return minutes+plus+1440}
	else if(minutes+plus>1440){
	return minutes+plus-1440}
	else{
	return minutes+plus;}	
}

window.totalWidth=function(percent){
	return (document.getElementById("myCanvas").clientHeight *(percent/100));
}
window.currentProp=function(){
	return (document.getElementById("myCanvas").clientHeight/500);
}

window.convertPHP=function(indata){
	if(indata=="alfa")
	return 2;
	else if(indata=="charlie")
	return 0;
	else if(indata=="delta")
	return 1;
	
	
}




window.minutesToClock=function(minutes){
	minutes=Math.floor(minutes);
	if(minutes>=1440)
	minutes-=1440;
	hours=Math.floor(minutes/60)+"";
	minutes=minutes%60+"";
	if(hours.length==1){
		hours="0"+hours;
	}
	if (minutes.length==1){
		minutes="0"+minutes;
	}

	return(hours+minutes);

};
window.minutesToStatistics=function(minutes){
	hours=Math.floor(minutes/60)+"";
	minutes=minutes%60+"";
	returnArr=[hours,Math.floor(minutes)];
	return(returnArr);

};
window.countOverlappingExcluder=function(bars){

original=[];
	/* viss alle e true: sjekka kor du e absolutt heilt fri. returna altså alle der du e opptatt!*/
	//ta sammen dei arrayane som skal bli merga inn i en array original:
	
for(i=0;i<bars.length;i++){
	for(id in data[bars[i]]){
	original.push(data[bars[i]][id]);
}}

if(original.length==0){ //viss de ikkje e noke å merge
return original;
}

//splitte alle segment som går over nullpunktet til to i original arrayen. SJÅ §4
toBeAdded=[];
for(i=0;i<original.length;i++){
if(original[i].start>original[i].end){
toBeAdded.push({start:0,end:original[i].end});
original[i]={start:original[i].start,end:1440};
}
}
original=original.concat(toBeAdded);

original=original.sort(function(a, b){
 return a.start-b.start
})

merged=[];
merged.push(original[0]);
for(f=1;f<original.length;f++){

if(original[f].start<=merged[merged.length-1].end
	&& original[f].end>merged[merged.length-1].end){
		t=merged.length-1;
	merged[t]={start:merged[t].start,end:original[f].end};
}
	else if(original[f].start>merged[merged.length-1].end){
		merged.push({start:original[f].start,end:original[f].end});
	}
	}
	if(merged.length!=1)
	if(merged[0].start==0&&merged[merged.length-1].end==1440){
	merged[0].start=merged[merged.length-1].start;
	merged.splice(merged.length-1,1);}
	

return merged;
};
window.grader=function(deg){
return ((Math.PI/180)*(deg));}
window.klokkegrader=function(minutt){
return ((Math.PI/720)*(minutt-360));}
window.radiensTilMinutt=function(deg){
return ((Math.PI/180)*(deg));}
window.minutesToXY=function(minutes,radiusMultiplier){
	if(typeof radiusMultiplier=="undefined")
	radiusMultiplier=100;
	o={};
o.y=Math.sin((minutes/1440)*(Math.PI*2)-(Math.PI/2))*radius*radiusMultiplier/100;
o.x=Math.cos((minutes/1440)*(Math.PI*2)-(Math.PI/2))*radius*radiusMultiplier/100;
return o;
}

window.minutesToXY_OIC=function(minutes,radiusMultiplier){
	if(typeof radiusMultiplier=="undefined")
	radiusMultiplier=100;
	o={};
o.y=Math.sin((minutes/1440)*(Math.PI*2)-(Math.PI/2))*radius*radiusMultiplier/100+totalWidth(50);
o.x=Math.cos((minutes/1440)*(Math.PI*2)-(Math.PI/2))*radius*radiusMultiplier/100+totalWidth(50);
return o;
}

window.XYtoMinutes=function(coord){
minutes=(Math.atan(coord.y/coord.x)/(Math.PI*2))*1440+360;
if(coord.x<0){
	minutes+=720
}
minutes=Math.round(minutes);

return minutes;
}

//easing::
window.easeInOutQuad=function(t, b, c, d) {
            return -c * (t/=d)*(t-2) + b;
};
/* DEBUGGING easing

@t is the current time (or position) of the tween.
@b is the beginning value of the property.
@c is the change between the beginning and destination value of the property.
@d is the total time of the tween.

document.write("<table><tr><td>");
for(i=0;i<=100;i++)
document.write(i+"</td><td>"+easeInOutQuad(i,0,360,100)+"</td></tr><tr><td>");
*/

window.validateClock=function(inputToValidate){
	val=$(inputToValidate).val();
	if(val.length==1)val="0"+val+"00";
	if(val.length==2)val=val+"00";
	if(val.length==3)val="0"+val;
	if(val.length==4){
	firstSecondNumber=val.substring(0,2);
	thirdFourthNumber=val.substring(2,4);
	if(firstSecondNumber<=23&&thirdFourthNumber<=59){
	$(inputToValidate).removeClass("clockFormatBad");
	$(inputToValidate).addClass("clockFormatOK");
	$(inputToValidate).val(val);	
	return true;
	}else{
	$(inputToValidate).addClass("clockFormatBad");
	}
	}
}





});