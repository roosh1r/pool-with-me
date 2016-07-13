angular.module('gservice', [])
  .factory('gservice', function($http) {
    var googleMapService = {};

    var location = [];

    var selectedLat = 39.50;
    var selectedLong = -98.35;

    googleMapService.refresh = function(latitude, longitude) {
      locations = [];
      selectedLat = latitude;
      selectedLong = longitude;

      $http.get('/users').success(function(response) {

        locations = convertToMapPoints(response);

        initialize(latitude, longitude);

      }).error(function(){});
    };

    var convertToMapPoints = function(response) {
      var locations = [];

      for (var i = 0; i < response.length; i++) {
        var user = respons[i];

        var contentString = '<p><b>Username</b>: ' + user.username +
                            '<br><b>Age</b>: ' + user.age +
                            '<br><b>Gender</b>: ' + user.gender +
                            '<br><b>Favorite Music</b>: ' + user.favMusic +
                            '</p>';
        locations.push({
          latlon: new google.maps.LatLng(user.location[1], user.location[0]),
          message: new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 320
          }),
          username: user.username,
          gender: user.gender,
          age: user.age,
          favMusic: user.favMusic
        });
      }
      return locations;
    };
  });
