var napchart= angular.module('napchart',[
	'ngRoute',
	'chartControllers'
]);

napchart.config(function($routeProvider,$locationProvider){
	$routeProvider.
	when('/about',{
	   templateUrl:'partials/about.html',
	   controller:'AboutController'
	})
	.when('/:chartid',{
		templateUrl:'partials/chart.html',
		controller:'ChartController'
	})
	.when('/',{
		templateUrl:'partials/chart.html',
		controller:'ChartController'
	}).
	otherwise({
		redirectTo: '/404'
	});
	
	
	// use the HTML5 History API
	$locationProvider.html5Mode(true);
});