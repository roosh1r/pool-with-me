// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of Home locations obtained from API calls
        var locationsHome = [];
        //Array of Work Locations obtained from API calls
        var locationsWork = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 41.9116;
        var selectedLong = -87.8927;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude){

            // Clears the holding array of locations
            locationsHome = [];
            locationsWork = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // Perform an AJAX call to get all of the records in the db.
            $http.get('/users').success(function(response){

                // Convert the results into Google Map Format
                locationsHome = convertToMapPoints(response, "Home");
                locationsWork = convertToMapPoints(response, "Work");

                // Then initialize the map.
                initialize(latitude, longitude);

            }).error(function(){});
        };

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function(response, site){

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];

                // Create popup windows for each record
                var userHours = {};
                var start = new Date(user.startTime);
                var end = new Date(user.endTime);

                userHours.startTime = (start.getHours() < 10 ? '0'+start.getHours() : start.getHours())  + ':' + (start.getMinutes() < 10 ? '0'+start.getMinutes() : start.getMinutes());
                userHours.endTime = (end.getHours() < 10 ? '0'+end.getHours() : end.getHours())  + ':' + (end.getMinutes() < 10 ? '0'+end.getMinutes() : end.getMinutes());

                var  contentString =
                    '<p><b>Username</b>: ' + user.userName +
                    '<br><b>Hours: ' + userHours.startTime + ' - ' + userHours.endTime +
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                if (site === "Home") {

                  locations.push({
                    latlon: new google.maps.LatLng(user.home[1], user.home[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 240
                    }),
                    username: user.username,
                    gender: user.gender,
                    age: user.age,
                    favMusic: user.favMusic
                  });
                }
                else {
                  locations.push({
                    latlon: new google.maps.LatLng(user.work[1], user.work[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 240
                    }),
                    username: user.username,
                    gender: user.gender,
                    age: user.age,
                    favMusic: user.favMusic
                  });
                }
        }
        // location is now an array populated with records in Google Maps format
        return locations;
    };
    // Initializes the map
    var initialize = function(latitude, longitude) {
        var map;
        // Uses the selected lat, long as starting point
        var myLatLng = {
            lat: selectedLat,
            lng: selectedLong
        };
        // If map has not been created already...
        if (!map) {

            // Create a new map and place in the index.html page
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: new google.maps.LatLng(myLatLng.lat, myLatLng.lng)
            });
        }

        // Loop through each location in the array and place a marker
        placeMarkers(locationsHome, "Home", map);
        placeMarkers(locationsWork, "Work", map);

        // Set initial location as a bouncing red marker
        var initialLocation = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position: initialLocation,
            //animation: google.maps.Animation.BOUNCE,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
        });
        lastMarker = marker;

    };

    var placeMarkers = function(locations, site, map) {
      locations.forEach(function(n, i) {
        var marker = {};
        if (site == "Home") {
          marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: 'Home',
            icon: 'http://maps.google.com/mapfiles/kml/pal3/icon48.png'
          });
        }
        else {
          marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: 'Work',
            icon: 'http://maps.google.com/mapfiles/kml/pal3/icon21.png'
          });
        }

        google.maps.event.addListener(marker, 'click', function(e) {

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });

      });
    };

    // Refresh the page upon window load. Use the initial latitude and longitude
    google.maps.event.addDomListener(window, 'load',
        googleMapService.refresh(selectedLat, selectedLong));

    return googleMapService;
});
