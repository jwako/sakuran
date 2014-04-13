var mapControllers = angular.module('mapControllers', ['google-maps']);

mapControllers.controller('MapCtrl', function($scope, $http, Marker) {
  
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
    	latitude: 35.688156,
    	longitude: 139.745957
    },
    zoom: 15,
    dragging: true,
    events: {
    	tilesloaded: function (map, eventName, originalEventArgs) {
		    var gallery_scope = angular.element('#gallery').scope();
		    gallery_scope.tweets = [];
  			$scope.map.markers = [];
	      var map = $scope.map.control.getGMap();
	      var bounds = map.getBounds();
		    Marker.get(
		    	bounds.getNorthEast().lat(), 
		    	bounds.getSouthWest().lat(), 
		    	bounds.getNorthEast().lng(), 
		    	bounds.getSouthWest().lng())
		    .then(function (markers){
		    	$scope.map.markers = markers;
		    	for (var i = 0; i < markers.length; i++) {
			    	gallery_scope.tweets.push({no: i, id: markers[i].id, image_url: markers[i].url});
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
		    Marker.get(
		    	bounds.getNorthEast().lat(), 
		    	bounds.getSouthWest().lat(), 
		    	bounds.getNorthEast().lng(), 
		    	bounds.getSouthWest().lng())
		    .then(function (markers){
		    	$scope.map.markers = markers;
		    	for (var i = 0; i < markers.length; i++) {
			    	gallery_scope.tweets.push({no: i, id: markers[i].id, image_url: markers[i].url});
			    }
		    });
			}
    }
	};

  $http.get('/assets/models/cities.json').then(function(res) {
  	var rand = Math.floor(Math.random()*res.data.length);
  	$http.get('/v1/locations', { 
	    	params: { 
	    		location: res.data[rand].city
	    	}
	    }).then(function (response){
	    	$scope.map.center.latitude = response.data.location.lat;
	    	$scope.map.center.longitude = response.data.location.lng;
	    	$scope.map.zoom = 15;
		});
  });

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

mapControllers.controller('SearchCtrl', function($scope, $http) {
	$scope.searchLocation = function() {
		$http.get('/v1/locations', { 
	    	params: { 
	    		location: $scope.location
	    	}
	    }).then(function (response){
	    	var map_scope = angular.element('#map').scope();
	    	map_scope.map.center.latitude = response.data.location.lat;
	    	map_scope.map.center.longitude = response.data.location.lng;
	    	map_scope.map.zoom = 15;
		});
	};
});
