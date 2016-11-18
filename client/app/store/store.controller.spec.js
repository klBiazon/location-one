'use strict';

describe('Component: StoreComponent', function () {

  // load the controller's module
  beforeEach(module('locationOneApp'));

  var StoreComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    StoreComponent = $componentController('StoreComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
