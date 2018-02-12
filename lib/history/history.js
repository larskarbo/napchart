/*
 *  history
 *
 *  This module handles history
 */

module.exports = function (Napchart) {
    var helpers = Napchart.helpers

    Napchart.history = {
        init: function (chart) {
            chart.history = {
                add: function (action) {
                    const history = chart.history

                    const snapshot = JSON.parse(JSON.stringify({
                        elements: chart.data.elements,
                        lanes: chart.data.lanes
                    }))

                    // first check if things have changed
                    if (history.array[history.currentPointer] &&
                        JSON.stringify(history.array[history.currentPointer].snapshot) === JSON.stringify(snapshot)) {
                        // return when no change
                        console.log('no change')
                        return
                    }

                    if (history.currentPointer < history.array.length - 1) {
                        // we are in the middle somewhere, slice off!
                        history.array = history.array.slice(0, history.currentPointer + 1)
                    }
                    history.array.push({
                        action,
                        snapshot
                    })
                    history.currentPointer = history.array.length - 1

                },

                forward: function (action) {
                    const history = chart.history
                    if (!history.canIGoForward()) {
                        return
                    }
                    history.currentPointer += 1
                    apply(chart, history.array[history.currentPointer].snapshot)

                },
                back: function (action) {
                    const history = chart.history
                    if (!history.canIGoBack()) {
                        return
                    }
                    history.currentPointer -= 1
                    apply(chart, history.array[history.currentPointer].snapshot)

                },

                canIGoForward: function (action) {
                    const history = chart.history
                    if (history.currentPointer < history.array.length - 1) {
                        return history.array[history.currentPointer + 1].action
                    }
                    return null
                },
                canIGoBack: function (action) {
                    const history = chart.history
                    if (history.currentPointer > 0) {
                        return history.array[history.currentPointer].action
                    }
                    return null
                },

                array: [],
                currentPointer: -1
            }
        }
    }

    function apply(chart, s) {
        const snapshot = JSON.parse(JSON.stringify(s))
        chart.data = Object.assign({}, chart.data, snapshot)
        chart.needFullRedraw = true
        Napchart.shape.initShape(chart)
        chart.draw()
    }
}