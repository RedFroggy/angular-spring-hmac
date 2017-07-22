package fr.redfroggy.hmac;

import fr.redfroggy.hmac.configuration.SecurityProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * Main application
 * Created by Michael DESIGAUD on 14/02/2016.
 */
@SpringBootApplication
@EnableConfigurationProperties({SecurityProperties.class, LiquibaseProperties.class})
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
