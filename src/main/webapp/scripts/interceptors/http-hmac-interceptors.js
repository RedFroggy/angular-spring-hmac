/**
 * Hmac factory
 * Created by Michael DESIGAUD on 16/02/2016.
 */
hmacApp.provider('hmacInterceptor',function () {

    this.config = {
        securityToken:'hmacApp-security',
        rejectedApis:[]
    };

    this.$get = ['$log','base64','$cookieStore',function($log,base64,$cookieStore){
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
                    var security = JSON.parse($cookieStore.get(self.config.securityToken));

                    //Get secret from session storage and decode from base64
                    var secret = base64.decode(security.secretKey);

                    //Create an ISO format date
                    var date = new Date().toISOString();

                    var url = request.url;

                    var message = request.method + url + date;

                    var encodingLevel = security.securityLevel;

                    //Set header "Authentication" with token
                    request.headers["Authentication"] = security.token;

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
            response:function(response){
                if(response.headers){
                    var headers =  response.headers();
                    console.log(headers);
                    var security = $cookieStore.get(self.config.securityToken);
                    if(security){
                        security["token"] = headers["x-tokenaccess"];
                    }
                }
                return response;
            },
            readHmacRequest:function(headers){
                //Retrieve headers
                var headerList = headers();

                var security = {};
                //Secret key header
                security["secretKey"] = headerList["x-secret"];
                //Token header
                security["token"] = headerList["x-tokenaccess"];
                //Security level
                security["securityLevel"] = headerList["www-authenticate"];

                $cookieStore.put(self.config.securityToken, JSON.stringify(security));
            },
            isSecured:function(){
                return !!$cookieStore.get(self.config.securityToken);
            },
            removeSecurity:function(){
                $cookieStore.remove(self.config.securityToken);
            }
       };
    }];
});