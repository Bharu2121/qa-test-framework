@API
Feature: Student registration API

  @Regression @Smoke
  Scenario: A valid unique registration is accepted
    Given live registration is explicitly enabled
    And I generate a unique registration payload
    When I submit the registration through the API
    Then the registration response has status 201 and matches the documented success schema
    And the response includes a generated student identifier
    But the lead is not submitted a second time

  @Contract @Regression
  Scenario Outline: Valid optional and boundary values pass request validation
    Given I generate a registration payload for contract case "<case>"
    When I validate the request against the local contract
    Then the local request schema accepts the payload
    And the selected example exercises a valid boundary or optional field
    But validation does not send a request to the live API

    Examples:
      | case                 |
      | minimumLengths       |
      | maximumLengths       |
      | whatsappOmitted      |
      | whatsappNull         |
      | whatsappEmpty        |
      | omitOptionalCountry  |
      | validAgeTrue         |
      | validAgeFalse        |
      | genderMale           |
      | genderFemale         |
      | genderPreferNotToSay |
      | mobileStarts6        |
      | mobileStarts7        |
      | mobileStarts8        |
      | mobileStarts9        |

  @Validation @Regression
  Scenario Outline: Missing required registration fields are rejected
    Given I generate a registration payload for contract case "<case>"
    When I validate the request against the local contract
    Then the local request schema reports an error for the contract case
    And the schema error points to the invalid field
    But the invalid example remains offline

    Examples:
      | case                     |
      | missingCity              |
      | missingDateOfBirth       |
      | missingEmail             |
      | missingFirstName         |
      | missingGender            |
      | missingLastName          |
      | missingMobile            |
      | missingPreferredCountry  |
      | missingQualification     |
      | missingState             |

  @Validation @Regression
  Scenario Outline: Explicit null values are rejected for required fields
    Given I generate a registration payload for contract case "<case>"
    When I validate the request against the local contract
    Then the local request schema reports an error for the contract case
    And the schema error points to the invalid field
    But validation does not send a request to the live API

    Examples:
      | case                 |
      | nullCity             |
      | nullDateOfBirth      |
      | nullEmail            |
      | nullFirstName        |
      | nullGender           |
      | nullLastName         |
      | nullMobile           |
      | nullPreferredCountry |
      | nullQualification    |
      | nullState            |

  @Validation @Regression
  Scenario Outline: Invalid name values are rejected
    Given I generate a registration payload for contract case "<case>"
    When I validate the request against the local contract
    Then the local request schema reports an error for the contract case
    And the schema error points to the invalid field
    But validation does not send a request to the live API

    Examples:
      | case                 |
      | firstNameEmpty       |
      | firstNameOneChar     |
      | firstNameTooLong     |
      | firstNamePunctuation |
      | lastNameEmpty        |
      | lastNameOneChar      |
      | lastNameTooLong      |
      | lastNamePunctuation  |

  @Validation @Regression
  Scenario Outline: Invalid date, gender, and email values are rejected
    Given I generate a registration payload for contract case "<case>"
    When I validate the request against the local contract
    Then the local request schema reports an error for the contract case
    And the schema error points to the invalid field
    But validation does not send a request to the live API

    Examples:
      | case              |
      | dateUsFormat      |
      | dateNotDate       |
      | dateEmpty         |
      | genderWrongCase   |
      | genderUnsupported |
      | genderEmpty       |
      | emailTooLong      |
      | emailNumber       |

  @Validation @Regression
  Scenario Outline: Invalid mobile number formats are rejected
    Given I generate a registration payload for contract case "<case>"
    When I validate the request against the local contract
    Then the local request schema reports an error for the contract case
    And the schema error points to the invalid field
    But validation does not send a request to the live API

    Examples:
      | case                |
      | mobileNineDigits    |
      | mobileElevenDigits  |
      | mobileInvalidPrefix |
      | mobileLetters       |
      | mobileEmpty         |
      | mobileNumber        |
      | mobileSpaces        |

  @Validation @Regression
  Scenario Outline: Invalid optional WhatsApp values are rejected
    Given I generate a registration payload for contract case "<case>"
    When I validate the request against the local contract
    Then the local request schema reports an error for the contract case
    And the schema error points to the invalid field
    But validation does not send a request to the live API

    Examples:
      | case                 |
      | whatsappNineDigits   |
      | whatsappElevenDigits |
      | whatsappLetters      |
      | whatsappNumber       |

  @Validation @Regression
  Scenario Outline: Invalid address and qualification boundaries are rejected
    Given I generate a registration payload for contract case "<case>"
    When I validate the request against the local contract
    Then the local request schema reports an error for the contract case
    And the schema error points to the invalid field
    But validation does not send a request to the live API

    Examples:
      | case                    |
      | cityOneChar             |
      | cityTooLong             |
      | cityNumber              |
      | stateTooLong            |
      | stateNumber             |
      | stateBoolean            |
      | countryTooLong          |
      | countryNumber           |
      | preferredCountryTooLong |
      | preferredCountryNumber  |
      | qualificationTooLong    |
      | qualificationNumber     |

  @Validation @Regression
  Scenario: Optional age flag must be boolean when supplied
    Given I generate a registration payload for contract case "validAgeString"
    When I validate the request against the local contract
    Then the local request schema reports an error for the contract case
    And the schema error points to the invalid field
    But validation does not send a request to the live API