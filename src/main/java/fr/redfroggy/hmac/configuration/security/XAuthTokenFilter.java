package fr.redfroggy.hmac.configuration.security;

import fr.redfroggy.hmac.configuration.security.hmac.HmacException;
import fr.redfroggy.hmac.service.SecurityService;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;

/**
 * Auth token filter
 * Created by Michael DESIGAUD on 14/02/2016.
 */
public class XAuthTokenFilter extends GenericFilterBean{

    private SecurityService securityService;

    XAuthTokenFilter(SecurityService securityService){
       this.securityService = securityService;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        if (!request.getRequestURI().contains("/api") || request.getRequestURI().contains("/api/authenticate")){
            filterChain.doFilter(request, response);
        } else {

            try {
                this.securityService.verifyJwt(request);

                filterChain.doFilter(request,response);
            } catch (HmacException | ParseException e) {
                e.printStackTrace();
                response.setStatus(403);
            }
        }

    }
}
