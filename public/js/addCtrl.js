var addCtrl = angular.module('addCtrl', ['geolocation']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation) {
  $scope.formData = {};
  var coords = {};
  var homeLat = 0, homeLong = 0;
  var workLat = 0, workLong = 0;

  $scope.formData.homeLatitude = 39.500;
  $scope.formData.homeLongitude = -98.350;

  $scope.formData.workLatitude = 33.500;
  $scope.formData.workLongitude = -97.350;

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
      })
      .error( function(data) {
        console.log('Error: ' + data);
      });
  };
});
