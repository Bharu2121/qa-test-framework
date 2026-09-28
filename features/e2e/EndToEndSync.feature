@API @E2E @Regression
Feature: Registration appears in admin leads

  Scenario: A public registration can be cross-checked in the admin API
    Given live registration is explicitly enabled
    And I generate a unique registration payload
    And I log into the admin API with configured credentials
    When I submit the registration through the API
    Then the registration response has status 201 and matches the documented success schema
    When I search admin leads for the submitted email
    Then exactly one lead matches all submitted fields
      | public field    | admin field     |
      | firstName       | firstName       |
      | lastName        | lastName        |
      | dateOfBirth     | dateOfBirth     |
      | gender          | gender          |
      | email           | email           |
      | mobile          | mobile          |
      | whatsapp        | whatsapp        |
      | city            | city            |
      | state           | state           |
      | country         | country         |
      | preferredCountry| preferredCountry|
      | qualification   | qualification   |
    When I fetch the matching lead detail
    Then the lead detail response has status 200 and matches the documented schema