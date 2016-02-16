package fr.redfroggy.hmac.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.redfroggy.hmac.ApplicationTest;
import fr.redfroggy.hmac.configuration.security.hmac.HmacSigner;
import fr.redfroggy.hmac.configuration.security.hmac.HmacUtils;
import fr.redfroggy.hmac.dto.LoginDTO;
import fr.redfroggy.hmac.dto.Profile;
import fr.redfroggy.hmac.dto.UserDTO;
import org.apache.commons.codec.binary.Base64;
import org.joda.time.DateTime;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;
import java.io.IOException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Authentication integration unit tests
 * Created by Michael DESIGAUD on 16/02/2016.
 */
@Ignore
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ApplicationTest.class)
@WebAppConfiguration
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@ActiveProfiles("test")
public class AuthenticationIntegrationTest {

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
     * @throws Exception
     */
    public MvcResult authenticate(String login, String password,int status) throws Exception {
        //Post parameters
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setLogin(login);
        loginDTO.setPassword(password);

        MvcResult result   = mockMVC.perform(post("/api/authenticate", false)//
                //Content
                .contentType(MediaType.APPLICATION_JSON)//
                .content(toJSON(loginDTO)))//
                //Fin content
                //Assertions
                .andExpect(status().is(status)).andReturn();

        Assert.assertNotNull(result);

        if(result.getResponse().getStatus() == 200) {
            Assert.assertTrue(!result.getResponse().getHeader(HmacUtils.X_SECRET).isEmpty());
            Assert.assertTrue(!result.getResponse().getHeader(HmacUtils.X_TOKEN_ACCESS).isEmpty());
        }

        return result;
    }

    public void logout(MvcResult result,int status) throws Exception{

        String secret = new String(Base64.decodeBase64(result.getResponse().getHeader(HmacUtils.X_SECRET).trim().getBytes()));
        String jwtToken = result.getResponse().getHeader(HmacUtils.X_TOKEN_ACCESS);
        String date = DateTime.now().toDateTimeISO().toString();
        String message = "GEThttp://localhost/api/logout"+date;
        String digest = HmacSigner.encodeMac(secret, message, HmacUtils.HMAC_SHA_256);

        mockMVC.perform(get("/api/logout", false)
                .header(HmacUtils.AUTHENTICATION, jwtToken)
                .header(HmacUtils.X_DIGEST, digest)
                .header(HmacUtils.X_ONCE, date)
                //Content
                .contentType(MediaType.APPLICATION_JSON))//
                //Fin content
                //Assertions
                .andExpect(status().is(status)).andReturn();
    }

    @Test
    public void authenticationAdminSuccess() throws Exception {
        MvcResult result = authenticate("admin","frog",200);
        UserDTO userDTO = fromJSON(result.getResponse().getContentAsString(),UserDTO.class);
        Assert.assertNotNull(userDTO);
        Assert.assertNotNull(userDTO.getLogin());
        Assert.assertNull(userDTO.getPassword());
        Assert.assertNotNull(userDTO.getAuthorities());
        Assert.assertNotNull(userDTO.getProfile());
        Assert.assertEquals(userDTO.getProfile(), Profile.ADMIN);
    }

    @Test
    public void authenticationUserSuccess() throws Exception {
        MvcResult result = authenticate("user","frog",200);
        UserDTO userDTO = fromJSON(result.getResponse().getContentAsString(),UserDTO.class);
        Assert.assertNotNull(userDTO);
        Assert.assertNotNull(userDTO.getLogin());
        Assert.assertNull(userDTO.getPassword());
        Assert.assertNotNull(userDTO.getAuthorities());
        Assert.assertNotNull(userDTO.getProfile());
        Assert.assertEquals(userDTO.getProfile(), Profile.USER);
    }

    @Test
    public void badCredentials() throws Exception {
        authenticate("user","wrongPassword",403);
    }

    @Test
    public void logoutSuccess() throws Exception {
        MvcResult result = authenticate("admin","frog",200);
        logout(result,200);
    }

    private String toJSON(Object obj) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(obj);
    }

    private <T> T fromJSON(String json,Class<T> type) throws IOException {
        return new ObjectMapper().readValue(json,type);
    }

}
