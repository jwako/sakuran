var mapControllers = angular.module('mapControllers', ['google-maps']);

mapControllers.controller('MapCtrl', function($scope, $http, Marker) {

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
      },
      zoom_changed: function() {},
      dragend: function() {
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
    }
  };

  $http.get('/assets/models/cities.json').then(function(res) {
    var rand = Math.floor(Math.random() * res.data.length);
    $http.get('/v1/locations', {
      params: {
        location: res.data[rand].city
      }
    }).then(function(response) {
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
    }).then(function(response) {
      var map_scope = angular.element('#map').scope();
      map_scope.map.center.latitude = response.data.location.lat;
      map_scope.map.center.longitude = response.data.location.lng;
      map_scope.map.zoom = 15;
    });
  };
});

mapControllers.controller('PhotoDetailCtrl', function($scope, $http, $location, Marker) {

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
        var bounds = map.getBounds();
        $http.get('/v1/tweets/' + tweet_id, {
          params: {
            ne_lat: bounds.getNorthEast().lat(),
            sw_lat: bounds.getSouthWest().lat(),
            ne_lng: bounds.getNorthEast().lng(),
            sw_lng: bounds.getSouthWest().lng()
          }
        }).success(function(data) {
          $scope.map.center.latitude = parseFloat(data[0].lat);
          $scope.map.center.longitude = parseFloat(data[0].lon);
          $scope.map.zoom = 14;
          $scope.map.markers.push({
            url: data[0].url,
            mcoords: {
              latitude: data[0].lat,
              longitude: data[0].lon
            },
            screen_name: data[0].screen_name,
            tweet_created_at: data[0].tweet_created_at,
            tweet_url: data[0].tweet_url,
            text: data[0].text,
            prefecture: data[0].prefecture,
            city: data[0].city
          });
          $scope.tweets = [];
          for (var i = 0; i < data[0].tweets.length; i++) {
            $scope.tweets.push({
              no: i,
              id: data[0].tweets[i].id,
              image_url: data[0].tweets[i].url
            });
          }
        });
      }
    }
  };

});
