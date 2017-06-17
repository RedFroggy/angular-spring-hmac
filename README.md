#HMAC Implementation using Spring and Angular [![Build Status](https://travis-ci.org/RedFroggy/angular-spring-hmac.svg?branch=master)](https://travis-ci.org/RedFroggy/angular-spring-hmac)

#Stack
- Spring Boot
- Spring Security
- Spring MVC
- Angular 2.2.0

#Features
- Token based authentication
- Json Web Token  
- HMAC implementation
- HMAC Filter used by Spring Security
- HMAC Factory for AngularJS
- Security utility class

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
