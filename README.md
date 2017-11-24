# Spring and Angular security with HMAC and Cookie based JWT [![Build Status](https://travis-ci.org/RedFroggy/angular-spring-hmac.svg?branch=master)](https://travis-ci.org/RedFroggy/angular-spring-hmac)

# Stack
- Spring Boot 1.5.4
- Spring 4.3.9
- Spring Security 4.2.3
- Angular 5.0.0

# Features
- Use of cookies to store JWT and xsrf token
- Token based authentication (JWT)
- HMAC implementation
- HMAC Filter used by Spring Security
- HMAC implementation in Angular 5

# Users
- All users are stored in an H2 in memory database
- Default data are loaded using liquibase
- Both tables Profile and Authority are used to retrieve a user authority hierarchy


# Credentials
- admin/frog => role ADMIN
- manager/frog => role MANAGER
- user/frog => role USER

# To run Java unit tests
````bash
$ mvn test
````

# To run the application
````bash
$ mvn spring-boot:run
````
- Npm modules should be automatically installed and typescript files compiled (see pom.xml file)
- Then go to http://localhost:8080
