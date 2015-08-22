'use strict';

/**
 * @ngdoc function
 * @name TestIonicGenerator.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('TestIonicGenerator')
  .controller('HomeController', function($scope, ExampleService) {

    /*$scope.myHTML = null;

    // just an example...
    $scope.fetchRandomText = function() {
      ExampleService.doSomethingAsync()
        .then(ExampleService.fetchSomethingFromServer)
        .then(function(response) {
            $scope.myHTML = response.data.text;
            // close pull to refresh loader
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.fetchRandomText();*/

    $scope.gameList=[
      {title: "Ignore Color Combination", desc:"", state:"game:ignoreColorCombination"},
      {title: "Select Missing Sign", desc:"", state:"game:chooseMissingSign"}
    ];

  });
