
var database = require('./database/database');

module.exports = {
	create: function(req, res) {

		var data = JSON.parse(req.body.data)


		database.createChart(data, function(err, response) {
			if(err) throw new Error(err)

			res.send(response)
		})
	},

	get: function(req, res) {
		var chartid = req.param('chartid')

		database.getChart(chartid, function(err, response) {
			if(err) throw new Error(err)
				console.log(req.params)
			res.send(response)
		})
	}
}