'use strict';

angular.module('locationOneApp.auth', ['locationOneApp.constants', 'locationOneApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
