$(document).ready(function(){
showColorpicker=false;

function initializeColorpicker(){
$('body').append('<div id="colorpickerContainer"></div>');
	$('#colorpickerContainer').html('<div style="position:absolute;right:0px;top:0px;z-index:10" id="colorcharlie"></div><div style="position:absolute;left:0px;bottom:0px;z-index:10" id="colordelta"></div><div style="position:absolute;left:0px;top:0px;z-index:10" id="coloralfa"></div>');
	

      
$('#colorcharlie').ColorPicker({
	onChange: function(hsb, hex, rgb, el) {
		console.log(hex);
		color['charlie']="#"+hex;
	},color:color["charlie"],flat:true});
$('#colordelta').ColorPicker({
	onChange: function(hsb, hex, rgb, el) {
		console.log(hex);
		color['delta']="#"+hex;
	},color:color["delta"],flat:true});
$('#coloralfa').ColorPicker({
	onChange: function(hsb, hex, rgb, el) {
		console.log(hex);
		color['alfa']="#"+hex;
	},color:color["alfa"],flat:true});
}
	
window.addEventListener("keypress",function(e){
	if(e.keyCode==67||e.keyCode==99){
	if(showColorpicker===true){
	////fjern den jævla driten
	}
	else if(showColorpicker===false){
	showColorpicker=true;
	initializeColorpicker()
	}
}
	else if(e.keyCode==68||e.keyCode==100){
	if(debugging===true){
	$("#debugger").css("width","0px");
	$("#debugger").css("height","auto");
	debugging=false;
	}
	else{
		console.log("DEBUHH")
	$("#debugger").css("width","350px");
	$("#debugger").css("height","auto");
	debugging=true;
	}
}
},false)

var debugMaker=[
"stack",
"data",
"alfa",
"charlie",
"delta",
"rangeDebug",
"fps",
"dx",
"dy",
"mx",
"my",
"mdown",
"nearest",
"timestamp"
]
//spanMaker
$.each(debugMaker,function(i,v){
	$("div#debugger").append(v+": <span  id='"+v+"'></span>").append("<br>");
});

//console.info(countOverlappingExcluder());
var debugRounder=function(key,value){
  if (typeof value === "string") {
    return "HORSE";
  }
  return value;
}

var filterStrength = 1;
var frameTime = 0;
lastLoop = new Date;
thisLoop=0;
// Report the fps only every second, to only lightly affect measurements

setInterval(function(){
	fps=(1000/frameTime).toFixed(0);
},1000);

window.debuggerScript = function(){

$("span#stack").html(JSON.stringify(stack));
$("span#data").html(JSON.stringify(data));
$("span#alfa").html(JSON.stringify(data['alfa'],debugRounder));
$("span#charlie").html(JSON.stringify(data.charlie));
$("span#delta").html(JSON.stringify(data['delta']));
$("span#rangeDebug").html(rangeDebug);
//fps
var thisFrameTime = (thisLoop=new Date) - lastLoop;
frameTime+= (thisFrameTime - frameTime) / filterStrength;
lastLoop = thisLoop;
$("span#fps").html(fps);
$("span#rangeDebug").html(rangeDebug);
$("span#dx").html(dx);
$("span#dy").html(dy);
$("span#mx").html(mx);
$("span#my").html(my);
$("span#mdown").html(JSON.stringify(mdown));
$("span#nearest").html(JSON.stringify(nearest));
	
	};
});