angular.module('geocoder', [])
  .factory('geocoder', function(){

    var addrCoder = {};

    var autocompleteHome, autocompleteWork;

    addrCoder.initAutoComplete = function(){
      var homeInput = document.getElementById('homeLocation');
      var workInput = document.getElementById('workLocation');

      autocompleteHome = new google.maps.places.Autocomplete(homeInput);
      autocompleteHome.addListener('place_changed', function() {
        var place = autocompleteHome.getPlace();
        console.log(place);
        homeInput.value = place.formatted_address;
      });
      autocompleteWork = new google.maps.places.Autocomplete(workInput);
      autocompleteWork.addListener('place_changed', function() {
        var place = autocompleteWork.getPlace();
        console.log(place);
        workInput.value = place.formatted_address;
      });
    };

    addrCoder.getGPSCoords = function(site) {
      var myplace;
       if ( site === "home" ){
        myplace = autocompleteHome.getPlace();
       }
       else {
        myplace = autocompleteWork.getPlace();
       }
       return myplace.geometry.location;
    };

    addrCoder.geolocate = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function (position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocompleteHome.setBounds(circle.getBounds());
        });
      }
    };
    return addrCoder;
  });
