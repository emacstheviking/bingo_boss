'use strict';
var App = angular.module('bingo', ['ngResource', 'ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        'templateUrl': "/static/partials/home.html"
    });
}]);
