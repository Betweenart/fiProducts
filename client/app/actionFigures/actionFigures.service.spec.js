'use strict';

describe('Service: actionFigures', function () {

  // load the service's module
  beforeEach(module('fiProductsApp'));

  // instantiate service
  var actionFigures;
  beforeEach(inject(function (_actionFigures_) {
    actionFigures = _actionFigures_;
  }));

  it('should do something', function () {
    expect(!!actionFigures).toBe(true);
  });

});
