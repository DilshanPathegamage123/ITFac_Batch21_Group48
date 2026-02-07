Feature: Regular User – Plants - API

  Background:
    Given Non-admin user is authenticated via API
  
  Scenario: TC_USER_PLANT_06 Retrieve plant list
    When User requests plant list
    Then response status should be 200

  Scenario: TC_USER_PLANT_07 User cannot add plant
    When User tries to create plant
    Then response status should be 403

  Scenario: TC_USER_PLANT_08 Search by name
    When User searches plant by name {string}
    Then response status should be 200

  Scenario: TC_USER_PLANT_09 Filter plants by category
    When User filters plants by category 3
    Then response status should be 200
    And all plants returned should belong to category 3


  Scenario: TC_USER_PLANT_10 Invalid search
    When User searches plant by name "INVALID_123"
    Then the search response should be empty



  Scenario: TC_USER_PLANT_13 - Verify User cannot create plant via API
    Given Non-admin user is authenticated and valid sub-category exists
    When User sends POST request to create plant with valid data
    Then the response status should be 403
    
  @cleanup
  Scenario: TC_USER_PLANT_14 - Verify User cannot update plant via API
    Given User is authenticated and plant exists
    When User sends PUT request to update plant
    Then the response status should be 403
