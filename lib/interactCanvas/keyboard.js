
module.exports = {
  init: function (chart) {
		// delete key
    document.onkeydown = (evt) => {
		    evt = evt || window.event
		    if (evt.keyCode == 46 && chart.selectedElement) {
		        chart.deleteElement(chart.selectedElement)
		    }
    }

    function appendCharacter (c) {
      if (chart.selectedElement) {
        var text = chart.data.elements.find(e => e.id == chart.selectedElement).text
        console.log(c, text)
		    switch (c) {
	        case 8: // Backspace
	          text = text.slice(0, -1)
	          break
	        default:
	          text = text + String.fromCharCode(c)
		    }
        console.log({
          id: chart.selectedElement,
          text: text
        })
        chart.updateElement({
          id: chart.selectedElement,
          text: text
        })
      }
    }

		// Keypress gets the keyCode of the current character not key.
		// e.g. pressing the 'A' key will result in 'a' unless 'Shift' is also held.
    window.addEventListener('keypress', function (e) {
		    appendCharacter(e.keyCode)
    })

		// Use Keydown to get special keys like Backspace, Enter, Esc.
    window.addEventListener('keydown', function (e) {
		    switch (e.keyCode) {
		        case 8:
		            e.preventDefault()
		            appendCharacter(e.keyCode)
		            break
		    }
    })
  }
}
