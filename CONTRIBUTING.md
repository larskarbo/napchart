# Contributing to napchart

Here is a guide on how to understand the code base of napchart

## Modules

Napchart is written with javascript modules. All modules are stored in the /js folder.

### napchartCore.js

NapchartCore is the core module. This is the _one module to rule them all_. From here, all modules get initialized. And all communication between modules goes through this module.
The data object containing info about the present schedule is stored here.

#### Data object

Like this ((result))[http://napchart.com/0nd11]
var data = {
nap:[],
core:[{start:1410,end:480}],
busy:[]}

