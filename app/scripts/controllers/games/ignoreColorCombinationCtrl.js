'use strict';

/**
 * @ngdoc function
 * @name TestIonicGenerator.controller:ignoreColorCombinationCtrl
 * @description
 * # ignoreColorCombinationCtrl
 */

angular.module('TestIonicGenerator')
  .controller('ignoreColorCombinationCtrl', function ($scope, $ionicLoading, $timeout, $interval, $ionicPopup, $state, $sounds) {
    var name="Ignore Color Combination";
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
        return generate(a, b);
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
          $sounds.correct();
          $scope.current = generate();
        }, 500);
      }
      else {
        $ionicLoading.show({template: '<h4>Incorrect!</h4>'});
        $timeout(function () {
          $scope.score--;
          $sounds.wrong();
          $ionicLoading.hide()
        }, 500);
      }
    };

    var gameOver = null;
    var closePopup= function () {
      gameOver.close();
      gameOver=null;
    };
    var playGame = function () {
      currentTime=0;
      $scope.score=0;
      angular.element(document.querySelector('.progress')).addClass('animation');
      var interval = $interval(function () {
        if (currentTime >= totalTime) {
          $interval.cancel(interval);
          gameOver = $ionicPopup.show({
            template: '<h4>Game is Over!</h4>',
            title: name,
            scope: $scope,
            buttons: [
              {
                text: 'Play Again',
                type: 'button-assertive',
                onTap: function (e) {
                  angular.element(document.querySelector('.progress')).removeClass('animation');
                  closePopup();
                  $timeout(playGame)
                }
              },
              {
                text: 'Back',
                type: 'button-assertive',
                onTap: function (e) {
                  closePopup();
                  $state.go('app.home')
                }
              }
            ]
          });
        }
        currentTime++
      }, 1000);
    };
    playGame();
  });
