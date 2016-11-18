'use strict';

angular.module('locationOneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('location-form', {
        url: '/location/form',
        params: { data: null },
        template: '<location></location>',
        authenticate: 'admin'
      });
  });
