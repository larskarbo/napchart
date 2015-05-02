$(document).ready(function () {
	$("#sampleSchedules").on("click touchstart",".sampleSchedule", function (e) {
	e.stopPropagation();
	e.preventDefault();
        selector = this.id;
	ga('send', 'event', 'click', 'sampleSchedule', selector);
        sampleAnimator(sampleSchedules[this.id]);
		changeActiveSchedule(this.id);
    });

    $("body").on("click touchstart", ".remove", function (e) {
	e.stopPropagation();
	e.preventDefault();
	ga('send', 'event', 'click', 'button', 'remove');
        selector = $(this).attr('id');
        type = selector.replace(/\d+/g, '');
        id = selector.match(/\d/g);
        id = id.join();
        console.log(id, type);
        bar = barConvert(type);
        deleteObj = {};
        deleteObj[bar] = {};
        deleteObj[bar][id] = {};
        removeInputBox(deleteObj);
    });

    $("#addSleep").on("click touchstart", function (e) {
		
	e.stopPropagation();
	e.preventDefault();
	ga('send', 'event', 'click', 'button', 'addSleep');
        addInputBox("Sleep");
		updateInputValues();
    });
    $("#addNap").on("click touchstart", function (e) {
	e.stopPropagation();
	e.preventDefault();
	ga('send', 'event', 'click', 'button', 'addNap');
        addInputBox("Nap");
		updateInputValues();
    });
    $("#addWork").on("click touchstart", function (e) {
	e.stopPropagation();
	e.preventDefault();
	ga('send', 'event', 'click', 'button', 'addWork');
        addInputBox("Work");
		updateInputValues();
    });
    $("#removeAll").on("click touchstart", function (e) {
	e.stopPropagation();
	e.preventDefault();
	ga('send', 'event', 'click', 'button', 'removeAll');
        removeInputBox(data);
    });
	$("#saveURL").on("focus mouseup", function (e) {
	e.stopPropagation();
	e.preventDefault();
    	$("#saveURL").select();
    });
	$("#savebutton").on("click touchstart", function () {
        currentlyGray();
		console.log('asto');
		document.getElementById("saveicon").className="fa fa-spinner fa-spin";
		$.post("post", {data:JSON.stringify(data)},responseHandler);
    });
function responseHandler(chartid){
	ga('send', 'event', 'click', 'save', 'succesful-save');
console.log(chartid);
document.getElementById("saveicon").className="fa fa-link";
cancelGray();
setChartID(chartid);

}
	function setChartID(chartid){
		saveURL=document.getElementById("saveURL");
		if($("#saveURL").css("visibility")=="hidden"){
			saveURL.style.visibility="visible";
			$(saveURL).animate({width:"160px"});
			document.getElementById("copyLink").style.display="block";
		}
		window.history.pushState({chartid:chartid}, "", '/'+chartid);
		saveURL.value="http://napchart.com/"+chartid;
	}


    /*$("#rightColumnDiv").on("keydown change","input.clock",
    function(){
    		clearTimeout(timer);  ØDELEGG MULIGHET TIL Å SELEKTE SKIKKELIG TRUR E
    		altthis=$(this);
    	var timer = setTimeout(function(){
    		val=$(altthis).val();
    		if(val.length==4){
    		updateInputValues();
    		}
    	},500);
    });	*/
    $("#rightColumnDiv").on("keyup change", "input.desc",
        function () {
            clearTimeout(timer);
            var timer = setTimeout(function () {
                updateInputValues();

            }, 1);
        });

	
$('#toggleRight').on("click touchstart",function(e) {
	e.stopPropagation();
	e.preventDefault();
	console.log("hit");
$('.wrapper').toggleClass('show-nav-right');
});	
$('#toggleLeft').on("click touchstart",function(e) {
	e.stopPropagation();
	e.preventDefault();
$('.wrapper').toggleClass('show-nav-left');

});
    $("body").on("focusout", "input",
        function () {
            id = $(this).attr('id');
            val = $("#" + id).val();
            updateInputValues();
        });

    $("body").on("change", ".duration", updateInputValues);

    $("body").on("click", "#toggle", function () {
        $('.moreFunFacts').toggle(400);
    });



    window.sampleAnimator = function (targetObj) {
        if (typeof targetObj["alfa"] != "undefined")
            toBeDeleted = data;
        else
            toBeDeleted = {
                charlie: data['charlie'],
                delta: data['delta']
            }
			if(Object.keys(data['charlie']).length==0&&Object.keys(data['delta']).length==0){
				for (bar in targetObj) {
                for (id in targetObj[bar]) {
                    addInputBox(barConvert(bar), targetObj[bar][id].start, targetObj[bar][id].end);
                }
            }
            updateInputValues();
			}else{
        removeInputBox(toBeDeleted, function () {
            for (bar in targetObj) {
                for (id in targetObj[bar]) {
                    addInputBox(barConvert(bar), targetObj[bar][id].start, targetObj[bar][id].end);
                }
            }
            updateInputValues();
        });
			}




    }










});