package fr.redfroggy.hmac.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.redfroggy.hmac.Application;
import fr.redfroggy.hmac.configuration.security.SecurityUtils;
import fr.redfroggy.hmac.configuration.security.hmac.HmacUtils;
import fr.redfroggy.hmac.dto.LoginDTO;
import fr.redfroggy.hmac.dto.UserDTO;
import fr.redfroggy.hmac.service.AuthenticationService;
import org.joda.time.DateTime;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;
import javax.servlet.http.Cookie;
import java.io.IOException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Authentication integration unit tests
 * Created by Michael DESIGAUD on 16/02/2016.
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@ActiveProfiles("test")
public class AuthenticationIntegrationTest {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationIntegrationTest.class);

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private Filter springSecurityFilterChain;

    //Mock to consume spring mvc rest controllers
    private MockMvc mockMVC;

    @Before
    public void setup() {
        this.mockMVC = MockMvcBuilders
                .webAppContextSetup(this.context)
                .addFilters(springSecurityFilterChain)
                .build();
    }

    /**
     * Authenticate a user with its credentials.
     *
     * @param login    username
     * @param password password
     * @throws Exception exception
     */
    private MvcResult authenticate(String login, String password,int status) throws Exception {
        //Post parameters
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setLogin(login);
        loginDTO.setPassword(password);

        MvcResult result   = mockMVC
                .perform(post("/api/authenticate")
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                //Content
                .contentType(MediaType.APPLICATION_JSON)//
                .content(toJSON(loginDTO)))//
                //Fin content
                //Assertions
                .andReturn();

        Assert.assertNotNull(result);

        if(result.getResponse().getStatus() == 200) {
            Assert.assertTrue(!result.getResponse().getHeader(HmacUtils.X_SECRET).isEmpty());

            Cookie jwtCookie = result.getResponse().getCookie(AuthenticationService.ACCESS_TOKEN_COOKIE);
            Assert.assertNotNull(jwtCookie);
            Assert.assertTrue(!jwtCookie.getValue().isEmpty());
        }

        return result;
    }

    private void logout(MvcResult result) throws Exception{

        String secret = result.getResponse().getHeader(HmacUtils.X_SECRET).trim();

        Cookie jwtCookie = result.getResponse().getCookie(AuthenticationService.ACCESS_TOKEN_COOKIE);

        String date = DateTime.now().toDateTimeISO().toString();
        String message = "GEThttp://localhost/api/logout"+date;
        String digest = SecurityUtils.encodeMac(secret, message, HmacUtils.HMAC_SHA_256);

        logger.debug("HMAC Message client: {}", message);
        logger.debug("HMAC Secret client: {}", secret);
        logger.debug("HMAC Digest client: {}", digest);

        mockMVC.perform(post("/api/logout", false)
                .cookie(jwtCookie)
                .with(SecurityMockMvcRequestPostProcessors.csrf())
                .header(HmacUtils.X_DIGEST, digest)
                .header(HmacUtils.X_ONCE, date)
                //Content
                .contentType(MediaType.APPLICATION_JSON))//
                //Fin content
                //Assertions
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void authenticationAdminSuccess() throws Exception {
        MvcResult result = authenticate("admin","frog",200);
        UserDTO userDTO = fromJSON(result.getResponse().getContentAsString(),UserDTO.class);
        Assert.assertNotNull(userDTO);
        Assert.assertNotNull(userDTO.getLogin());
        Assert.assertNull(userDTO.getPassword());
        Assert.assertNotNull(userDTO.getProfile());
    }

    @Test
    public void authenticationUserSuccess() throws Exception {
        MvcResult result = authenticate("user","frog",200);
        UserDTO userDTO = fromJSON(result.getResponse().getContentAsString(),UserDTO.class);
        Assert.assertNotNull(userDTO);
        Assert.assertNotNull(userDTO.getLogin());
        Assert.assertNull(userDTO.getPassword());
        Assert.assertNotNull(userDTO.getProfile());
    }

    @Test
    public void badCredentials() throws Exception {
        authenticate("user","wrongPassword",403);
    }

    @Test
    public void logoutSuccess() throws Exception {
        MvcResult result = authenticate("admin","frog",200);
        logout(result);
    }

    private String toJSON(Object obj) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(obj);
    }

    private <T> T fromJSON(String json,Class<T> type) throws IOException {
        return new ObjectMapper().readValue(json,type);
    }

}
