'use strict';
(function(){

  class StoreComponent {
    constructor($scope, API) {
        $scope.positions = [];
        navigator.geolocation.getCurrentPosition(function (position) {
          API.get(`stores/location/near/` + position.coords.longitude + `/` + position.coords.latitude, '', function(res, err) {
            if (!err) {
                var location = [];
                for (var i = 0; i < res.length; i++) {
                  location = res[i].geoLocation.coordinates;
                  $scope.positions.push([location[1], location[0]]);
                }
            } else {
              console.log(err);
            }
          });
        });

    }
  }

  angular.module('locationOneApp')
    .component('store', {
      templateUrl: 'app/store/store.html',
      controller: StoreComponent
    });

})();
