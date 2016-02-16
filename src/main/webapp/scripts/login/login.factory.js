/**
 * Login factory
 * Created by Michael DESIGAUD on 14/02/2016.
 */
hmacApp.factory('LoginFactory',function($http, $cookieStore,$rootScope,hmacInterceptor){
    return {
        authenticate: function(login,password){
            return $http.post('http://localhost:8080/api/authenticate',{login:login,password:password}).success(function(user, status, headers){
                $cookieStore.put('hmacApp-account', JSON.stringify(user));

                hmacInterceptor.readHmacRequest(headers);

                $rootScope.authenticated = true;
                return user;
            });
        },
        isAuthenticated:function(){
            return !!$cookieStore.get('hmacApp-account') && hmacInterceptor.isSecured();
        },
        isAuthorized:function(roles){
            if(!!$cookieStore.get('hmacApp-account')){
                var account = JSON.parse($cookieStore.get('hmacApp-account'));
                return account && account.authorities && account.authorities.indexOf(roles[0]) !== -1;
            }
            return false;
        },
        removeAccount:function(){
            $cookieStore.remove('hmacApp-account');
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