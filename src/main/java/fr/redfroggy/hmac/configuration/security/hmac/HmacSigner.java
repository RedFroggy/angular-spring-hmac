package fr.redfroggy.hmac.configuration.security.hmac;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.apache.commons.codec.binary.Base64;
import org.joda.time.DateTime;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.Map;
import java.util.UUID;

/**
 * Hmac signer
 * Created by Michael DESIGAUD on 15/02/2016.
 */
public class HmacSigner {

    public static final String ENCODING_CLAIM_PROPERTY = "l-lev";

    /**
     * Get a signed JWT
     * The issuer (user id) and the custom properties are stored in the JWT
     * to be retrieve later
     * @param iss issuer (user identifier)
     * @param claims Custom properties to store in the JWT
     * @return HmacToken instance
     * @throws HmacException
     */
    public static HmacToken getSignedToken(String iss, Map<String,String> claims) throws HmacException{

        //Generate a random token
        String token = generateToken();

        //Generate a random secret
        String secret = generateSecret();

        //Generate a signed JWT
        String jsonWebToken = generateJWT(secret,token, iss, claims);

        return new HmacToken(token,secret, jsonWebToken);
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
     * @throws HmacException
     * @return a random secret
     */
    private static String generateSecret() throws HmacException {
        try {
            return Base64.encodeBase64String(generateToken().getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new HmacException("Cannot encode base64",e);
        }
    }

    /**
     * Generate a new signed JWT
     * @param secret hmac secret
     * @param token hmac token
     * @param iss issuer
     * @param claims List of custom claims
     * @return Signed JWT
     */
    private static String generateJWT(String secret, String token,String iss, Map<String,String> claims) throws HmacException{
        try {
            return signJWT(secret,token,180,iss,claims);
        } catch (JOSEException e) {
            e.printStackTrace();
            throw new HmacException("Cannot generate JWT",e);
        }
    }

    /**
     * Sign a Json Web Token
     * @param secret Random secret in base 64
     * @param token random token
     * @param ttl time to live (in seconds)
     * @param iss issuer
     * @param claims List of custom claims
     * @return A signed json web token
     * @throws JOSEException
     */
    public static String signJWT(String secret, String token, Integer ttl,String iss, Map<String,String> claims) throws JOSEException {
        JWSSigner jwsSigner = new MACSigner(secret.getBytes());

        //Create a new claim
        JWTClaimsSet.Builder builder = new JWTClaimsSet.Builder();
        builder
                .jwtID(token)
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
     * To retrieve a jwt claim property from a json web token
     *
     * @param jwt      json web token
     * @param claimKey claim key of the property to retrieve
     * @return property value
     * @throws HmacException
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
     * @throws HmacException
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
     * @throws HmacException
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
