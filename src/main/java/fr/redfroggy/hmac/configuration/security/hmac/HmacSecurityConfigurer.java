package fr.redfroggy.hmac.configuration.security.hmac;

import fr.redfroggy.hmac.configuration.security.XAuthTokenFilter;
import fr.redfroggy.hmac.service.SecurityService;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;

/**
 * Hmac Security filter configurer
 * Created by Michael DESIGAUD on 16/02/2016.
 */
public class HmacSecurityConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private SecurityService securityService;

    public HmacSecurityConfigurer(SecurityService securityService){
        this.securityService = securityService;
    }

    @Override
    public void configure(HttpSecurity builder) throws Exception {
        HmacSecurityFilter hmacSecurityFilter = new HmacSecurityFilter(securityService);

        //Trigger this filter before SpringSecurity authentication validator
        builder.addFilterBefore(hmacSecurityFilter, XAuthTokenFilter.class);
    }
}
