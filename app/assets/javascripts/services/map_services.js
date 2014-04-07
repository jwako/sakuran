var mapServices = angular.module('mapServices', []);

mapServices.factory('Marker', function($http) {
	return {
		get: function(map_ne_lat, map_sw_lat, map_ne_lng, map_sw_lng) {
			return $http.get('/v1/tweets', { 
	    	params: { 
					ne_lat: map_ne_lat,
	    		sw_lat: map_sw_lat,
	    		ne_lng: map_ne_lng,
	    		sw_lng: map_sw_lng
	    	}
	    });
		}
	};
});