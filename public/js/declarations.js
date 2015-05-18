$(document).ready(function(){

var app={};
app.init=function(){
document.getElementById("myCanvas");

window.currentActive="none";


window.PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();



window.keys=["alfa","charlie","delta"];
window.color={
	alfa:"#1f1f1f",
	charlie:"#c70e0e",
	delta:"#c70e0e"
}
window.debugging=false;
//variables
window.canvasbgcolor="#F4F4F4";
window.currentEnd={
	alfa:0,charlie:0,delta:0};
window.resetData=function(){
window.data={
	alfa:{},
	charlie:{},
	delta:{}
};
}
resetData();
window.startend=["start","end"];
window.markers=[];
window.sleepTemp=[];
window.napTemp=[];
window.workTemp=[];
window.dx=0;
window.dy=0;

 window.requestNextAnimationFrame =
   (function () {
      return window.requestAnimationFrame   ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.msRequestAnimationFrame     ||

         function (callback, element) { // Assume element is visible
            var self = this,
                start,
                finish;

            window.setTimeout( function () {
               start = +new Date();
               callback(start);
               finish = +new Date();

               self.timeout = 1000 / 60 - (finish - start);

            }, self.timeout);
         };
      }
   )
();

$("#canvasWrapper").css("background-color",canvasbgcolor);



}()




});

