# Contributing to napchart

Here is a guide on how to understand the code base of napchart

## Modules

Napchart is written with javascript modules. All modules are stored in the `public/js` folder.

Modules have this structure:

```
/**

This module handles something

**/

window.module=(function(){
	//private
	var h = 'hello';

	//public:
	return{
		hello:function(){
			console.log(h);
		}
	}

}());
```

### Data structure
```
var data = {
nap:[],
core:[{start:1410,end:480}],
busy:[]}
```
You can find this object structure all over the project. It defines a *chart*.

They are iterated like this:
```
for (var name in data){
	for (var i; i < data[name].length; i++){
		console.log(data[name].start);
	}
}
```

`element` = a elment like `{start:1410,end:480}`
`name` = nap, core or busy arrays containing elements
`count` = the index of the element in the array

### application.js

When the document is ready, this module will start the app. It will supply data from the fromServer object if it is there.

### napchartCore.js

NapchartCore is the core module. This is the _one module to rule them all_. From here, all modules get initialized. Most of the communication between modules goes through this module.
The data object containing info about the present schedule is stored here in `scheduleData`.

### draw.js

This module draws the chart to canvas.

### interactCanvas.js

Makes the canvas created by `draw` clickable and touchable. With this module you can modify elements and move them around in an intuitive way.

### formInput.js

As an alternative to modify your chart with `interactCanvas` , you can use this module with simple input elements. Creates input elements in a specified container.

### settings.js

Gets values from a `div` with checkboxes or input elements. Other modules can call `settings.getValue()` to get a value.

### barHandler.js

When you add an element, this module makes sure the element is placed on a place on the chart that is not so full. It will also make sure the element is a reasonable length. Rules stored in `barAddRules`

### helpers.js

This module has some handy functions to make common calculations easier.
Some of the most used are:
`helpers.calc(minutes, plus)` - Takes the first argument and adds it with the other. Then it makes sure the numer is more than 0 and less than 1439. (because there are 1440 minutes in 24 hours)
`helpers.minutesToXY(minutes, radius, basewidth, baseheight)` - Gives you x and y values of a point on canvas.  `basewidth` and `baseheight` can be used to move origo to center. Example: `helpers.minutesToXY(720, 20, canvas.width/2, canvas.height/2)`

### history.js

Handles history. When other modules `history.add()` a current state, the user can jump back and forth using back and forward buttons.

### sampleSchedules.js

Handles some preset schedules. It also handles schedule detection, and will highlight the schedule that you have. (If you have one core, monophasic will hightlight. If you have two cores, segmented will highlight, etc)

### server.js

Handles server interactions to save schedules with ajax.

### statistics.js

Takes the a schedule object and makes neat little facts about it. It can give you the total time slept, the total time free and possibly more.

### textSerialize.js

In a way, this is an alternative to `draw`. It makes the schedule easy to read in a text format.
If you save the chart it will put a link in the bottom.
The text created should make it easy for people to share their schedules with others on forums or other places.

### animate.js

Right now the animate module only does one function, `frameAnimator`. It makes the the indicators fade in when you click an element
