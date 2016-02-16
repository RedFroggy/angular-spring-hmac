/**
 * Header controller
 * Created by Michael DESIGAUD on 15/02/2016.
 */
hmacApp.controller('HeaderController',function($scope,LoginFactory,$location){

    $scope.logout = function(){
        LoginFactory.logout($scope.username,$scope.password).then(function(){
            $location.path('/login');
        });
    }
});