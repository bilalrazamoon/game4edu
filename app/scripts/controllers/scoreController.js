'use strict';

/**
 * @ngdoc function
 * @name TestIonicGenerator.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('TestIonicGenerator')
  .controller('ScoreController', function ($scope) {
    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 50, 100];
    $scope.colours=['#9C27B0', '#46BFBD', '#FDB45C'];
    $scope.sample=[
      {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      }
    ];
  });
