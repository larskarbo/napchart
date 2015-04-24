<div class="menumoverViewport">
	
<div id="smallscreen" class="section group">
<div class="col span_4_of_4">
<div id="toggleRight">Show control panel</div>
<div id="toggleLeft">Show schedules</div>
	</div></div>
	
	
<div id="main_content" class="section group">



    

	<div id="leftColumn" class="col span_1_of_4">
        <div id="adderContainer">
<a href="about">about</a>
            <div class="adderButton" id="addNap"><span class="adderTitle">nap</span><span class="adderDesc">10 to 90 minutes</span></div>
            <div class="adderButton" id="addSleep"><span class="adderTitle">core</span><span class="adderDesc">90 minutes or more</span></div>

      
    </div>
	<script>
	window.sampleSchedules={
	"monophasic":{"charlie":{"0":{"start":1410,"end":450}},"delta":{}},
	"segmented":{"charlie":{"0":{"start":1320,"end":90},"1":{"start":210,"end":420}},"delta":{}},
	"siesta":{"charlie":{"0":{"start":1380,"end":240}},"delta":{"0":{"start":780,"end":870}}},
	"triphasic":{"charlie":{},"delta":{"0":{"start":870,"end":960},"1":{"start":390,"end":480},"2":{"start":1350,"end":0}}},
	"everyman":{"charlie":{"0":{"start":1260,"end":30}},"delta":{"0":{"start":250,"end":270},"1":{"start":490,"end":510},"2":{"start":880,"end":900}}},
	"dualcore1": {"charlie":{"0":{"start":1320,"end":90},"1":{"start":390,"end":480}},"delta":{"0":{"start":960,"end":980}}},
	"uberman":{"charlie":{},"delta":{"0":{"start":960,"end":980},"1":{"start":720,"end":740},"2":{"start":1200,"end":1220},"3":{"start":480,"end":500},"4":{"start":240,"end":260},"5":{"start":1440,"end":20}}}
        
	}
	</script>
	
	<div id="sampleSchedules">
	<div id="none" class=""></div>
	<div id="sampleScheduleActive"></div>
	<div id="monophasic" class="sampleSchedule">Monophasic</div>

	<?php
	$schedules=array(
	//"monophasic"=>"Monophasic",
	"segmented"=>"Segmented",
	"siesta"=>"Siesta",
	"dualcore1"=>"Dual Core 1",
	"triphasic"=>"Triphasic",
	"everyman"=>"Everyman",
	"uberman"=>"Uberman"
    );
	foreach($schedules as $key=>$value){
		echo "<div id='$key' class='sampleSchedule'>$value</div>	";
	}
	?>
	</div></div>
	<div id="canvasCont" class="col span_2_of_4">
	<div id="canvasInnerCont">
	<div id="textDomContainer"></div>
                
<div id="canvasImg"></div>

            <canvas width="400" height="400" id="clockCanvas">
            </canvas>

            <canvas width="400" height="400" id="myCanvas">
            </canvas>

	</div>
	</div>
	<div id="controlPanelColumn" class="col span_1_of_4">
                    <div class="adderButton" id="addWork"><span class="adderTitle">occupied</span><span class="adderDesc">Things that prevent you from sleep</span></div>
 <br>
	<input type="checkbox" id="lockSleep"><label for="lockSleep"> Move all sleep simultaneously</label>
		<br><input type="checkbox" id="snapFive"><label for="snapFive"> Snap to every 5 minutes</label>
		 <br>
        
            <button id="removeAll" class="button">>> Remove all</button>
                
                <div id="inputContainerSleeps">
        </div>
                <div id="inputContainerNaps"></div>
                <div id="inputContainerWorks"></div>
                


	</div>
</div>
    <div class="section group">
	<div id="stat-container" class="col span_4_of_4">


	<div class="stat-block">
	<div class="stat-title">Sleep time</div>
	<div class="stat-time totalSleep"></div>
	<div class="stat-desc totalSleep"></div>
	</div>

	<div class="stat-block">
	<div class="stat-title">Free time</div>
	<span class="stat-time freeTime"></span>
	<div class="stat-desc freeTime"></div>
	</div>
	
	<div class="stat-block">
	<div class="stat-title">Time saved in a year</div>
	<span class="stat-time timeSavedYear"></span>
	<div class="stat-desc timeSavedYear"></div>
	</div>
	



</div>
</div>
<?php
	
    include ("genius.php") ?>


</body>



</div>