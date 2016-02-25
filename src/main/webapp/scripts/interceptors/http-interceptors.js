/**
 * Http interceptor to add proper headers to the request.
 * Created by Michael DESIGAUD on 15/02/2016.
 */
hmacApp.factory('httpSecurityInterceptor', ['$q','$rootScope',function ($q,$rootScope) {
        return {
            responseError:function(rejection){
                $rootScope.$broadcast('event:unauthorized', {message:rejection.data});
                return $q.reject(rejection);
            }
        };
    }]
);