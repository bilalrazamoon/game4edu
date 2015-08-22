'use strict';

/**
 * @ngdoc function
 * @name TestIonicGenerator.controller:games:chooseMissingSign
 * @description
 * # chooseMissingSign
 */

angular.module('TestIonicGenerator')
  .controller('chooseMissingSignCtrl', function ($scope, $ionicLoading, $timeout, $interval) {
    var operators = ['+', '-', '*', '/'];
    $scope.score = 0;

    //progress
    var totalTime = 50, currentTime = 0;
    $scope.progress = function () {
      return (currentTime * 100) / totalTime + '%';
    };

    function generate() {
      var i = Math.floor(Math.random() * 4);
      var obj = {
        val1: Math.floor(Math.random() * 100),
        val2: Math.floor(Math.random() * 100)
      };
      obj.ans = eval('' + obj.val1 + operators[i] + obj.val2 || isNaN(obj.ans));
      if (String(obj.ans).indexOf('.') != -1) return arguments.callee();
      return obj
    }

    $scope.current = generate();
    $scope.submit = function (v) {
      var c = $scope.current;
      if (eval('' + c.val1 + v + c.val2) == c.ans) {
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
          $ionicLoading.hide();
          $scope.score--;
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
