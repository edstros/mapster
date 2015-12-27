// creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
  .factory('gservice', function ($http) {

    /* Initialize variables
    --------------------------- */

    // The service our factory will return
    var googleMapService = {};

    // Array of locations obtained from API calls
    var locations = [];

    // Selected location (initialize to Nashville)
    var selectedLat = 36.174465;
    var selectedLng = -86.767960;

    /* Functions
    ------------------------------ */

    // Refresh the Map with the new data. Function will take new latitude and longitude coordinates
    googleMapService.refresh = function (latitude, longitude) {

      //clear the holding array of locations
      locations = [];

      // Set the selected lat and lng  equal to the ones provided on the refresh() call
      selectedLat = latitude;
      selectedLng = longitude;

      // Perform an AJAX call to get all of the records in the db
      $http.get('/users').success(function (res) {

        //convert the results into Google Map format
        locations = convertToMapPoints(res);

        // Then initialize the map
        initialize(latitude, longitude);
      }).error(function () {});
    };

    /* Private Inner Functions
    ------------------------------- */

    // Convert a JSON of users into map points
    var convertToMapPoints = function (res) {
      var locations = [];

      // Loop through all of the JSON enries provided in the response
      for (var = i; i < res.length; i++) {
        var user = res[i];

        // Create popup winows for each record
        var contentString =
          '<p><b>Username</b>: ' + user.username +
          '<br><b>Age</b>: ' + user.age +
          '<br><b>Sex</b>: ' + user.sex +
          '<br><b>Favorite Language</b>: ' + user.favlang +
          '</p>';

        // Converts each of the JSON records into Google Maps location format (Note [Lat, Lng] format)
        locations.push({
        latlng: new google.maps.LatLng(user.location[1], user.location[0]),
          message: new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 320
          }),
        username: user.username,
          sex: user.sex,
          age: user.age,
          favlang: user.favlang
        });
      }
      // location is now an array populated with records in Google Maps format
      return locations;
    };
// Initializes the map
  var initialize = function(latitude, longitude) {

    // Users the selected lat, lng as starting point
    var myLatLng = {lat: selectedLat, lng: selectedLng};

    // If map has not been already created
    if(!map){

      // Create a new map and place it in the index.html page
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: myLatLng
      });
    }
    // Loop through each location in the array and place a marker
    locations.forEach(function(n, i){
      var marker = new google.maps.Marker({
        position: n.latlng,
        map: map,
        title: "Land of Mapster",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });

      // For each marker created, add a listener that checks for clicks
      google.maps.event.addListener(marker, 'click', function(e) {

        // When clicked, open the selected marker's message
        currentSelectedMarker = n;
        n.message.open(map, marker);
      });

    });

    // Set initial location as a bouncing red marker
    var initialLocation = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
      position: initialLocation,
      animation: google.maps.Animation.BOUNCE,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = marker;

  };

  // Refresh the page upon window load. Use the initial latutide and longutude
  google.maps.event.addDomListener(window, 'load', googleMapService.refresh(selectedLat, selectedLng));

return googleMapService;

  });
