@API
Feature: Administrator student lead API

  @Smoke @Regression
  Scenario: An authenticated administrator can list leads
    Given I log into the admin API with configured credentials
    When I request the first page of admin leads
    Then the leads response has status 200 and matches the documented schema
    And the first page includes valid pagination metadata

  @Regression @Positive
  Scenario: An administrator can find the previously submitted synthetic lead
    Given I log into the admin API with configured credentials
    When I search admin leads for the known synthetic email
    Then the known synthetic lead is returned exactly once
    And its reference fields match the submitted test data

  @Regression @Positive
  Scenario: An administrator can read a lead detail
    Given I log into the admin API with configured credentials
    When I open the known synthetic lead detail
    Then the lead detail response has status 200 and matches the documented schema
    And the detail belongs to the known synthetic registration

  @Regression @Positive
  Scenario: An administrator can read dashboard statistics
    Given I log into the admin API with configured credentials
    When I request the admin dashboard statistics
    Then the dashboard statistics response matches its documented schema
    And all reported counters are zero or greater

  @Regression @Positive
  Scenario: An administrator can read their own profile
    Given I log into the admin API with configured credentials
    When I request the authenticated admin profile
    Then the profile response matches its documented schema
    And the profile email matches the configured admin email

  @Regression @Sanity
  Scenario: The admin student list rejects unauthenticated requests
    When I request admin leads without credentials
    Then the unauthenticated leads response has status 401