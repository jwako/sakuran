var mapControllers = angular.module('mapControllers', ['google-maps']);

mapControllers.controller('MapCtrl', function($scope, $http, Marker) {

  var loadData = function() {
    var gallery_scope = angular.element('#gallery').scope();
    gallery_scope.tweets = [];
    $scope.map.markers = [];
    Marker.getAll($scope.map.control.getGMap().getBounds())
      .then(function(markers) {
        $scope.map.markers = markers;
        for (var i = 0; i < markers.length; i++) {
          gallery_scope.tweets.push({
            no: i,
            id: markers[i].id,
            image_url: markers[i].url
          });
        }
      });
  }

  $scope.onMarkerClicked = function(marker) {
    _.each($scope.map.markers, function(mker) {
      mker.showWindow = false;
    });
    marker.showWindow = true;
  };

  $scope.map = {
    control: {},
    markers: [],
    center: {
      latitude: 35.688156,
      longitude: 139.745957
    },
    zoom: 15,
    dragging: true,
    events: {
      tilesloaded: function(map, eventName, originalEventArgs) {
        loadData();
      },
      zoom_changed: function() {},
      dragend: function() {
        loadData();
      }
    }
  };

  $http.get('/assets/models/cities.json').then(function(res) {
    var rand = Math.floor(Math.random() * res.data.length);
    Marker.getLocation(res.data[rand].city).then(function(response){
      $scope.map.center.latitude = response.latitude;
      $scope.map.center.longitude = response.longitude;
    });
  });

});

mapControllers.controller('GalleryCtrl', function($scope) {
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

mapControllers.controller('SearchCtrl', function($scope, Marker) {
  $scope.searchLocation = function() {
    Marker.getLocation($scope.location).then(function(response) {
      var map_scope = angular.element('#map').scope();
      map_scope.map.center.latitude = response.latitude;
      map_scope.map.center.longitude = response.longitude;
    });
  };
});

mapControllers.controller('PhotoDetailCtrl', function($scope, $location, Marker) {

  $scope.map = {
    control: {},
    markers: [],
    center: {
      latitude: 35.688156,
      longitude: 139.745957
    },
    zoom: 14,
    dragging: false,
    draggable: false,
    events: {
      tilesloaded: function(map, eventName, originalEventArgs) {
        if ($scope.map.markers.length > 0) {
          return false;
        }
        var tweet_id = $location.absUrl().split('/photos/')[1];
        Marker.getOne(
          tweet_id,
          map.getBounds())
          .then(function(data) {
            $scope.map.center.latitude = parseFloat(data.markers[0].mcoords.latitude);
            $scope.map.center.longitude = parseFloat(data.markers[0].mcoords.longitude);
            $scope.map.markers.push(data.markers[0]);
            $scope.tweets = data.tweets;
          });
      }
    }
  };

});
