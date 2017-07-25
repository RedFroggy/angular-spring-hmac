package fr.redfroggy.hmac.configuration.security;

import fr.redfroggy.hmac.configuration.security.hmac.HmacSecurityConfigurer;
import fr.redfroggy.hmac.service.AuthenticationService;
import fr.redfroggy.hmac.service.HmacUserDetailsService;
import fr.redfroggy.hmac.service.SecurityService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * Security configuration
 * Created by Michael DESIGAUD on 14/02/2016.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

    private SecurityService securityService;
    private HmacUserDetailsService userDetailsService;

    public SecurityConfiguration(SecurityService securityService, HmacUserDetailsService userDetailsService){
        this.securityService = securityService;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/scripts/**/*.{js}")
                .antMatchers("/node_modules/**")
                .antMatchers("/assets/**")
                .antMatchers("*.{ico}")
                .antMatchers("/views/**/*.{html}")
                .antMatchers("/app/**/*.{html}");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/api/logout").permitAll()
                .antMatchers("/api/authenticate").permitAll()
                .antMatchers("/api/**").authenticated()
            .and()
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .logout()
                .logoutUrl("/api/logout")
                .logoutSuccessHandler(new AjaxLogoutSuccessHandler())
                .deleteCookies(AuthenticationService.ACCESS_TOKEN_COOKIE)
                .permitAll()
            .and()
                .apply(authTokenConfigurer())
            .and()
                .apply(hmacSecurityConfigurer());
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    private HmacSecurityConfigurer hmacSecurityConfigurer(){
        return new HmacSecurityConfigurer(securityService);
    }

    private XAuthTokenConfigurer authTokenConfigurer(){
        return new XAuthTokenConfigurer(securityService);
    }
}
