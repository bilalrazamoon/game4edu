'use strict';

/**
 * @ngdoc function
 * @name TestIonicGenerator.controller:games:chooseMissingSign
 * @description
 * # chooseMissingSign
 */

angular.module('TestIonicGenerator')
  .controller('chooseMissingSignCtrl', function ($scope, $ionicLoading, $timeout, $interval, $ionicPopup, $state, $sounds) {
    var name="Choose Missing Sign";
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
      if (String(obj.ans).indexOf('.') != -1) return generate();
      return obj
    }

    $scope.current = generate();
    $scope.submit = function (v) {
      var c = $scope.current;
      if (eval('' + c.val1 + v + c.val2) == c.ans) {
        $ionicLoading.show({template: '<h4>Correct!</h4>'});
        $timeout(function () {
          $ionicLoading.hide();
          $sounds.correct();
          $scope.score++;
          $scope.current = generate();
        }, 500);
      }
      else {
        $ionicLoading.show({template: '<h4>Incorrect!</h4>'});
        $timeout(function () {
          $ionicLoading.hide();
          $sounds.wrong();
          $scope.score--;
        }, 500);
      }
    };
    var gameOver = null;
    var closePopup= function () {
      gameOver.close();
      gameOver=null;
    };
    var playGame = function () {
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
                  currentTime=0;
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
    playGame()
  });
