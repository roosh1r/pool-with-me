var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice', 'geocoder']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice, geocoder) {
  $scope.formData = {};
  var coords = {};

  geocoder.initSearchBox();
  
  $scope.createUser = function() {
    var userData = {
        userName: $scope.formData.userName,
        gender: $scope.formData.gender,
        age: $scope.formData.age,
        home: $scope.formData.homeAddr,
        homeGPSPos: geocoder.getGPSCoords("home"),
        work: $scope.formData.workAddr,
        workGPSPos: geocoder.getGPSCoords("work"),
        startTime: $scope.formData.startTime,
        endTime: $scope.formData.endTime,
        favMusic: $scope.formData.favMusic,
        htmlverified: $scope.formData.htmlverified
    };

    $http.post('/users', userData)
      .success( function(data) {
        $scope.formData.userName = '';
        $scope.formData.gender = '';
        $scope.formData.age = '';
        $scope.formData.favMusic = '';
        $scope.formData.startTime = '';
        $scope.formData.endTime = '';
        $scope.formData.homeAddr = '';
        $scope.formData.workAddr = '';
        gservice.refresh(userData.homeGPSPos, userData.workGPSPos);
      })
      .error( function(data) {
        console.log('Error: ' + data);
      });
  };
});
