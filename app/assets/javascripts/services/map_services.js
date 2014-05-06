var mapServices = angular.module('mapServices', []);

mapServices.factory('Marker', function($http) {
	
	var makeMarker = function(no,id,lat,lon,url,screen_name,tweet_created_at,tweet_url) {
    var marker = {
    	no: no,
    	id: id,
      mcoords: {
        latitude: lat,
        longitude: lon
      },
      url: url,
      screen_name: screen_name,
      tweet_created_at: tweet_created_at,
      tweet_url: tweet_url,
      showWindow: false
    };
    return marker;
  };

	return {
		get: function(map_ne_lat, map_sw_lat, map_ne_lng, map_sw_lng) {
			var markers = [];
			return $http.get('/v1/tweets', { 
	    	params: { 
					ne_lat: map_ne_lat,
	    		sw_lat: map_sw_lat,
	    		ne_lng: map_ne_lng,
	    		sw_lng: map_sw_lng
	    	}
	    }).then(function (response){
				for (var i = 0; i < response.data.length; i++) {
	    		markers.push(makeMarker(
						i,
						response.data[i].id,
						response.data[i].lat, 
						response.data[i].lon, 
						response.data[i].url, 
						response.data[i].screen_name, 
						response.data[i].tweet_created_at,
						response.data[i].tweet_url)
		    	);
		    }
		    return markers;
	    });
		}
	};
});
