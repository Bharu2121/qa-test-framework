@API
Feature: Administrator authentication API

  @Smoke @Regression
  Scenario: Configured administrator credentials return a bearer token
    Given I log into the admin API with configured credentials
    Then the admin login response has status 200 and a documented token

  @Contract @Regression @Sanity
  Scenario: The admin auth client handles the captured invalid-credentials response
    Given the admin login API is replaced by a deterministic mock
    When I submit invalid mock admin credentials
    Then the admin login client receives the captured 401 response
    And no authentication token is returned
    But the mocked request contains no bearer authorization header