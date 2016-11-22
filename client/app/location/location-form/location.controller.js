'use strict';
(function(){

  class LocationComponent {
    constructor($state, $scope, API) {
      $scope.count = 0;
      $scope.edit = false;

      if ($state.params.data !== null) {
        $scope.edit = true;
        $scope.data = $state.params.data;
        $scope.count = Object.keys($scope.data).length;
      }

      $scope.placeChanged = function() {
        $scope.place = this.getPlace();
        $scope.data.geoLocation = {
          'coordinates': [
            $scope.place.geometry.location.lng(),
            $scope.place.geometry.location.lat()
          ]
        };
        $scope.count = Object.keys($scope.data).length;
      };

      $scope.addStore = function(data) {
        if ($scope.edit) {
          API.update(`stores/` + data._id, '', function(res, err) {
            if (!err) {
              $state.go('location');
            } else {
              console.log(err);
            }
          }, data);
        } else {
          API.post(`stores`, function(res, err) {
            if (!err) {
              $state.go('location');
            } else {
              console.log(err);
            }
          }, data);
        }
      };

      $scope.bounce = function() {
        this.setAnimation(google.maps.Animation.BOUNCE);
      };
    };
  }

  angular.module('locationOneApp')
    .component('location', {
      templateUrl: 'app/location/location-form/location.html',
      controller: LocationComponent
    });

})();
