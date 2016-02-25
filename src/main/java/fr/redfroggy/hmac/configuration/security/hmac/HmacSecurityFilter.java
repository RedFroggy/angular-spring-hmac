package fr.redfroggy.hmac.configuration.security.hmac;

import com.nimbusds.jose.crypto.MACSigner;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.Charsets;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.input.CloseShieldInputStream;
import org.apache.commons.io.input.ClosedInputStream;
import org.springframework.http.HttpMethod;
import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.WebUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Hmac verification filter
 * Created by Michael DESIGAUD on 16/02/2016.
 */
public class HmacSecurityFilter extends GenericFilterBean {

    private HmacRequester hmacRequester;

    public HmacSecurityFilter(HmacRequester hmacRequester) {
        this.hmacRequester = hmacRequester;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        try {
            Assert.notNull(hmacRequester, "hmacRequester must not be null");

            if (!hmacRequester.canVerify(request)) {
                filterChain.doFilter(request, response);
            } else {
                //Get Authentication header
                String jwt = request.getHeader(HmacUtils.AUTHENTICATION);

                if (jwt == null || jwt.isEmpty()) {
                    throw new HmacException("The JWT is missing from the '" + HmacUtils.AUTHENTICATION + "' header");
                }

                String digestClient = request.getHeader(HmacUtils.X_DIGEST);

                if (digestClient == null || digestClient.isEmpty()) {
                    throw new HmacException("The digest is missing from the '" + HmacUtils.X_DIGEST + "' header");
                }

                //Get X-Once header
                String xOnceHeader = request.getHeader(HmacUtils.X_ONCE);

                if (xOnceHeader == null || xOnceHeader.isEmpty()) {
                    throw new HmacException("The date is missing from the '" + HmacUtils.X_ONCE + "' header");
                }

                String url = request.getRequestURL().toString();
                if (request.getQueryString() != null) {
                    url += "?" + URLDecoder.decode(request.getQueryString(), Charsets.UTF_8.displayName());
                }


                String encoding = HmacSigner.getJwtClaim(jwt, HmacSigner.ENCODING_CLAIM_PROPERTY);
                String iss = HmacSigner.getJwtIss(jwt);

                String secret = hmacRequester.getSecret(iss);
                Assert.notNull(secret, "Secret key cannot be null");

                Assert.isTrue(HmacSigner.verifyJWT(jwt,secret),"The Json Web Token is invalid");

                Assert.isTrue(!HmacSigner.isJwtExpired(jwt),"The Json Web Token is expired");

                String message = request.getMethod().concat(url.concat(xOnceHeader));

                if (hmacRequester.isSecretInBase64()) {
                    secret = new String(Base64.decodeBase64(secret));
                }

                String digestServer = HmacSigner.encodeMac(secret, message, encoding);
                System.out.println("HMAC JWT: " + jwt);
                System.out.println("HMAC url digest: " + url);
                System.out.println("HMAC Message server: " + message);
                System.out.println("HMAC Secret server: " + secret);
                System.out.println("HMAC Digest server: " + digestServer);
                System.out.println("HMAC Digest client: " + digestClient);

                if (digestClient.equals(digestServer)) {
                    System.out.println("Request is valid, digest are matching");

                    Map<String,String> customClaims = new HashMap<>();
                    customClaims.put(HmacSigner.ENCODING_CLAIM_PROPERTY, HmacUtils.HMAC_SHA_256);
                    HmacToken hmacToken = HmacSigner.getSignedToken(secret,String.valueOf(iss),customClaims);
                    response.setHeader(HmacUtils.X_TOKEN_ACCESS, hmacToken.getJwt());

                    filterChain.doFilter(request, response);
                } else {
                    System.out.println("Server message: " + message);
                    throw new HmacException("Digest are not matching! Client: " + digestClient + " / Server: " + digestServer);
                }
            }

        }catch(Exception e){
            System.out.println("Error while generating hmac token");
            e.printStackTrace();
            response.setStatus(403);
            response.getWriter().write(e.getMessage());
        }
    }
}
