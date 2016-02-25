/**
 * Login controller
 * Created by Michael DESIGAUD on 14/02/2016.
 */
hmacApp.controller('LoginController',function($rootScope,$scope,LoginFactory,$location){

    $rootScope.$on('event:unauthorized',function(rejection,data){
        $scope.httpError = data.message;
    });

    $scope.authenticate = function(){
        LoginFactory.authenticate($scope.username,$scope.password).then(function(){
            $location.path('/users');
        },function(response){
            if(response.status === 403 && response.data) {
                if (response.data.exception && response.data.exception.indexOf('BadCredentialsException') !== -1) {
                    $scope.httpError = 'Username and/or password are invalid !';
                }
            }
        });
    }
});