package fr.redfroggy.hmac;

import fr.redfroggy.hmac.mock.MockUsers;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Application test
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@SpringBootApplication
public class ApplicationTest {

    public static void main(String[] args) {
        MockUsers.mock();
        SpringApplication.run(Application.class, args);
    }
}
