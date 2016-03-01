#HMAC Implementation using Spring and AngularJS [![Build Status](https://travis-ci.org/RedFroggy/angular-spring-hmac.svg?branch=master)](https://travis-ci.org/RedFroggy/angular-spring-hmac)

#Stack
- Spring Boot
- Spring Security
- Spring MVC
- AngularJS v2

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


#Installation
- Install tsd globally
````bash
$ npm -g install tsd
````

- Install typescript globally
````bash
$ npm -g install typescript
````

- Go to src/main/webapp folder
- Install npm dependencies
````bash
$ npm install
````

#To run Java unit tests
````bash
$ mvn test
````

#To run the application
````bash
$ mvn spring-boot:run
````
Then go to http://localhost:8080
