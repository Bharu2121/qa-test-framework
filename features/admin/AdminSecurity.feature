@API
Feature: Administrator security and authentication controls

  @Security @Auth @Regression
  Scenario: A valid admin login returns a bearer JWT and a failed login never exposes the password
    Given I use a mock admin security API
    When I log in with a valid admin credential pair
    Then the security login response has status 200 with a bearer token
    And the failure response for invalid credentials is 401 without exposing the password

  @Security @Auth @Regression
  Scenario: Mocked profile handler rejects missing, malformed, expired, and tampered JWT fixtures
    Given I use a mock admin security API
    When I request the protected profile without a bearer token
    Then the profile request without a token is rejected with 401
    And a malformed JWT is rejected
    And an expired JWT is rejected
    And a tampered JWT is rejected

  @Security @Password @Regression
  Scenario: Mocked password reset rejects an invalid key and mismatched confirmation
    Given I use a mock admin security API
    When I request a password recovery token for a registered admin email
    Then the recovery request succeeds and a token is issued
    And an invalid recovery key is rejected
    And a mismatched password confirmation is rejected
    And a valid reset request succeeds and does not expose the secret value

  @Security @Logout @Regression
  Scenario: Logout invalidates the active session and blocks follow-up protected access
    Given I use a mock admin security API
    When I log in with a valid admin credential pair
    And I call logout for the active session
    Then the logout response is successful
    And the token is invalidated for subsequent protected requests

  @Security @Auth @Regression
  Scenario: Repeated invalid logins do not reveal whether the account exists
    Given I use a mock admin security API
    When I attempt the wrong password three times for the same account
    Then each failed login is rejected with 401
    And the application response does not reveal whether the username exists

  @Security @ReadOnlyProbe @ProductionSafeProbe @Regression
  Scenario Outline: Protected endpoints reject requests without credentials
    Given read-only security probes are explicitly enabled
    When I send an unauthenticated GET request to protected endpoint "<endpoint>"
    Then the protected request is rejected without exposing data

    Examples:
      | endpoint                       |
      | /api/v1/auth/profile           |
      | /api/v1/admin/students         |
      | /api/v1/admin/dashboard/stats  |

  @Security @ReadOnlyProbe @ProductionSafeProbe @Regression
  Scenario Outline: Protected endpoints reject malformed or tampered bearer tokens
    Given read-only security probes are explicitly enabled
    When I send a GET request to protected endpoint "<endpoint>" with bearer token "<token>"
    Then the protected request is rejected without exposing data

    Examples:
      | endpoint                       | token         |
      | /api/v1/auth/profile           | not-a-jwt     |
      | /api/v1/admin/students         | abc.def.ghi   |
      | /api/v1/admin/dashboard/stats  | tampered.jwt.signature |

  @Security @ReadOnlyProbe @ProductionSafeProbe @Regression
  Scenario: An authorized administrator can read only their own profile and aggregate dashboard statistics
    Given read-only security probes are explicitly enabled
    And I authenticate the read-only security probe as an authorized administrator
    When I request my profile with the read-only security probe
    Then the profile belongs to the configured administrator and exposes no credentials
    When I request dashboard statistics with the read-only security probe
    Then the dashboard response contains non-negative aggregate counters

  @Security @ProductionSafeProbe @Regression
  Scenario: Login rejects one synthetic unknown account without echoing secrets or internals
    Given read-only security probes are explicitly enabled
    When I submit one invalid login with synthetic non-existent credentials
    Then the login attempt is rejected without echoing credentials or internal errors

  @Security @ProductionSafeProbe @Regression
  Scenario: Protected API error responses do not contain conflicting XSS policy headers
    Given read-only security probes are explicitly enabled
    When I inspect protected profile response headers using HEAD
    Then duplicate XSS protection headers do not conflict

  @Security @ReadOnlyProbe @Regression
  Scenario Outline: Invalid lead identifiers fail without server errors or diagnostic leakage
    Given read-only security probes are explicitly enabled
    And I authenticate the read-only security probe as an authorized administrator
    When I request admin lead detail for identifier "<id>"
    Then the invalid identifier is rejected without internal error details

    Examples:
      | id                         |
      | 0                          |
      | -1                         |
      | not-a-number               |
      | 999999999999999999999999   |
