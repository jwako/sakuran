var mapControllers = angular.module('mapControllers', ['google-maps']);

mapControllers.controller('MapCtrl', function($scope, $http) {

	$scope.onMarkerClicked = function(marker) {
    _.each($scope.map.markers, function(mker) {
      mker.showWindow = false;
    });
    marker.showWindow = true;
  };

  var makeMarker = function(lat,lon,text,url,screen_name,tweet_created_at,tweet_url) {
    var marker = {
      mcoords: {
        latitude: lat,
        longitude: lon
      },
      text: text,
      url: url,
      screen_name: screen_name,
      tweet_created_at: tweet_created_at,
      tweet_url: tweet_url,
      icon: '/assets/flower.png',
      showWindow: false
    };
    return marker;
  };

	$scope.map = {
		control:{},
		markers: [],
    center: {
        latitude: 35.4138,
        longitude: 139.4505
    },
    zoom: 6,
    dragging: true,
    events: {
    	zoom_changed: function () {
    	},
	    dragend: function () {
        $scope.map.markers = [];
        var map = $scope.map.control.getGMap();
        var bounds = map.getBounds();
		    map_ne_lat = bounds.getNorthEast().lat();
		    map_sw_lat = bounds.getSouthWest().lat();
		    map_ne_lng = bounds.getNorthEast().lng();
		    map_sw_lng = bounds.getSouthWest().lng();
		    var gallery_scope = angular.element('#gallery').scope();
		    gallery_scope.items = [];
		    $http.get('/v1/tweets?ne_lat='+map_ne_lat+'&sw_lat='+map_sw_lat+'&ne_lng='+map_ne_lng+'&sw_lng='+map_sw_lng).success(function(data) {
					for (var i = 0; i < data.length; i++) {
						$scope.map.markers.push(
							makeMarker(
								data[i].lat, 
								data[i].lon, 
								data[i].text, 
								data[i].url, 
								data[i].screen_name, 
								data[i].tweet_created_at,
								data[i].tweet_url)
						);
				  	gallery_scope.items.push({image_url: data[i].url});
				  }
			  });
			}
    }
	};

	$http.get('/v1/tweets').success(function(data) {
		for (var i = 0; i < data.length; i++) {
	  	$scope.map.markers.push(
				makeMarker(
					data[i].lat, 
					data[i].lon, 
					data[i].text, 
					data[i].url, 
					data[i].screen_name, 
					data[i].tweet_created_at,
					data[i].tweet_url)
	  	);
	  }
  });

});

mapControllers.controller('GalleryCtrl', function($scope, $http) {
	$scope.items = [];
});
