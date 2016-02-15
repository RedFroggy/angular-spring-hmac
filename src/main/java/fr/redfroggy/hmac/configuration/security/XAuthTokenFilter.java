package fr.redfroggy.hmac.configuration.security;

import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.mock.MockUsers;
import fr.redfroggy.hmac.service.AuthenticationService;
import fr.redfroggy.hmac.utils.HmacSigner;
import fr.redfroggy.hmac.utils.SecurityUtils;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.Charsets;
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
 * Auth token filter
 * Created by Michael DESIGAUD on 14/02/2016.
 */
public class XAuthTokenFilter extends GenericFilterBean{

    private AuthenticationService authenticationService;

    public XAuthTokenFilter(AuthenticationService authenticationService){
       this.authenticationService = authenticationService;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        if (!request.getRequestURI().contains("/api") || request.getRequestURI().contains("/api/authenticate")){
            filterChain.doFilter(request, response);
        } else {
            //Get Authentication header
            String jwtHeader = request.getHeader(SecurityUtils.AUTHENTICATION);

            if (jwtHeader == null || jwtHeader.isEmpty()) {
                throw new SecurityException("The JWT is missing from the '"+SecurityUtils.AUTHENTICATION+"' header");
            }

            String digestClient = request.getHeader(SecurityUtils.X_DIGEST);

            if (digestClient == null || digestClient.isEmpty()) {
                throw new SecurityException("The digest is missing from the '"+SecurityUtils.X_DIGEST+"' header");
            }

            //Get X-Once header
            String xOnceHeader = request.getHeader(SecurityUtils.X_ONCE);

            if (xOnceHeader == null || xOnceHeader.isEmpty()) {
                throw new SecurityException("The date is missing from the '"+SecurityUtils.X_ONCE+"' header");
            }

            String url = request.getRequestURL().toString();
            if (request.getQueryString() != null) {
                url += "?" + URLDecoder.decode(request.getQueryString(), Charsets.UTF_8.displayName());
            }

            try {
                String encoding = HmacSigner.getJwtClaim(jwtHeader, HmacSigner.ENCODING_CLAIM_PROPERTY);
                String userId = HmacSigner.getJwtIss(jwtHeader);

                //Retrieve user in cache
                UserDTO userDTO = MockUsers.findById(Integer.valueOf(userId));

                if(userDTO != null && userDTO.getSecretKey() != null && !userDTO.getSecretKey().isEmpty()){
                    String message = request.getMethod().concat(url.concat(xOnceHeader));

                    String digestServer = HmacSigner.encodeMac(new String(Base64.decodeBase64(userDTO.getSecretKey())), message, encoding);
                    System.out.println("HMAC url digest: "+url);
                    System.out.println("HMAC Digest server: "+digestServer);
                    System.out.println("HMAC Message server: "+message);
                    System.out.println("HMAC Secret server: "+userDTO.getSecretKey());

                    if(digestClient.equals(digestServer)){
                        System.out.println("Request is valid, digest are matching");
                        this.authenticationService.tokenAuthentication(userDTO.getLogin());
                        filterChain.doFilter(request, response);
                    } else {
                        System.out.println("Server message: "+message);
                        throw new Exception("Digest are not matching! Client: "+digestClient+" / Server: "+digestServer);
                    }
                }

            } catch (Exception e) {
                System.out.println("Error while generating hmac token");
                e.printStackTrace();
                response.setStatus(403);
                response.getWriter().write(e.getMessage());
            }
        }

    }
}
