/**
 * Login controller
 * Created by Michael DESIGAUD on 14/02/2016.
 */
hmacApp.controller('LoginController',function($scope,LoginFactory,$location){

    $scope.authenticate = function(){
        LoginFactory.authenticate($scope.username,$scope.password).then(function(){
            $location.path('/users');
        },function(response){
            if(response.status === 403){
                $scope.wrongCredentials = true;
            }
        });
    }
});