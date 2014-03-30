var mapControllers = angular.module('mapControllers', ['google-maps']);

mapControllers.controller('MapCtrl', function($scope, $http) {
	$scope.items = [];
	$scope.map = {
		control:{},
    center: {
        latitude: 35.4138,
        longitude: 139.4505
    },
    zoom: 6,
    dragging: true,
    events: {
	    dragend: function () {
        $scope.items = [];
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
				  	$scope.items.push({ 
				  		latitude: data[i].lat, 
				  		longitude: data[i].lon, 
				  		text: data[i].text, 
				  		url: data[i].url, 
				  		icon: '/assets/flower.png' 
				  	});
				  	gallery_scope.items.push({
				  		image_url: data[i].url
				  	})
				  }
			  });
			}
    }
	};
	$http.get('/v1/tweets').success(function(data) {
		for (var i = 0; i < data.length; i++) {
	  	$scope.items.push({ 
	  		latitude: data[i].lat, 
	  		longitude: data[i].lon, 
	  		text: data[i].text, 
	  		url: data[i].url, icon: '/assets/flower.png' 
	  	});
	  }
  });
});

mapControllers.controller('GalleryCtrl', function($scope, $http) {
	$scope.items = [];
});
