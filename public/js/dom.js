/**

This module handles dom event listening

Requires jQuery

**/

window.dom=(function(){
	//private
	var SAVE_CONT = document.getElementById('saveContainer');

	//public:
	return{
		bindAddButtons:function(){
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
			$(container).on('click','.remove',function(){
				var classes, myClass, name, count;

				name = $(this).parent().find('[name="name"]').val();
				count = $(this).parent().find('[name="count"]').val();
				console.log(name,count)
				if(interactCanvas.isSelected(name,count)){
					interactCanvas.deselect();
				}
				napchartCore.removeElement(name,count);
			});
		},

		bindHoverOnFormInput:function(container){
			$(container).on('mouseenter','.inputBox',function(){
				var name = $(this).find('[name="name"]').val();
				var count = $(this).find('[name="count"]').val();
				interactCanvas.setHoverElement({
					name:name,
					count:count,
					type:'whole'
				});
				draw.drawUpdate();
			});
		},

		bindSaveButton:function(container){
			var data, chartid;
			SAVE_CONT = container;
			$(container).on('click','.btn',function(){
				data = napchartCore.getSchedule();

				server.saveNew(data, function(success, response){
					if(success){
						napchartCore.setURL(response);
					}else{
						alert('Something went wrong:\n\n' + response);
					}
					console.log(response);
				})
			})
		},

		setURL:function(chartid){
			var container, inputField, url;

			container = SAVE_CONT;
			inputField = $(container).find('input')[0];

			url = 'http://napchart.com/' + chartid;

			if( $(inputField).css('visibility') == 'hidden' ){
				$(inputField).css('visibility','visible');
				$(inputField).animate({width:"220px"});
			}
			inputField.value = url;
		}
		
	}

}())

	




