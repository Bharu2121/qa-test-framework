@UI @RegistrationUI
Feature: Student registration form

  Background:
    Given I open the public registration form

  @Smoke @Positive @Sanity
  Scenario: The registration application starts on the personal-information step
    When the registration page finishes loading
    Then I see the personal-information inputs and Continue action
    And later wizard steps are not yet available
    But no registration is submitted

  @Negative @UI
  Scenario: Empty personal information does not advance the wizard
    When I continue without entering personal information
    Then the form remains on the personal-information step
    And the academic qualification step is still hidden
    But no registration request is sent

  @Positive @UI
  Scenario: Valid personal information advances to academic details
    Given I enter valid synthetic personal information
    When I continue to academic details
    Then the qualification selector is visible
    And the applicant summary shows the synthetic name
    But no registration request is sent

  @Edge @UI
  Scenario: Personal information is preserved when navigating back from academics
    Given I enter valid synthetic personal information
    And I continue to academic details
    When I return to personal information
    Then the previously entered email and mobile are retained
    And the user can continue editing the application
    But no registration request is sent

  @Positive @UI
  Scenario: Academic details advance to destination preferences
    Given I complete personal information and academic details
    When I continue to destination preferences
    Then the preferred-country selector is visible
    And the final submit action is available
    But the final submit action is not clicked

  @Negative @UI
  Scenario: A destination is required before final submission
    Given I complete personal information and academic details
    And I continue to destination preferences
    When I try to submit without choosing a destination
    Then the form stays on destination preferences
    And a destination validation message is shown
    But no registration request is sent

  @Edge @UI
  Scenario: Choosing a destination removes the destination validation message
    Given I complete personal information and academic details
    And I continue to destination preferences
    When I select Canada as the preferred destination
    Then the destination validation message is not shown
    And the submit action is available for the user
    But the application is not submitted by this scenario

  @E2E @Positive
  Scenario: A user completes the full wizard and reviews the ready-to-submit application
    Given I enter valid synthetic personal information
    When I continue to academic details
    And I choose a qualification and continue to destination preferences
    Then the preferred-country selector is visible
    When I select Canada as the preferred destination
    Then the submit action is available for the user
    And the applicant summary remains visible
    But the application is not submitted by this scenario