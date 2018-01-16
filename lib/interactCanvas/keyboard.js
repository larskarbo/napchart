
module.exports = {
  init: function (chart) {
    var parent = chart.canvas.parentElement

    var input = document.createElement("input");
    input.style.position = 'absolute';
    input.style.opacity = 0;
    input.style.pointerEvents = 'none';
    input.style.zIndex = 0;
    // hide native blue text cursor on iOS
    input.style.transform = 'scale(0)';
    
    input.type = 'text'

    parent.appendChild(input)

    chart.onSetSelected = function(selected) {
      if(!selected){
        return 'get out of here'
      }
      console.log(selected)

      var selectedElement = chart.data.elements.find(e => e.id == selected)
      input.value = selectedElement.text
      input.focus()


      input.oninput = function(e) {
        var value = e.target.value

        chart.updateElement({
          id: chart.selectedElement,
          text: value
        })
      }
    }
  }
}
