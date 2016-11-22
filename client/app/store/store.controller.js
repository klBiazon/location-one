'use strict';
(function(){

  class StoreComponent {
    constructor($scope, $timeout, API, NgMap) {
      $scope.stores = [];
      $scope.current = [];
      $scope.positions = [];
      $scope.message = 'Your location is based on your current location';
      $scope.option = true;
      $scope.showDirection = false;
      $scope.storeDirection = '';

      function searchNearBy (place) {
        $scope.positions = [];
        if($scope.option) {
          navigator.geolocation.getCurrentPosition(function (position) {
            $scope.current = [position.coords.latitude, position.coords.longitude];
            $timeout(function () {
              $scope.setNearByStores(position.coords);
            }, 1000);
          });
        } else {
          $scope.current = [place.latitude, place.longitude];
          $timeout(function () {
            $scope.setNearByStores(place);
          }, 1000);
        }
      }

      $scope.setNearByStores = function(position) {
        API.get(`stores/location/near/` + position.longitude + `/` + position.latitude, '', function(res, err) {
          if (!err) {
            $scope.stores = res;
            var location = [];
            for (var i = 0; i < res.length; i++) {
              location = res[i].geoLocation.coordinates;
              $scope.positions.push([location[1], location[0]]);
            }
          } else {
            console.log(err);
          }
        });
      };

      $scope.optionClicked = function() {
        $scope.showDirection = false;
        $scope.message = '';
        $scope.stores = [];
        if ($scope.option) {
          searchNearBy();
          $scope.message = 'Your location is based on your current location';
          $scope.address = '';
          $scope.storeDirection = '';
        } else {
          $scope.positions = [];
        }
      };

      $scope.placeChanged = function() {
        var place = {
          longitude: this.getPlace().geometry.location.lng(),
          latitude: this.getPlace().geometry.location.lat()
        }
        searchNearBy(place);
      };

      $scope.bounce = function() {
        this.setAnimation(google.maps.Animation.BOUNCE);
      };

      $scope.direction = function(store) {
        if ($scope.storeDirection === store._id) {
          $scope.showDirection = false;
          $scope.storeDirection = '';
        } else {
          $scope.destination = store.address;
          $scope.storeDirection = store._id;
          $scope.showDirection = true;
        }
      };

      searchNearBy();
    }
  }

  angular.module('locationOneApp')
    .component('store', {
      templateUrl: 'app/store/store.html',
      controller: StoreComponent
    });

})();
