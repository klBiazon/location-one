'use strict';

angular.module('locationOneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('store', {
        url: '/store',
        template: '<store></store>'
      });
  });
