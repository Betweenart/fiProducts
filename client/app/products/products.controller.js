'use strict';

angular.module('fiProductsApp')
  .controller('ProductsCtrl', function ($scope, $http) {
    $scope.products = [];

    // TODO move to service
    $http.get('/api/products').success(function (products) {
      $scope.products = products;
    });

  });
