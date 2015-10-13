'use strict';

angular.module('fiProductsApp')
  .service('actionFigures', function ($http, $q) {
    // something got f***
    var handleError = (response) => {
      if (!angular.isObject(response.data) || !response.data.message) {
        return ( $q.reject("An unknown error occurred.") );
      }
      // Otherwise, use expected error message.
      return ( $q.reject(response.data.message) );
    };

    // all good so give the data
    var handleSuccess = (response) => {
      return ( response.data );
    };

    // Return awesome API
    return ({
      getAllProducts: () => {
        var request = $http({
          method: "get",
          url: "/api/products"
        });

        return ( request.then(handleSuccess, handleError) );
      },

      getProduct: (id) => {
        var request = $http({
          method: "get",
          url: "/api/products/" + id
        });

        return ( request.then(handleSuccess, handleError) );
      },

      addProduct: () => {
        var request = $http({
          method: "post",
          url: "/api/products"
        });
        return ( request.then(handleSuccess, handleError) );
      },

      saveProduct: (data) => {
        var request = $http({
          method: "put",
          url: "/api/products/" + data.id,
          data: data
        });
        return ( request.then(handleSuccess, handleError) );
      },

      deleteProduct: (id) => {
        var request = $http({
          method: "delete",
          url: "/api/products/" + id,
          data: {
            id: id
          }
        });
        return ( request.then(handleSuccess, handleError) );
      }
    });
  });
