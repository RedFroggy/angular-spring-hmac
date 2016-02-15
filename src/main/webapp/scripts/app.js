/**
 * Angular entry point
 * Created by Michael DESIGAUD on 14/02/2016.
 */
var hmacApp = angular.module('hmacApp',['ngRoute','ngCookies','ngResource','ab-base64']);

hmacApp.config(['$routeProvider','$httpProvider',function($routeProvider, $httpProvider){
    $routeProvider
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/users'
        });

    $httpProvider.interceptors.push('httpSecurityInterceptor');
}]);

hmacApp.run(function($rootScope,LoginFactory,$location){

    $rootScope.authenticated = false;

    $rootScope.isAuthorized = LoginFactory.isAuthorized;

    $rootScope.$on('$routeChangeStart', function () {
        if (!LoginFactory.isAuthenticated()) {
            $location.path('/login');
            $rootScope.authenticated = false;
        } else {
            $rootScope.authenticated = true;
        }
    });
});