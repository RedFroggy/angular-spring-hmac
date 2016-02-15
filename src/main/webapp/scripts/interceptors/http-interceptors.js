/**
 * Http interceptor to add proper headers to the request.
 * Created by Michael DESIGAUD on 15/02/2016.
 */
hmacApp.factory('httpSecurityInterceptor', ['$log','base64','$cookieStore',function ($log,base64,$cookieStore) {
        return {
            /**
             * Request interceptor
             * @param request http request original
             * @returns {*} http request modified
             */
            request: function (request) {

                //Public urls are ignored
                if (request.url.indexOf('/api') !== -1
                    && request.url.indexOf("/api/authenticate") === -1) {

                    console.log(request.url);

                    var security = JSON.parse($cookieStore.get('hmacApp-security'));

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
            }
        };
    }]
);