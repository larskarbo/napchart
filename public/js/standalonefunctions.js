$(document).ready(function(){


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