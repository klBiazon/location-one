'use strict';

angular.module('locationOneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        template: '<location-list></location-list>',
        authenticate: 'admin'
      });
  });
