package fr.redfroggy.hmac.configuration.security;

import fr.redfroggy.hmac.service.SecurityService;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Auth token configurer
 * Created by Michael DESIGAUD on 14/02/2016.
 */
public class XAuthTokenConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private SecurityService securityService;

    XAuthTokenConfigurer(SecurityService securityService){
        this.securityService = securityService;
    }

    @Override
    public void configure(HttpSecurity builder) throws Exception {
        XAuthTokenFilter xAuthTokenFilter = new XAuthTokenFilter(securityService);

        //Trigger this filter before SpringSecurity authentication validator
        builder.addFilterBefore(xAuthTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
