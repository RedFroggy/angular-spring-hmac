/**
 * Users controller
 * Created by Michael DESIGAUD on 15/02/2016.
 */
hmacApp.controller('UsersController',function($scope,$http){

    $scope.getUsers = function(){
        $http.get('http://localhost:8080/api/users').success(function(users){
            $scope.users = users;
        });
    };

    $scope.getUsers();
});

hmacApp.controller('UserController',function($scope,$http,$routeParams,$location,LoginFactory){

    if($routeParams && $routeParams.id) {

        $http.get('http://localhost:8080/api/users/profiles').success(function (profiles) {
            $scope.profiles = profiles;
        });

        $http.get('http://localhost:8080/api/users/'+$routeParams.id).success(function (user) {
            $scope.user = user;
        });
    }

    $scope.saveUser = function(){
        $http.put('http://localhost:8080/api/users/'+$routeParams.id,$scope.user).success(function(user){
            var account = LoginFactory.getAccount();
            if(account && account.login === user.login){
                LoginFactory.logout();
            } else {
                $location.path('/users');
            }
        });
    };

    $scope.cancel = function(){
        $location.path('/users');
    };
});