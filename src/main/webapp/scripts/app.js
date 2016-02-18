/**
 * Angular entry point
 * Created by Michael DESIGAUD on 14/02/2016.
 */
var hmacApp = angular.module('hmacApp',['ngRoute','ngCookies','ngResource','ab-base64']);

hmacApp.config(['$routeProvider','$httpProvider','hmacInterceptorProvider',function($routeProvider, $httpProvider,hmacInterceptorProvider){
    $routeProvider
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersController'
        })
        .when('/users/:id', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/users'
        });

    $httpProvider.interceptors.push('httpSecurityInterceptor');
    $httpProvider.interceptors.push('hmacInterceptor');

    //Hmac security interceptor provider configuration
    hmacInterceptorProvider.config.rejectedApis = [{mustMatch:true,pattern:'/api'}, {mustMatch:false,pattern:'/api/authenticate'}];
}]);

hmacApp.run(function($rootScope,LoginFactory,$location){

    $rootScope.authenticated = false;

    $rootScope.isAuthorized = LoginFactory.isAuthorized;

    $rootScope.$on('event:unauthorized',function(){
        $location.path('/login');
        LoginFactory.removeAccount();
    });

    $rootScope.$on('$routeChangeStart', function () {
        if (!LoginFactory.isAuthenticated()) {
            $location.path('/login');
            $rootScope.authenticated = false;
        } else {
            $rootScope.authenticated = true;
        }
    });
});