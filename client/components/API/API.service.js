'use strict';

(function() {

  function ApiResource($http) {
    return {
      get: function(api, params, callback) {
        $http({
          method: 'GET',
          url: 'api/' + api + params
        }).then(function(response) {
            callback(response.data, false);
        }, function(error) {
            callback(undefined, error);
        });
      },
      post: function(api, callback, data) {
        $http({
          method: 'POST',
          url:'api/' + api,
          data: data
        }).then(function(response) {
            callback(response.data, false);
        }, function(error) {
            callback(undefined, error);
        });
      },
      update: function(api, params, callback, data) {
        $http({
          method: 'PUT',
          url: 'api/' + api + params,
          data: data
        }).then(function(response) {
            callback(response.data, false);
        }, function(error) {
            callback(undefined, error);
        });
      },
      delete: function(api, params, callback) {
        $http({
          method: 'DELETE',
          url: 'api/' + api + params
        }).then(function(response) {
            callback(response, false);
        }, function(error) {
            callback(false, error);
        });
      }
    };
  }
  angular.module('locationOneApp')
    .factory('API', ApiResource);

})();
