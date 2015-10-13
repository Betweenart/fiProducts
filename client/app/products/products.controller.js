'use strict';

angular.module('fiProductsApp')
  .controller('ProductsCtrl', function ($scope, $http) {
    $scope.searchProduct = '';
    $scope.sortType = 'id'; // default sort type
    $scope.sortReverse = false;  // default sort order (asc=false)
    $scope.products = [];

    // TODO move to service
    $scope.loadProducts = () => {
      $http.get('/api/products').success(function (list) {
        $scope.products = list;
      });
    };

    $scope.saveProduct = (data) => {
      $http.post('/api/products/save', data).success(function () {
        // TODO parse saved ?
      });
    };

    $scope.addProduct = (data) => {
      $http.post('/api/products/add', data).success(function () {
        // TODO parse added ?
      });
    };

    $scope.deleteProduct = (index, id) => {
      $scope.tempData = $scope.products[index]; // hold item data if server removal fails
      $scope.products.splice(index, 1); // remove from model
      $http.post('/api/products/delete', id).success(function () {
        // TODO parse removed ?
        $scope.tempData = null; // reset temp object if all is fine
      });
    };

    $scope.checkName = (name) => {
      if (name.length < 2) {
        alert('Come on! Name is to short.');
        return false;
      }
    };

    $scope.addProduct = function () {
      $scope.inserted = {
        id: $scope.products.length + 1,
        name: '',
        price: null,
        currency: '£',
        info: '',
        imageUrl: '',
        type: 'Action Figure',
        stock: 1
      };
      $scope.products.push($scope.inserted);
    };

    $scope.loadProducts();

  });
