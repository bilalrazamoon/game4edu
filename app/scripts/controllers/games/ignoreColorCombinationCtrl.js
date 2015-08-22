'use strict';

/**
 * @ngdoc function
 * @name TestIonicGenerator.controller:games:ignoreColorCombinationCtrl
 * @description
 * # ignoreColorCombinationCtrl
 */

angular.module('TestIonicGenerator')
  .controller('ignoreColorCombinationCtrl', function ($scope, $ionicLoading, $timeout, $interval) {
    $scope.score = 0;

    //progress
    var totalTime = 50, currentTime = 0;
    $scope.progress = function () {
      return (currentTime * 100) / totalTime + '%';
    };
    var colors = ['red', 'green', 'yellow', 'magenta', 'cyan', 'white', 'blue', 'brown', 'blueviolet', 'gray', 'teal', 'purple'];

    function random(a, b) {
      var r = Math.floor(Math.random() * colors.length);
      if (a == r || b == r)
        return arguments.callee(a, b);
      return r
    }

    function generate() {
      var a = random();
      var b = random(a);
      var c = random(a, b);
      var any = Math.floor(Math.random() * 2);
      var arr = [];
      arr[any] = {val1: colors[a], val2: colors[a]};
      arr[any ? '0' : '1'] = {val1: colors[b], val2: colors[c]};
      return arr
    }

    $scope.current = generate();
    $scope.submit = function (v1, v2) {
      if (v1 != v2) {
        $ionicLoading.show({template: '<h4>Correct!</h4>'});
        $timeout(function () {
          $ionicLoading.hide();
          $scope.score++;
          $scope.current = generate();
        }, 300);
      }
      else {
        $ionicLoading.show({template: '<h4>Incorrect!</h4>'});
        $timeout(function () {
          $scope.score--;
          $ionicLoading.hide()
        }, 300);
      }
    };

    var interval = $interval(function () {
      if (currentTime >= totalTime) {
        $interval.cancel(interval);
        $ionicLoading.show({template: '<h4>Game Over</h4>'});
      }
      currentTime++
    }, 1000)
  });
