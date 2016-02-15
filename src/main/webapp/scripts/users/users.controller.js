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