var schedules = {
	'Bimaxion': 'qamnm',
	'Dual Core 1': 'ugn4g',
	'Dual Core 2': 'rxpjl',
	'Dual Core 3': 'arx4r',
	'Dual Core 4': 'qtny6',
	'Dymaxion': 'zgqtz',
	'Everyman 1': '30lbn',
	'Everyman 2': 'fflmu',
	'Everyman 3': '2b62f',
	'Everyman 4': 'jkfzt',
	'Everyman 5': 'coamr',
	'Naptation': '90uzo',
	'SPAMAYL': 'yh1pp',
	'Segmented': 'k0mot',
	'Siesta': 'e72xy',
	'Tesla': 's2x5u',
	'Tri Core 1': 'tocl4',
	'Tri Core 2': '43swa',
	'Trimaxion': 'awkwb',
	'Triphasic': '8z46u',
	'Uberman': 'omr2x',
	'Monophasic': 'q6fkh'
}

var util = require('util');
var fs = require('fs')
var database = require('../server/database/database')

var refined = []
var keys = Object.keys(schedules)

var i = 0

function next(argument) {
  if(i == keys.length){
    fs.writeFileSync('sampleSchedules.js', JSON.stringify(refined, null, 2))
    return 
  }
	var scheduleID = schedules[keys[i]]

	database.getChart(scheduleID, function (err, response) {
    if (err) throw new Error(err)

    var elements = response.chartData.elements.map(el => {
      return {
        start: el.start,
        end: el.end,
        typeId: el.typeId,
        text: el.text
      }
    })
    refined.push({
    	name: keys[i],
    	elements
    })

    i++
	  next()
  })
}

next()








