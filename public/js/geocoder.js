angular.module('geocoder', [])
  .factory('geocoder', function(){

    var addrCoder = {};

    var autcompleteHome, autocompleteWork;

    addrCoder.initAutoComplete = function(){
      autocompleteHome = new google.maps.places.Autocomplete(
        (document.getElementById('homeLocation')), {types: ['geocode']}
      );
      autocompleteHome.addListener('place_changed', function() {
        var place = autocompleteHome.getPlace();
        document.getElementById('homeLocation').value = place.formatted_address;
      });
      autocompleteWork = new google.maps.places.Autocomplete(
        (document.getElementById('workLocation')), {types: ['geocode']}
      );
      autocompleteWork.addListener('place_changed', function() {
        var place = autocompleteWork.getPlace();
        document.getElementById('workLocation').value = place.formatted_address;
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
