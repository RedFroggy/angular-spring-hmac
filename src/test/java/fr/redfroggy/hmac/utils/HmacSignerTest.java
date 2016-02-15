package fr.redfroggy.hmac.utils;

import fr.redfroggy.hmac.utils.HmacSigner;
import fr.redfroggy.hmac.utils.HmacToken;
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
public class HmacSignerTest {

    @Test
    public void getSignedToken() throws Exception{
        HmacToken hmacToken = HmacSigner.getSignedToken("1",null);
        Assert.assertNotNull(hmacToken);
        Assert.assertNotNull(hmacToken.getJwt());
        Assert.assertNotNull(hmacToken.getSecret());
        Assert.assertNotNull(hmacToken.getToken());
    }

    @Test
    public void getJwtClaim() throws Exception {
        Map<String,String> claims = new HashMap<String, String>(){
            {
                put(HmacSigner.ENCODING_CLAIM_PROPERTY,"claimValue");
                put("otherProperty","otherClaimValue");
            }
        };
        HmacToken hmacToken = HmacSigner.getSignedToken("1",claims);
        Assert.assertNotNull(hmacToken);
        Assert.assertNotNull(hmacToken.getJwt());
        Assert.assertNotNull(hmacToken.getSecret());
        Assert.assertNotNull(hmacToken.getToken());

        String claimEncoding = HmacSigner.getJwtClaim(hmacToken.getJwt(),HmacSigner.ENCODING_CLAIM_PROPERTY);
        Assert.assertEquals(claimEncoding,claims.get(HmacSigner.ENCODING_CLAIM_PROPERTY));

        String otherClaim = HmacSigner.getJwtClaim(hmacToken.getJwt(),"otherProperty");
        Assert.assertEquals(otherClaim,claims.get("otherProperty"));

    }

    @Test
    public void getJwtIss() throws Exception{
        String userId = "1";
        HmacToken hmacToken = HmacSigner.getSignedToken(userId,null);
        Assert.assertNotNull(hmacToken);
        Assert.assertNotNull(hmacToken.getJwt());
        Assert.assertNotNull(hmacToken.getSecret());
        Assert.assertNotNull(hmacToken.getToken());

        String iss = HmacSigner.getJwtIss(hmacToken.getJwt());
        Assert.assertNotNull(iss);
        Assert.assertEquals(userId,iss);
    }

    @Test
    public void encodeMac() throws Exception{
        HmacToken hmacToken = HmacSigner.getSignedToken("1",null);
        Assert.assertNotNull(hmacToken);

        String message = "cutomMessage";
        String encodedHmac = HmacSigner.encodeMac(hmacToken.getSecret(),message,SecurityUtils.HMAC_SHA_256);
        Assert.assertNotNull(encodedHmac);
    }

    @Test(expected = Exception.class)
    public void encodeMacWithWrongAlgorithm() throws Exception{
        HmacToken hmacToken = HmacSigner.getSignedToken("1",null);
        Assert.assertNotNull(hmacToken);

        String message = "customMessage";
        String encodedHmac = HmacSigner.encodeMac(hmacToken.getSecret(),message,"wrongAlgorithm");
        Assert.assertNotNull(encodedHmac);
    }
}
