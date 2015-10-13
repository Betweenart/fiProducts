'use strict';

angular.module('fiProductsApp')
  .controller('ProductsCtrl', function ($scope, $http, actionFigures) {
    $scope.searchProduct = '';
    $scope.sortType = 'id'; // default sort type
    $scope.sortReverse = false;  // default sort order (asc=false)
    $scope.products = [];

    actionFigures.getProducts().then((products) => {
      $scope.products = products;
    });

    $scope.saveProduct = (data) => {
      actionFigures.saveProduct(data).then(()=> {
        console.log('Product Saved');
      });
    };

    $scope.addProduct = (data) => {
      actionFigures.addProduct(data).then(()=> {
        console.log('Product Added');
      });
    };

    $scope.deleteProduct = (index, id) => {
      $scope.tempData = $scope.products[index]; // hold item data if server removal fails
      $scope.products.splice(index, 1); // remove from model
      actionFigures.deleteProduct(id).then(()=> {
        $scope.tempData = null; // reset temp object if all is fine
        console.log('Product Removed');
      });
    };

    $scope.checkName = (name) => {
      if (name.length < 2) {
        alert('Come on! Name is to short.');
        return false;
      }
    };

    $scope.addProduct = function () {
      actionFigures.addProduct().then((data)=> {
        console.log('Product Added');
        $scope.products.push(data);
      });
    };

  });
