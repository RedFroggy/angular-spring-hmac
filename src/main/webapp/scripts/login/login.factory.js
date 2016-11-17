/**
 * Login factory
 * Created by Michael DESIGAUD on 14/02/2016.
 */
hmacApp.factory('LoginFactory',function($http, $rootScope,hmacInterceptor){
    return {
        authenticate: function(login,password){
            return $http.post('http://localhost:8080/api/authenticate',{login:login,password:password}).success(function(user, status, headers){
                localStorage.setItem('hmacApp-account', JSON.stringify(user));

                hmacInterceptor.readHmacRequest(headers);

                $rootScope.authenticated = true;
                return user;
            });
        },
        isAuthenticated:function(){
            return !!localStorage.getItem('hmacApp-account') && hmacInterceptor.isSecured();
        },
        isAuthorized:function(roles){
            if(!!localStorage.getItem('hmacApp-account')){
                var account = JSON.parse(localStorage.getItem('hmacApp-account'));
                var authorized = false;
                angular.forEach(roles,function(role){
                    if(account && account.authorities && account.authorities.indexOf(role) !== -1){
                        authorized = true;
                    }
                });
                return authorized;
            }
            return false;
        },
        getAccount:function(){
            if(!!localStorage.getItem('hmacApp-account')){
                return JSON.parse(localStorage.getItem('hmacApp-account'));
            }
        },
        removeAccount:function(){
            localStorage.removeItem('hmacApp-account');
            localStorage.removeItem('x-hmac-csrf');
            hmacInterceptor.removeSecurity();
            $rootScope.authenticated = false;
        },
        logout: function(){
            var self = this;
            return $http.get('http://localhost:8080/api/logout').success(function(){
                self.removeAccount();
                return true;
            });
        }
    }
});