'use strict';

describe('Component: LocationListComponent', function () {

  // load the controller's module
  beforeEach(module('locationOneApp'));

  var LocationListComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LocationListComponent = $componentController('LocationListComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
