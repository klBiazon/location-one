'use strict';
(function(){

class LocationListComponent {
  constructor($scope, API) {
    $scope.data = {};

    function get() {
      API.get(`stores`, '', function(res, err) {
        if (!err) {
          $scope.data = res;
        } else {
          console.log(err);
        }
      });
    }

    $scope.delete = function(data) {
      API.delete(`stores/` + data._id, '', function(res, err) {
        if (!err) {
          get();
        } else {
          console.log(err);
        }
      });
    }

    get();
  }
}

angular.module('locationOneApp')
  .component('locationList', {
    templateUrl: 'app/location/location-list/location-list.html',
    controller: LocationListComponent
  });

})();
