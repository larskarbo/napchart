/**

This module handles all dom event listening

Requires jQuery

**/

window.dom=(function(){
	//private


	//public:
	return{
		initialize:function(){
			document.getElementById('addCore').addEventListener('click',function(){
				barhandler.addBar("core");
			});

			document.getElementById('addNap').addEventListener('click',function(){
				barhandler.addBar("nap");
			});

			document.getElementById('addBusy').addEventListener('click',function(){
				barhandler.addBar("busy");
			});

			document.getElementById('removeAll').addEventListener('click',function(){
				barhandler.removeAllBars();
			});
		},

		bindRemoveButtons:function(container){
			var classes, myClass, count, name;

			$(container).on('click','.remove',function(){
				console.log($(this).parent().attr('class'));
				classes = $(this).parent().attr('class');
				myClass = classes.replace(' inputBox','');
				count = myClass.match(/(\d+)/g)[0];
				name = myClass.replace(count,'');

				napchartCore.removeElement(name,count);
			});
		}
		
	}

}())

	




