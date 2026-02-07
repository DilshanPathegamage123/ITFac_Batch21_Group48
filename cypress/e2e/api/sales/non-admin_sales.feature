Feature: Non-Admin User – Sales – API

  Background:
    Given Non-admin user is authenticated via API

  Scenario: TC_USER_SALES_06 - Verify User can retrieve sales list
    When User retrieves all sales
    Then the response status should be 200
    And the response should contain a sales array

  Scenario: TC_USER_SALES_07 - Verify User cannot create a sale
    When User tries to create a sale for plant ID 1 with quantity 1
    Then the response status should be 403

  Scenario: TC_USER_SALES_08 - Verify User cannot delete a sale
    Given a sale exists
    When User tries to delete the sale
    Then the response status should be 403

  Scenario: TC_USER_SALES_09 - Verify unauthorized access without authentication
    Given User is not authenticated
    When Non-authenticator retrieves all sales
    Then the response status should be 401

  Scenario: TC_USER_SALES_10 - Verify Sales API with malformed user token
    Given User has a invalid authentication token
    When User sends a GET request to Sales API with malformed token
    Then the response status should be 401
