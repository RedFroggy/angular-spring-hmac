package fr.redfroggy.hmac.configuration.security.hmac;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.Charsets;
import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;

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
                String jwtHeader = request.getHeader(HmacUtils.AUTHENTICATION);

                if (jwtHeader == null || jwtHeader.isEmpty()) {
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


                String encoding = HmacSigner.getJwtClaim(jwtHeader, HmacSigner.ENCODING_CLAIM_PROPERTY);
                String iss = HmacSigner.getJwtIss(jwtHeader);

                String secret = hmacRequester.getSecret(iss);
                Assert.notNull(secret, "Secret key cannot be null");

                String message = request.getMethod().concat(url.concat(xOnceHeader));

                if (hmacRequester.isSecretInBase64()) {
                    secret = new String(Base64.decodeBase64(secret));
                }

                String digestServer = HmacSigner.encodeMac(secret, message, encoding);
                System.out.println("HMAC url digest: " + url);
                System.out.println("HMAC Message server: " + message);
                System.out.println("HMAC Secret server: " + secret);
                System.out.println("HMAC Digest server: " + digestServer);
                System.out.println("HMAC Digest client: " + digestClient);

                if (digestClient.equals(digestServer)) {
                    System.out.println("Request is valid, digest are matching");
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
