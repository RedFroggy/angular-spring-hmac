package fr.redfroggy.hmac.utils;

import fr.redfroggy.hmac.configuration.security.hmac.HmacException;
import fr.redfroggy.hmac.configuration.security.SecurityUtils;
import fr.redfroggy.hmac.configuration.security.hmac.HmacToken;
import fr.redfroggy.hmac.configuration.security.hmac.HmacUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.HashMap;
import java.util.Map;

/**
 * Hmac signer test
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@RunWith(JUnit4.class)
public class SecurityUtilsTest {

    @Test
    public void getSignedToken() throws HmacException {
        HmacToken hmacToken = SecurityUtils.getSignedToken(SecurityUtils.generateSecret(),"1",20,null);
        Assert.assertNotNull(hmacToken);
        Assert.assertNotNull(hmacToken.getJwt());
        Assert.assertNotNull(hmacToken.getSecret());
        Assert.assertNotNull(hmacToken.getJwtID());
    }

    @Test
    public void getJwtClaim() throws HmacException {
        Map<String,String> claims = new HashMap<String, String>(){
            {
                put(SecurityUtils.ENCODING_CLAIM_PROPERTY,"claimValue");
                put("otherProperty","otherClaimValue");
            }
        };
        HmacToken hmacToken = SecurityUtils.getSignedToken(SecurityUtils.generateSecret(),"1",20,claims);
        Assert.assertNotNull(hmacToken);
        Assert.assertNotNull(hmacToken.getJwt());
        Assert.assertNotNull(hmacToken.getSecret());
        Assert.assertNotNull(hmacToken.getJwtID());

        String claimEncoding = SecurityUtils.getJwtClaim(hmacToken.getJwt(), SecurityUtils.ENCODING_CLAIM_PROPERTY);
        Assert.assertEquals(claimEncoding,claims.get(SecurityUtils.ENCODING_CLAIM_PROPERTY));

        String otherClaim = SecurityUtils.getJwtClaim(hmacToken.getJwt(),"otherProperty");
        Assert.assertEquals(otherClaim,claims.get("otherProperty"));

    }

    @Test
    public void getJwtIss() throws HmacException{
        String userId = "1";
        HmacToken hmacToken = SecurityUtils.getSignedToken(SecurityUtils.generateSecret(),userId,20,null);
        Assert.assertNotNull(hmacToken);
        Assert.assertNotNull(hmacToken.getJwt());
        Assert.assertNotNull(hmacToken.getSecret());
        Assert.assertNotNull(hmacToken.getJwtID());

        String iss = SecurityUtils.getJwtIss(hmacToken.getJwt());
        Assert.assertNotNull(iss);
        Assert.assertEquals(userId,iss);
    }

    @Test
    public void encodeMac() throws HmacException{
        HmacToken hmacToken = SecurityUtils.getSignedToken(SecurityUtils.generateSecret(),"1",20,null);
        Assert.assertNotNull(hmacToken);

        String message = "cutomMessage";
        String encodedHmac = SecurityUtils.encodeMac(hmacToken.getSecret(),message, HmacUtils.HMAC_SHA_256);
        Assert.assertNotNull(encodedHmac);
    }

    @Test(expected = HmacException.class)
    public void encodeMacWithWrongAlgorithm() throws HmacException{
        HmacToken hmacToken = SecurityUtils.getSignedToken(SecurityUtils.generateSecret(),"1",20,null);
        Assert.assertNotNull(hmacToken);

        String message = "customMessage";
        String encodedHmac = SecurityUtils.encodeMac(hmacToken.getSecret(),message,"wrongAlgorithm");
        Assert.assertNotNull(encodedHmac);
    }
}
