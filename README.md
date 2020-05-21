# Quick start!

$ ./scripts/start.sh

localhost:8082 --- frontend interface




# Microservice template
This is a Node.js microservice template, to be used as a boiler plate for new microservice projects

- Automated tests using MOCHA.
- linted using JS Airbnb guidelines.
- Showcase how to implement a high degree of observability using bunyan as a logger and storied loggings using common sessionId per requests.
- Independent configuration settings dynamically set based on enviroment.
- Uses joi for full api routes validation.
- Custom Error classes.
- Test coverage report with NYC.
- Postman collection that documents API endpoints.

## Todo:
- Add webtoken validation middleware.
- create AWS health check api endpoint.
- Do basic infrastructure as a code using terraform, to deploy as ECS on AWS.
- 100% Code coverage on tests.

# How to run it

The application entry point is:
 > npm start

The enviroment variables need to be set
 > MOCHA_REPORTER=spec

 > CONFIG_ENV=testing

 
To run automated test against the microservice
 >npm test

Which will also pollinate the service with 100 dummy url's.

All url endpoints are documented with examples on
> microserviceTeamplate.postman_collection.json
