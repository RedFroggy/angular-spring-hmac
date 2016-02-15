/**
 * Is authorized directive
 * Created by Michael DESIGAUD on 15/02/2016.
 */
hmacApp.directive('isAuthorized', ['$rootScope',function ($rootScope) {
    return {
        link: function (scope,elem,attrs) {
            if(!_.isEmpty(attrs.isAuthorized)) {
                if (!_.isArray(attrs.isAuthorized)) {
                    attrs.isAuthorized = [attrs.isAuthorized];
                }
                if (!$rootScope.isAuthorized(attrs.isAuthorized)) {
                    $(elem).remove();
                }
            }
        }
    };
}]);