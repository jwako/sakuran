var mapControllers = angular.module('mapControllers', ['google-maps']);

mapControllers.controller('MapCtrl', function($scope, $http, Marker) {

  var makeMarker = function(no, lat,lon,url,screen_name,tweet_created_at,tweet_url) {
    var marker = {
    	no: no,
      mcoords: {
        latitude: lat,
        longitude: lon
      },
      url: url,
      screen_name: screen_name,
      tweet_created_at: tweet_created_at,
      tweet_url: tweet_url,
      icon: '/assets/flower.png',
      showWindow: false
    };
    return marker;
  };
  
	$scope.onMarkerClicked = function(marker) {
    _.each($scope.map.markers, function(mker) {
      mker.showWindow = false;
    });
    marker.showWindow = true;
  };

	$scope.map = {
		control:{},
		markers: [],
    center: {
    	latitude: 0,
    	longitude: 0
    },
    zoom: 6,
    dragging: true,
    events: {
    	tilesloaded: function (map, eventName, originalEventArgs) {
		    var gallery_scope = angular.element('#gallery').scope();
		    gallery_scope.tweets = [];
  			$scope.map.markers = [];
	      var map = $scope.map.control.getGMap();
	      var bounds = map.getBounds();
		    map_ne_lat = bounds.getNorthEast().lat();
		    map_sw_lat = bounds.getSouthWest().lat();
		    map_ne_lng = bounds.getNorthEast().lng();
		    map_sw_lng = bounds.getSouthWest().lng();
    		Marker.getMarkers(map_ne_lat, map_sw_lat, map_ne_lng, map_sw_lng).then(function(marker){
					for (var i = 0; i < marker.data.length; i++) {
						$scope.map.markers.push(
							makeMarker(
								i,
								marker.data[i].lat, 
								marker.data[i].lon, 
								marker.data[i].url, 
								marker.data[i].screen_name, 
								marker.data[i].tweet_created_at,
								marker.data[i].tweet_url)
						);
				  	gallery_scope.tweets.push({no: i, image_url: marker.data[i].url});
				  }
    		});
      },
    	zoom_changed: function () {
    	},
	    dragend: function () {
		    var gallery_scope = angular.element('#gallery').scope();
		    gallery_scope.tweets = [];
  			$scope.map.markers = [];
	      var map = $scope.map.control.getGMap();
	      var bounds = map.getBounds();
		    map_ne_lat = bounds.getNorthEast().lat();
		    map_sw_lat = bounds.getSouthWest().lat();
		    map_ne_lng = bounds.getNorthEast().lng();
		    map_sw_lng = bounds.getSouthWest().lng();
    		Marker.getMarkers(map_ne_lat, map_sw_lat, map_ne_lng, map_sw_lng).then(function(marker){
					for (var i = 0; i < marker.data.length; i++) {
						$scope.map.markers.push(
							makeMarker(
								i,
								marker.data[i].lat, 
								marker.data[i].lon, 
								marker.data[i].url, 
								marker.data[i].screen_name, 
								marker.data[i].tweet_created_at,
								marker.data[i].tweet_url)
						);
				  	gallery_scope.tweets.push({no: i, image_url: marker.data[i].url});
				  }
    		});
			}
    }
	};

  $http.get('/assets/models/cities.json').then(function(res) {
  	var rand = Math.floor(Math.random()*res.data.length)
  	$scope.map.center.latitude = res.data[rand].latitude;
    $scope.map.center.longitude = res.data[rand].longitude;
    $scope.map.zoom = 15;
  });

	$scope.focusImage = function(marker) {
		var gallery_scope = angular.element('#gallery').scope();
		var tweet = gallery_scope.tweets[marker.no];
		$("#zoom").append("<img href='" + tweet.url + " '>");
	}
});

mapControllers.controller('GalleryCtrl', function($scope, $http) {
	$scope.tweets = [];
	$scope.focusMarker = function(tweet) {
		var map_scope = angular.element('#map').scope();
		var marker = map_scope.map.markers[tweet.no];
		_.each(map_scope.map.markers, function(mker) {
      mker.showWindow = false;
    });
		marker.showWindow = true;
  }
});
