var schedules = {
	'Biphasic': '30lbn',
	'Dual Core 1': 'mf93j',
	'Dual Core 2': 'h58rh',
	'Dual Core 3': 'arx4r',
	'Dual Core 4': 'qtny6',
	'Dymaxion': 'zgqtz',
	'Everyman 2': 'fflmu',
	'Everyman 3': '2b62f',
	'Everyman 4': 'jkfzt',
	'Everyman 5': 'coamr',
	'Naptation': '90uzo',
	'Quadphasic': 'qamnm',
	'SPAMAYL': 'yh1pp',
	'Segmented': 'k0mot',
	'Siesta': 'e72xy',
	'Tesla': 's2x5u',
	'Tri Core 1': 'tocl4',
  'Tri Core 2': '43swa',
	'Trimaxion': 'awkwb',
	'Triphasic': '8z46u',
	'Uberman': 'omr2x',
  'Mutated Mono': 'yig06',
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
    fs.writeFileSync('sampleShedules.js', JSON.stringify(refined, null, 2))
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








