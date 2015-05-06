

var chartControllers = angular.module('chartControllers',[]);

chartControllers.controller('ChartController', function($scope,$http,$routeParams){
	chartid=$routeParams.chartid;
	$http.get('get/'+chartid).success(function(data){
		$scope.chart=data;
		console.log(chartid);
		console.log(data);
		
		   sampleAnimator(data);
	
		
	})
	.error(function(data){
		alert('There was an error :'+data);
	});
});

chartControllers.controller('AboutController', function($scope,$http){
	$http.get('get/3pz41').success(function(data){
		$scope.chart=data;
		console.log(data);
	})
	.error(function(data){
		alert('There was an error :'+data);
	})
});

