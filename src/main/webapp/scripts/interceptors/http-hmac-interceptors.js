/**
 * Hmac factory
 * Created by Michael DESIGAUD on 16/02/2016.
 */
hmacApp.provider('hmacInterceptor',function () {

    this.config = {
        securityToken:'hmacApp-security',
        rejectedApis:[]
    };

    this.$get = ['$log','$cookieStore',function($log){
        var self = this;
        return {
            request:function(request) {
                var canEncode = self.config.rejectedApis && angular.isArray(self.config.rejectedApis) && self.config.rejectedApis.length > 0;
                angular.forEach(self.config.rejectedApis,function(apiPattern) {
                    if (apiPattern.mustMatch && request.url.indexOf(apiPattern.pattern) === -1) {
                        canEncode = false;
                    }
                    if (!apiPattern.mustMatch && request.url.indexOf(apiPattern.pattern) !== -1) {
                        canEncode = false;
                    }
                });

                //Process hmac encode
                if (canEncode) {
                    var security = JSON.parse(localStorage.getItem(self.config.securityToken));

                    //Get secret from session storage
                    var secret = security.publicSecret;

                    //Create an ISO format date
                    var date = new Date().toISOString();

                    var url = request.url;

                    var message = '';
                    if (request.method === 'PUT' || request.method === 'POST' || request.method === 'PATCH') {
                        message = request.method + JSON.stringify(request.data) + url + date;
                    } else {
                        message = request.method + url + date;
                    }

                    var encodingLevel = security.securityLevel;

                    //Encrypt message with secret key and a given hash algorithm, set the result (digest) in the "X-Digest" http header
                    if (encodingLevel === "HmacSHA256") {
                        request.headers["X-Digest"] = CryptoJS.HmacSHA256(message, secret);
                    }
                    else if (encodingLevel[0] === "HmacSHA1") {
                        request.headers["X-Digest"] = CryptoJS.HmacSHA1(message, secret);
                    }
                    else if (encodingLevel[0] === "HmacMD5") {
                        request.headers["X-Digest"] = CryptoJS.HmacMD5(message, secret);
                    }

                    request.headers["x-hmac-csrf"] = localStorage.getItem('x-hmac-csrf');

                    //Set header "X-Once" with current date
                    request.headers["X-Once"] = date;

                    $log.debug("HMAC url digest: " + url);
                    $log.debug("HMAC Digest client: " + request.headers["X-Digest"]);
                    $log.debug("HMAC Message client: " + message);
                    $log.debug("HMAC Secret client: " + secret);

                    return request;
                }
                return request;
            },
            readHmacRequest:function(headers){

                //Retrieve headers
                var headerList = headers();

                var security = {};

                //Secret key header
                security["publicSecret"] = headerList["x-secret"];

                //Security level
                security["securityLevel"] = headerList["www-authenticate"];

                localStorage.setItem('x-hmac-csrf', headerList['x-hmac-csrf']);
                localStorage.setItem(self.config.securityToken, JSON.stringify(security));
            },
            isSecured:function(){
                return !!localStorage.getItem(self.config.securityToken);
            },
            removeSecurity:function(){
                localStorage.removeItem(self.config.securityToken);
            }
       };
    }];
});