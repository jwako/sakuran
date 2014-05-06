var mapServices = angular.module('mapServices', []);

mapServices.factory('Marker', function($http, $q) {

  var makeMarker = function(no, id, lat, lon, url, screen_name, tweet_created_at, tweet_url, text, prefecture, city) {
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
      text: text,
      prefecture: prefecture,
      city: city,
      showWindow: false
    };
    return marker;
  };

  var paramsOf = function(bounds) {
    return {
      ne_lat: bounds.getNorthEast().lat(),
      sw_lat: bounds.getSouthWest().lat(),
      ne_lng: bounds.getNorthEast().lng(),
      sw_lng: bounds.getSouthWest().lng()
    }
  }

  return {
    getAll: function(bounds) {
      var markers = [];
      return $http.get('/v1/tweets', {
        params: paramsOf(bounds)
      }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          markers.push(makeMarker(
            i,
            response.data[i].id,
            response.data[i].lat,
            response.data[i].lon,
            response.data[i].url,
            response.data[i].screen_name,
            response.data[i].tweet_created_at,
            response.data[i].tweet_url,
            response.data[i].text,
            response.data[i].prefecture,
            response.data[i].city));
        }
        return markers;
      });
    },

    getOne: function(id, bounds) {
      var markers = [],
        tweets = [];
      return $http.get('/v1/tweets/' + id, {
        params: paramsOf(bounds)
      }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          markers.push(makeMarker(
            i,
            response.data[i].id,
            response.data[i].lat,
            response.data[i].lon,
            response.data[i].url,
            response.data[i].screen_name,
            response.data[i].tweet_created_at,
            response.data[i].tweet_url,
            response.data[i].text,
            response.data[i].prefecture,
            response.data[i].city));
        }
        for (var i = 0; i < response.data[0].tweets.length; i++) {
          tweets.push({
            no: i,
            id: response.data[0].tweets[i].id,
            image_url: response.data[0].tweets[i].url
          });
        }
        return {
          markers: markers,
          tweets: tweets
        };
      });
    },

    getLocation: function(location) {
      return $http.get('/v1/locations', {
        params: {
          location: location
        }
      }).then(function(response) {
        return {
          latitude: response.data.location.lat,
          longitude: response.data.location.lng
        }
      });
    }
  };
});
