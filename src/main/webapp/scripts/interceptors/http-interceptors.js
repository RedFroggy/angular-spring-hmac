/**
 * Http interceptor to add proper headers to the request.
 * Created by Michael DESIGAUD on 15/02/2016.
 */
hmacApp.factory('httpSecurityInterceptor', ['$q','$rootScope',function ($q,$rootScope) {
        return {
            /**
             * Request interceptor
             * @param request http request original
             * @returns {*} http request modified
             */
            request: function (request) {
                return request;
            },
            responseError:function(rejection){
                $rootScope.$broadcast('event:unauthorized');
                return $q.reject(rejection);
            }
        };
    }]
);