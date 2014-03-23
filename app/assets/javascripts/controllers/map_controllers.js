var mapControllers = angular.module('mapControllers', ['google-maps']);

mapControllers.controller('MapCtrl', function($scope, $http) {
	$scope.items = [];
	$scope.map = {
    center: {
        latitude: 35.4138,
        longitude: 139.4505
    },
    zoom: 6,
    refresh: true,
    draggable: true
	};
	$http.get('/v1/tweets').success(function(data) {
		for (var i = 0; i < data.length; i++) {
	  	$scope.items.push({ "latitude" : data[i].lat, "longitude" : data[i].lon});
	  }
  });
});