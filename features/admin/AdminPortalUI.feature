@UI @AdminUI
Feature: Administrator portal

  @Smoke @Positive
  Scenario: An authorized administrator can sign in and view the dashboard
    Given I open the administrator portal login page
    When I sign in with the configured administrator account
    Then I reach an authenticated admin dashboard
    And dashboard content is visible
    But the scenario performs no lead management mutations