package fr.redfroggy.hmac.configuration.security;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import com.nimbusds.jwt.SignedJWT;
import fr.redfroggy.hmac.configuration.security.hmac.HmacException;
import fr.redfroggy.hmac.configuration.security.hmac.HmacToken;
import org.apache.commons.codec.binary.Base64;
import org.joda.time.DateTime;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.Map;
import java.util.UUID;

/**
 * Security utility class
 * Created by Michael DESIGAUD on 15/02/2016.
 */
public class SecurityUtils {

    public static final String ENCODING_CLAIM_PROPERTY = "l-lev";

    /**
     * Get a signed JWT
     * The issuer (user id) and the custom properties are stored in the JWT
     * to be retrieve later
     * @param iss issuer (user identifier)
     * @param ttl time to live (in seconds
     * @param claims Custom properties to store in the JWT
     * @return HmacToken instance
     * @throws HmacException hmac exception
     */
    public static HmacToken getSignedToken(String secret, String iss, Integer ttl, Map<String,String> claims) throws HmacException{

        //Generate a random token
        String jwtID = generateToken();

        //Generate a signed JWT
        String jsonWebToken = generateJWT(secret,jwtID, iss, ttl, claims);

        return new HmacToken(jwtID,secret, jsonWebToken);
    }

    /**
     * Generate a random token (based on uuid)
     * @return a random token
     */
    private static String generateToken(){
        return UUID.randomUUID().toString();
    }

    /**
     * Generate a random secret (base on uuid) and encoded in base 64
     * @throws HmacException hmac exception
     * @return a random secret
     */
    public static String generateSecret() throws HmacException {
        try {
            return Base64.encodeBase64String(generateToken().getBytes("UTF-8")).replace("\n","").replace("\r","");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new HmacException("Cannot encode base64",e);
        }
    }

    /**
     * Generate a new signed JWT
     * @param secret hmac secret
     * @param jwtID hmac jwtID
     * @param iss issuer
     * @param ttl time to live (in seconds
     * @param claims List of custom claims
     * @return Signed JWT
     */
    private static String generateJWT(String secret, String jwtID,String iss, Integer ttl,Map<String,String> claims) throws HmacException{
        try {
            return signJWT(secret,jwtID,ttl,iss,claims);
        } catch (JOSEException e) {
            e.printStackTrace();
            throw new HmacException("Cannot generate JWT",e);
        }
    }

    /**
     * Sign a Json Web Token
     * @param secret Random secret in base 64
     * @param jwtID random jwtID
     * @param ttl time to live (in minutes)
     * @param iss issuer
     * @param claims List of custom claims
     * @return A signed json web token
     * @throws JOSEException exception
     */
    private static String signJWT(String secret, String jwtID, Integer ttl,String iss, Map<String,String> claims) throws JOSEException {
        JWSSigner jwsSigner = new MACSigner(secret.getBytes());

        //Create a new claim
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder
                .jwtID(jwtID)
                .expirationTime(DateTime.now().plusMinutes(ttl).toDate())
                .issuer(iss);

        if(claims != null && !claims.isEmpty()) {
            for(Map.Entry<String,String> entry : claims.entrySet()){
                builder.claim(entry.getKey(), entry.getValue());
            }
        }

        JWTClaimsSet claimsSet = builder.build();

        //Sign the jwt
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(jwsSigner);

        //return a string jwt
        return signedJWT.serialize();
    }

    /**
     * Check JWT is expired
     * @param jwtString JWT string representation
     * @return true if expired, false otherwise
     * @throws ParseException parse exception
     */
    public static Boolean isJwtExpired(String jwtString) throws ParseException {
        JWT jwt = JWTParser.parse(jwtString);
        if(jwt.getJWTClaimsSet() != null && jwt.getJWTClaimsSet().getExpirationTime() != null) {
            DateTime expirationDate = new DateTime(jwt.getJWTClaimsSet().getExpirationTime());
            return expirationDate.isBefore(DateTime.now());
        }
        return false;
    }

    /**
     * Verify Json Web Token
     * @param jwt jwt
     * @param secret shared secret
     * @return true if the JWT is valid, false otherwise
     * @throws HmacException hmac exception
     */
    public static Boolean verifyJWT(final String jwt, final String secret) throws HmacException {
        try {
            SignedJWT signedJWT = SignedJWT.parse(jwt);
            JWSVerifier jwsVerifier = new MACVerifier(secret);
            return signedJWT.verify(jwsVerifier);
        } catch (ParseException | JOSEException ex) {
            throw new HmacException("Cannot verify JWT", ex);
        }
    }

    /**
     * To retrieve a jwt claim property from a json web token
     *
     * @param jwt      json web token
     * @param claimKey claim key of the property to retrieve
     * @return property value
     * @throws HmacException hmac exception
     */
    public static String getJwtClaim(final String jwt, final String claimKey) throws HmacException {
        try {
            //Parse jwt string
            SignedJWT signedJWT = SignedJWT.parse(jwt);

            Object customClaim = signedJWT.getJWTClaimsSet().getClaim(claimKey);
            return customClaim != null ? String.valueOf(customClaim) : null;
        } catch (ParseException ex) {
            throw new HmacException("The claim property: " + claimKey + " is missing", ex);
        }
    }

    /**
     * To retrieve the "Issuer" (iss) property from a json web token
     *
     * @param jwt json web token
     * @return iss property from claim
     * @throws HmacException hmac exception
     */
    public static String getJwtIss(final String jwt) throws HmacException {
        try {
            //Parse jwt string
            SignedJWT signedJWT = SignedJWT.parse(jwt);
            //Return the claim property value
            return String.valueOf(signedJWT.getJWTClaimsSet().getIssuer());
        } catch (ParseException ex) {
            throw new HmacException("The iss property is missing", ex);
        }
    }

    /**
     * Encodes a message with HMAC and a given algorithm
     *
     * @param secret    secret used to sign the message
     * @param message   message to sign
     * @param algorithm algorithm ued to sign
     * @return an HMAC encoded string
     * @throws HmacException hmac exception
     */
    public static String encodeMac(final String secret, final String message, final String algorithm) throws HmacException {
        String digest;
        try {
            SecretKeySpec key = new SecretKeySpec(secret.getBytes("UTF-8"), algorithm);
            Mac mac = Mac.getInstance(algorithm);
            mac.init(key);

            byte[] bytes = mac.doFinal(message.getBytes("UTF-8"));

            StringBuilder hash = new StringBuilder();
            for (byte b : bytes) {
                String hex = Integer.toHexString(0xFF & b);
                if (hex.length() == 1) {
                    hash.append('0');
                }
                hash.append(hex);
            }
            digest = hash.toString();
        } catch (Exception ex) {
            throw new HmacException("Error while encoding request with hmac", ex);
        }
        return digest;
    }
}
