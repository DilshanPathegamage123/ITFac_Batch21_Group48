Feature: Admin User – Dashboard - API

  Background:
    Given Admin user is authenticated via API

  Scenario: TC_ADMIN_DASH_04 - Verify Get Plants summary API for Admin
    Given Admin authentication token is valid and plants exist in the system
    When Admin sends a GET request to retrieve plants summary
    Then the response status should be 200
    And the response should contain plants data in JSON format with relevant summary information
    And the response body structure should be valid and parseable

  Scenario: TC_ADMIN_DASH_05 - Verify Dashboard API with invalid Admin token
    Given Admin token is invalid or expired
    When Admin sends a GET request to Dashboard API with invalid token
    Then the response status should be 401
    And the response should contain authentication error message

  Scenario: TC_ADMIN_DASH_06 - Verify Dashboard API without authentication token
    When Admin sends a GET request to Dashboard API endpoint without authentication header
    Then the response status should be 401
    And the response should indicate authentication is required