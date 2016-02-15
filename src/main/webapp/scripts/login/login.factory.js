/**
 * Login factory
 * Created by Michael DESIGAUD on 14/02/2016.
 */
hmacApp.factory('LoginFactory',function($http, $cookieStore,$rootScope){
    return {
        authenticate: function(login,password){
            return $http.post('http://localhost:8080/api/authenticate',{login:login,password:password}).success(function(user, status, headers){
                $cookieStore.put('hmacApp-account', JSON.stringify(user));

                //Retrieve headers
                var headerList = headers();

                var security = {};
                //Secret key header
                security["secretKey"] = headerList["x-secret"];
                //Token header
                security["token"] = headerList["x-tokenaccess"];
                //Security level
                security["securityLevel"] = headerList["www-authenticate"];

                $cookieStore.put('hmacApp-security', JSON.stringify(security));

                $rootScope.authenticated = true;
                return user;
            });
        },
        isAuthenticated:function(){
            return !!$cookieStore.get('hmacApp-account') && !!$cookieStore.get('hmacApp-security');
        },
        isAuthorized:function(roles){
            if(!!$cookieStore.get('hmacApp-account')){
                var account = JSON.parse($cookieStore.get('hmacApp-account'));
                return account && account.authorities && account.authorities.indexOf(roles[0]) !== -1;
            }
            return false;
        },
        logout: function(){
            return $http.get('http://localhost:8080/api/logout').success(function(){
                $cookieStore.remove('hmacApp-account');
                $cookieStore.remove('hmacApp-security');
                return true;
            });
        }
    }
});