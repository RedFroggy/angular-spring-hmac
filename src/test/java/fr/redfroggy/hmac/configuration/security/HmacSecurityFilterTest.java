package fr.redfroggy.hmac.configuration.security;

import fr.redfroggy.hmac.configuration.security.hmac.*;
import fr.redfroggy.hmac.service.AuthenticationService;
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
import javax.servlet.ServletInputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Arrays;
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

    @Mock
    private ServletInputStream inputStream;

    @InjectMocks
    private HmacSecurityFilter hmacSecurityFilter;

    private HmacToken hmacToken;

    private String isoDate;

    private String url = "http://localhost/api/users";

    @Before
    public void setUp() throws HmacException, IOException {
        hmacSecurityFilter = new HmacSecurityFilter(hmacRequester);
        String secret = HmacSigner.generateSecret();
        hmacToken = HmacSigner.getSignedToken(secret,String.valueOf("1"),20,new HashMap<String, String>(){{put(HmacSigner.ENCODING_CLAIM_PROPERTY, HmacUtils.HMAC_SHA_256);}});
        isoDate = DateTime.now().toDateTimeISO().toString();

        Mockito.when(request.getInputStream()).thenReturn(inputStream);
    }

    /**
     * do filter unit tests
     */
    @Test
    public void doFilterNoHmac() throws IOException, ServletException {

        Mockito.when(hmacRequester.canVerify(request)).thenReturn(false);

        hmacSecurityFilter.doFilter(request,response,filterChain);

        Mockito.verify(filterChain,Mockito.times(1)).doFilter(Mockito.any(WrappedRequest.class), Mockito.any(HttpServletResponse.class));
    }

    /**
     * do filter unit tests
     */
    @Test
    public void doFilterHmac() throws IOException, ServletException, HmacException {

        Mockito.when(hmacRequester.canVerify(request)).thenReturn(true);
        Mockito.when(hmacRequester.getPublicSecret("1")).thenReturn(hmacToken.getSecret());

        Cookie jwtCookie = new Cookie(AuthenticationService.JWT_APP_COOKIE,hmacToken.getJwt());
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(20*60);
        //Cookie cannot be accessed via JavaScript
        jwtCookie.setHttpOnly(true);


        Mockito.when(request.getCookies()).thenReturn((Cookie[]) Arrays.asList(jwtCookie).toArray());
        Mockito.when(request.getHeader(HmacUtils.AUTHENTICATION)).thenReturn(hmacToken.getJwt());
        Mockito.when(request.getHeader(HmacUtils.X_DIGEST)).thenReturn(getDigest());
        Mockito.when(request.getHeader(HmacUtils.X_ONCE)).thenReturn(isoDate);
        Mockito.when(request.getRequestURL()).thenReturn(new StringBuffer(url));
        Mockito.when(request.getQueryString()).thenReturn(null);
        Mockito.when(request.getMethod()).thenReturn("GET");

        hmacSecurityFilter.doFilter(request,response,filterChain);

        Mockito.verify(filterChain,Mockito.times(1)).doFilter(Mockito.any(WrappedRequest.class), Mockito.any(HttpServletResponse.class));
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
        Mockito.when(hmacRequester.getPublicSecret("1")).thenReturn(new String(Base64.encodeBase64(hmacToken.getSecret().getBytes())));
        Mockito.when(hmacRequester.isSecretInBase64()).thenReturn(true);


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
