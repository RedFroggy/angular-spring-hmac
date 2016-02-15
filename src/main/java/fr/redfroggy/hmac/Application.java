package fr.redfroggy.hmac;

import fr.redfroggy.hmac.mock.MockUsers;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main application
 * Created by Michael DESIGAUD on 14/02/2016.
 */
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        MockUsers.mock();
        SpringApplication.run(Application.class, args);
    }
}
