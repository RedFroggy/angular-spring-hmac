#HMAC Implementation using Spring and Angular [![Build Status](https://travis-ci.org/RedFroggy/angular-spring-hmac.svg?branch=master)](https://travis-ci.org/RedFroggy/angular-spring-hmac)

#Stack
- Spring Boot 1.5.4
- Spring 4.3.9
- Spring Security 4.2.3
- Angular 4.1.2

#Features
- Token based authentication
- Json Web Token  
- HMAC implementation
- HMAC Filter used by Spring Security
- HMAC implementation in Angular 4

#Credentials
admin/frog => role ADMIN
manager/frog => role MANAGER
user/frog => role USER

#To run Java unit tests
````bash
$ mvn test
````

#To run the application
````bash
$ mvn spring-boot:run
````
- Npm modules should be automatically installed and typescript files compiled (see pom.xml file)
- Then go to http://localhost:8080
