Feature: Regular User – Plants - API

  Background:
    Given Non-admin user is authenticated via API

  Scenario: TC_USER_PLANT_13 - Verify User cannot create plant via API
    Given Non-admin user is authenticated and valid sub-category exists
    When User sends POST request to create plant with valid data
    Then the response status should be 403

  Scenario: TC_USER_PLANT_14 - Verify User cannot update plant via API
    Given User is authenticated and plant exists
    When User sends PUT request to update plant
    Then the response status should be 403
