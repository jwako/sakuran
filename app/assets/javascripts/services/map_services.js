var mapServices = angular.module('mapServices', []);

mapServices.factory('Marker', function($http) {
	
	var mapService = {
		getMarkers : function(map_ne_lat, map_sw_lat, map_ne_lng, map_sw_lng) {
	    var response = $http.get('/v1/tweets?ne_lat='+map_ne_lat+'&sw_lat='+map_sw_lat+'&ne_lng='+map_ne_lng+'&sw_lng='+map_sw_lng).success(function(data) {
	    	return data;
			});
		  return response;
		}
	};
	return mapService;
});