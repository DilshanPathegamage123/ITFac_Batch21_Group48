Feature: non-Admin User – Dashboard - API

  Background:
    Given Non-admin user is authenticated via API

  Scenario: TC_USER_DASH_03 - Verify Get Sales summary API for User
    Given User authentication token is valid and sales records exist in the system
    When User sends a GET request to retrieve sales summary
    Then the response status should be 200
    And the response should contain sales data in JSON format with relevant summary information
    And the response body structure should be valid and parseable

  Scenario: TC_USER_DASH_04 - Verify Dashboard API with malformed User token
    Given User has a malformed authentication token
    When User sends a GET request to Sales summary API with malformed token
    Then the response status should be 401 or 400
    And the response should contain error message about invalid token format