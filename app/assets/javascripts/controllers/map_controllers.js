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
		    Marker.get(
		    	bounds.getNorthEast().lat(), 
		    	bounds.getSouthWest().lat(), 
		    	bounds.getNorthEast().lng(), 
		    	bounds.getSouthWest().lng())
		    .then(function (markers){
		    	$scope.map.markers = markers;
		    	for (var i = 0; i < markers.length; i++) {
			    	gallery_scope.tweets.push({no: i, image_url: markers[i].url});
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
			    	gallery_scope.tweets.push({no: i, image_url: markers[i].url});
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
