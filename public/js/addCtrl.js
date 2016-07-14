var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice) {
  $scope.formData = {};
  var coords = {};
  var homeLat = 0, homeLong = 0;
  var workLat = 0, workLong = 0;

  $scope.formData.homeLatitude = 41.9950;
  $scope.formData.homeLongitude = -88.1856;

  $scope.formData.workLatitude = 41.8781;
  $scope.formData.workLongitude = -87.6298;

  $scope.createUser = function() {
    var userData = {
        userName: $scope.formData.userName,
        gender: $scope.formData.gender,
        age: $scope.formData.age,
        favMusic: $scope.formData.favMusic,
        startTime: $scope.formData.startTime,
        endTime: $scope.formData.endTime,
        home: [$scope.formData.homeLongitude, $scope.formData.homeLatitude],
        work: [$scope.formData.workLongitude, $scope.formData.workLatitude],
        htmlverified: $scope.formData.htmlverified
    };

    $http.post('/users', userData)
      .success( function(data) {
        $scope.formData.userName = "";
        $scope.formData.gender = "";
        $scope.formData.age = "";
        $scope.formData.favMusic = "";
        $scope.formData.startTime = "";
        $scope.formData.endTime = "";
        gservice.refresh($scope.formData.homeLatitude, $scope.formData.homeLongitude);
      })
      .error( function(data) {
        console.log('Error: ' + data);
      });
  };
});
