'use strict';

/**
 * @ngdoc function
 * @name TestIonicGenerator.serive:$sounds
 * @description
 * # ExampleService
 */
angular.module('TestIonicGenerator')
  // use factory for services
  .factory('$sounds', function($http, $timeout, $q) {
    var correct = function () {
      var p = new Audio('assets/sounds/correct.mp3');
      p.play();
    };
    var wrong = function () {
      var p = new Audio('assets/sounds/wrong.mp3');
      p.play();
    };
    // public api
    return {
      correct: correct,
      wrong: wrong
    };

  });
