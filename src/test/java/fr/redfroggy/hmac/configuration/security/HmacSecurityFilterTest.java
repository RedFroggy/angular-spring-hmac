package fr.redfroggy.hmac.configuration.security;

import fr.redfroggy.hmac.configuration.security.hmac.*;
import org.apache.commons.codec.binary.Base64;
import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;

/**
 * Hmac security filter test
 * Created by Michael DESIGAUD on 16/02/2016.
 */
@RunWith(MockitoJUnitRunner.class)
public class HmacSecurityFilterTest {

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @Mock
    private HmacRequester hmacRequester;

    @InjectMocks
    private HmacSecurityFilter hmacSecurityFilter;

    private HmacToken hmacToken;

    private String isoDate;

    private String url = "http://localhost/api/users";

    @Before
    public void setUp() throws HmacException {
        hmacSecurityFilter = new HmacSecurityFilter(hmacRequester);
        String secret = HmacSigner.generateSecret();
        hmacToken = HmacSigner.getSignedToken(secret,String.valueOf("1"),20,new HashMap<String, String>(){{put(HmacSigner.ENCODING_CLAIM_PROPERTY, HmacUtils.HMAC_SHA_256);}});
        isoDate = DateTime.now().toDateTimeISO().toString();
    }

    /**
     * do filter unit tests
     */
    @Test
    public void doFilterNoHmac() throws IOException, ServletException {

        Mockito.when(hmacRequester.canVerify(request)).thenReturn(false);

        hmacSecurityFilter.doFilter(request,response,filterChain);

        Mockito.verify(filterChain,Mockito.times(1)).doFilter(request,response);
    }

    /**
     * do filter unit tests
     */
    @Test
    public void doFilterHmac() throws IOException, ServletException, HmacException {

        Mockito.when(hmacRequester.canVerify(request)).thenReturn(true);
        Mockito.when(hmacRequester.getSecret("1")).thenReturn(hmacToken.getSecret());


        Mockito.when(request.getHeader(HmacUtils.AUTHENTICATION)).thenReturn(hmacToken.getJwt());
        Mockito.when(request.getHeader(HmacUtils.X_DIGEST)).thenReturn(getDigest());
        Mockito.when(request.getHeader(HmacUtils.X_ONCE)).thenReturn(isoDate);
        Mockito.when(request.getRequestURL()).thenReturn(new StringBuffer(url));
        Mockito.when(request.getQueryString()).thenReturn(null);
        Mockito.when(request.getMethod()).thenReturn("GET");

        hmacSecurityFilter.doFilter(request,response,filterChain);

        Mockito.verify(filterChain,Mockito.times(1)).doFilter(request,response);
    }

    /**
     * Hmac filter with wrong JWT
     */
    @Test
    public void doFilterHmacWrongJwt() throws IOException, ServletException, HmacException {

        PrintWriter printWriter = Mockito.mock(PrintWriter.class);
        Mockito.when(hmacRequester.canVerify(request)).thenReturn(true);
        Mockito.when(request.getHeader(HmacUtils.AUTHENTICATION)).thenReturn(null);
        Mockito.when(response.getWriter()).thenReturn(printWriter);

        hmacSecurityFilter.doFilter(request,response,filterChain);
        Mockito.verify(filterChain,Mockito.never()).doFilter(request,response);
    }

    /**
     * Hmac filter with wrong digest
     */
    @Test
    public void doFilterHmacWrongDigest() throws IOException, ServletException, HmacException {

        PrintWriter printWriter = Mockito.mock(PrintWriter.class);
        Mockito.when(hmacRequester.canVerify(request)).thenReturn(true);
        Mockito.when(request.getHeader(HmacUtils.AUTHENTICATION)).thenReturn(hmacToken.getJwt());
        Mockito.when(request.getHeader(HmacUtils.X_DIGEST)).thenReturn(null);
        Mockito.when(response.getWriter()).thenReturn(printWriter);

        hmacSecurityFilter.doFilter(request,response,filterChain);
        Mockito.verify(filterChain,Mockito.never()).doFilter(request,response);
    }

    @Test
    public void doFilterHmacWrongXOnce() throws IOException, ServletException, HmacException {

        PrintWriter printWriter = Mockito.mock(PrintWriter.class);
        Mockito.when(hmacRequester.canVerify(request)).thenReturn(true);
        Mockito.when(request.getHeader(HmacUtils.AUTHENTICATION)).thenReturn(hmacToken.getJwt());
        Mockito.when(request.getHeader(HmacUtils.X_DIGEST)).thenReturn(getDigest());
        Mockito.when(request.getHeader(HmacUtils.X_ONCE)).thenReturn(null);
        Mockito.when(response.getWriter()).thenReturn(printWriter);

        hmacSecurityFilter.doFilter(request,response,filterChain);
        Mockito.verify(filterChain,Mockito.never()).doFilter(request,response);
    }

    @Test
    public void doFilterHmacDifferentDigest() throws IOException, ServletException, HmacException {

        PrintWriter printWriter = Mockito.mock(PrintWriter.class);
        Mockito.when(hmacRequester.canVerify(request)).thenReturn(true);
        Mockito.when(hmacRequester.getSecret("1")).thenReturn(new String(Base64.encodeBase64(hmacToken.getSecret().getBytes())));


        Mockito.when(request.getHeader(HmacUtils.AUTHENTICATION)).thenReturn(hmacToken.getJwt());
        Mockito.when(request.getHeader(HmacUtils.X_DIGEST)).thenReturn(getDigest());
        Mockito.when(request.getHeader(HmacUtils.X_ONCE)).thenReturn(DateTime.now().toDateTimeISO().toString());
        Mockito.when(request.getRequestURL()).thenReturn(new StringBuffer(url));
        Mockito.when(request.getQueryString()).thenReturn(null);
        Mockito.when(request.getMethod()).thenReturn("GET");
        Mockito.when(response.getWriter()).thenReturn(printWriter);

        hmacSecurityFilter.doFilter(request,response,filterChain);

        Mockito.verify(filterChain,Mockito.never()).doFilter(request,response);
    }

    private String getDigest() throws HmacException {
        String message = "GET"+url+isoDate;
        return HmacSigner.encodeMac(hmacToken.getSecret(), message, HmacUtils.HMAC_SHA_256);
    }

}
