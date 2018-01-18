
module.exports = {
  init: function (chart) {
    var parent = chart.canvas.parentElement

    var input = document.createElement("input");
    input.style.position = 'absolute';
    input.className = 'hiddenInput';
    // input.style.opacity = 0;
    input.style.width = '100px'
    // input.style.pointerEvents = 'none';
    input.style.zIndex = 0;
    // hide native blue text cursor on iOS
    input.style.top = '0'

    input.style.left = '0'

    
    input.type = 'text'

    parent.appendChild(input)

    chart.forceFocusSelected = function() {
      focusSelected(chart.selectedElement)
    }

    chart.onSetSelected = function(selected) {
      if(!selected){
        console.log('fdsjisjaf')
        input.value = ""
        input.blur()
        return 'get out of here'
      }

      if(!chart.isTouchUser){
        focusSelected(selected)
      }
    }

    function focusSelected(selected) {
      var selectedElement = chart.data.elements.find(e => e.id == selected)
      input.value = selectedElement.text
      input.focus()
      positionInput(input, selectedElement)
      input.oninput = function(e) {
        var value = e.target.value

        chart.updateElement({
          id: chart.selectedElement,
          text: value
        })
      }
    }

    function positionInput(input, element) {
      var helpers = chart.helpers

      var lane = chart.shape.lanes[element.lane]
      var middleMinutes = helpers.middlePoint(element.start, element.end)
      if (helpers.duration(element.start, element.end) < 90) {
        middleMinutes = Math.max(middleMinutes, element.start + 40)
      }

      var radius = lane.end + chart.config.content.textDistance
      if (element.lane == 0) {
        var radius = lane.start - chart.config.content.textDistance
      }

      var textPosition = helpers.minutesToXY(chart, middleMinutes, radius)

      console.log(textPosition)
      input.value = element.text
    }
    
    // delete key
    document.onkeydown = (evt) => {
        evt = evt || window.event
        if (evt.keyCode == 46 && chart.selectedElement && input === document.activeElement) {
            chart.deleteElement(chart.selectedElement)
        }
    }
  }
}
