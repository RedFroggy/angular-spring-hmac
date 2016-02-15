package fr.redfroggy.hmac.utils;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.joda.time.DateTime;

/**
 * Security utility class
 * Created by Michael DESIGAUD on 15/02/2016.
 */
public class SecurityUtils {

    public static final String HMAC_SHA_256 = "HmacSHA256";
    public static final String HMAC_SHA_1 = "HmacSHA1";
    public static final String HMAC_MD5 = "HmacMD5";
    public static final String NONE = "NONE";

    public static final String X_TOKEN_ACCESS = "X-TokenAccess";
    public static final String X_SECRET = "X-Secret";
    public static final String AUTHENTICATION = "Authentication";
    public static final String X_DIGEST = "X-Digest";
    public static final String X_ONCE = "X-Once";


}
