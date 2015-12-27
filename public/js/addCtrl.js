// creates addCtrl Module and Controller.
var addCtrl = angular.module('addCtrl', ['geolocation']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation){

  /* Functions
  ------------------------ */
  $scope.createUser = function() {

    // Grab all of the text box fields
    var userData = {
      username: $scope.formData.username,
      sex: $scope.formData.sex,
      age: $scope.formData.age,
      favlang: $scope.formData.favlang,
      location: [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverified
    };

    // Saves the user data to the database
    $http.post('/users', userData)
    .success(function (data) {
      // Once complete, clear the form except location
      $scope.formData.username = "";
      $scope.formData.sex = "";
      $scope.formData.age = "";
      $scope.formData.favlang = "";
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });

  };

});
