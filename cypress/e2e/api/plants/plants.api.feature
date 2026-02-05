Feature: Plant Management API

  # -------------------- Admin API Tests --------------------
  Scenario: TC_ADMIN_PLANT_06 Verify Admin can retrieve plant list
    Given Admin has a valid API token
    When Admin sends GET request to Plant List API
    Then Response should contain plant list


  Scenario: TC_ADMIN_PLANT_07 Verify pagination support in plant list API
    Given Admin has a valid API token
    When Admin sends GET request with pagination
    Then Response status should be 200
    And Response should contain paginated plant data

  Scenario: TC_ADMIN_PLANT_08 Verify search plants by name API for Admin
    Given Admin has a valid API token
    When Admin searches plants by name "Plant 0" via API
    Then Response should contain matching plant records

  Scenario: TC_ADMIN_PLANT_09 Verify filter plants by category API for Admin
    Given Admin has a valid API token
    When Admin filters plants by category ID 3 via API
    Then Response should contain plants of selected category

  Scenario: TC_ADMIN_PLANT_10 Verify sorting support in plant list API for Admin
    Given Admin has a valid API token
    When Admin sorts plants by "name" via API
    Then Plants should be sorted by name ascending

  # -------------------- User API Tests --------------------
  Scenario: TC_USER_PLANT_06 Verify User can retrieve plant list
    Given User has a valid API token
    When User sends GET request to Plant List API
    Then User receives plant list

  Scenario: TC_USER_PLANT_07 Verify User is not allowed to add plant via API
    Given User has a valid API token
    When User tries to add a plant via API
    Then API should return 403 Forbidden

  Scenario: TC_USER_PLANT_08 Verify plant search API for User
    Given User has a valid API token
    When User searches plants by name "Plant A" via API
    Then API returns matching plants

  Scenario: TC_USER_PLANT_09 Verify filter plants by category API for User
    Given User has a valid API token
    When User filters plants by category ID 3 via API
    Then API returns filtered plant list

  Scenario: TC_USER_PLANT_10 Verify empty response when no plants match search criteria
    Given User has a valid API token
    When User searches plants with invalid name "INVALID_PLANT_123" via API
    Then API returns empty plant list
