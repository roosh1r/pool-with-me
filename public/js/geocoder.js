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
        homeInput.value = place.formatted_address;
      });
      autocompleteWork = new google.maps.places.Autocomplete(workInput);
      autocompleteWork.addListener('place_changed', function() {
        var place = autocompleteWork.getPlace();
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

    addrCoder.reverseGeocode = function(latitude, longitude, callback) {
      var geocoder = new google.maps.Geocoder();

      var latlng = {lat: latitude, lng: longitude};

      var address;

      geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              address = results[0].formatted_address;
              callback(address);
            }
            else {
              address = 'Address for this location not found.';
              callback(address);
            }
          }
      });
    };
    return addrCoder;
  });
