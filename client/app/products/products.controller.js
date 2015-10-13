'use strict';

angular.module('fiProductsApp')
  .controller('ProductsCtrl', function ($scope, $http, actionFigures) {
    $scope.searchProduct = '';
    $scope.sortType = 'id'; // default sort type
    $scope.sortReverse = false;  // default sort order (asc=false)
    $scope.products = [];

    /**
     * Get and apply all products from DB
     */
    actionFigures.getAllProducts().then((products) => {
      $scope.products = products;
    });

    /**
     * Save/Update product in DB by Id + body json
     */
    $scope.saveProduct = (data, id) => {
      data.id = id;
      actionFigures.updateProduct(data).then(()=> {
        console.log('Product Saved:');
      });
    };

    /**
     * Remove product from DB by ID
     */
    $scope.deleteProduct = (index, id) => {
      actionFigures.deleteProduct(id).then(()=> {
        $scope.products.splice(index, 1); // remove from model
      });
    };

    /**
     * Little check if name is not to short
     */
    $scope.checkName = (name) => {
      if (name.length < 2) {
        alert('Come on! Name is to short.');
        return false;
      }
    };

    /**
     * Add product to DB and to scope if successful
     */
    $scope.addProduct = function () {
      actionFigures.addProduct().then((data)=> {
        console.log('Product Added');
        $scope.products.push(data);
      });
    };

  });
