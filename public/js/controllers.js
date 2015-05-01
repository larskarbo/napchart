

var napchart = angular.module('napchart',[]);

napchart.controller('MyController', function MyController($scope){
	$scope.charts=[
	{
		'id'	: 'e3ennl',
		'title'	: 'My napchart',
		'data':{
			 "alfa":{"0":{"start":540,"end":1020}},"charlie":{"0":{"start":1410,"end":450}},"delta":{"0":{"start":960,"end":980},"1":{"start":1080,"end":1100}}
		}
	},
	{
		'id'	: 'hturkt',
		'title'	: 'My second napchart',
		'data':{
			 "alfa":{"0":{"start":540,"end":1020}},"charlie":{"0":{"start":1410,"end":450}},"delta":{"0":{"start":960,"end":980},"1":{"start":1080,"end":1100}}
		}
	},
	{
		'id'	: 'a23nt8',
		'title'	: 'My third napchart',
		'data':{
			 "alfa":{"0":{"start":540,"end":1020}},"charlie":{"0":{"start":1410,"end":450}},"delta":{"0":{"start":960,"end":980},"1":{"start":1080,"end":1100}}
		}
	}
	]
});

