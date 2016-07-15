angular.module('geocoder', [])
  .factory('geocoder', function(){

    var addrCoder = {};

    var searchBoxHome, searchBoxWork;

    addrCoder.initSearchBox = function(){
      searchBoxHome = new google.maps.places.SearchBox(
        (document.getElementById('homeLocation')), {types: ['geocode']}
      );
      searchBoxHome.addListener('place_changed', function() {
        var place = searchBoxHome.getPlace();
        document.getElementById('homeLocation').value = place.formatted_address;
      });
      searchBoxWork = new google.maps.places.SearchBox(
        (document.getElementById('workLocation')), {types: ['geocode']}
      );
      searchBoxWork.addListener('place_changed', function() {
        var place = searchBoxWork.getPlace();
        document.getElementById('workLocation').value = place.formatted_address;
      });
    };

    addrCoder.getGPSCoords = function(site) {
      var myplace;
       if ( site === "home" ){
        myplace = searchBoxHome.getPlace();
       }
       else {
        myplace = searchBoxWork.getPlace();
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
          searchBoxHome.setBounds(circle.getBounds());
        });
      }
    };
    return addrCoder;
  });
