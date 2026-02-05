Feature: Admin User – Categories - API

  Background:
    Given Admin is authenticated via API

  Scenario: TC_ADMIN_CAT_06 - Verify Admin can retrieve all categories
    Given at least one category exists in the system
    When Admin sends a GET request to retrieve all categories
    Then the response status should be 200
    And the response should contain a list of categories
    And each category should have id, name, parent, and subCategories

  @oneTime
  Scenario: TC_ADMIN_CAT_07 - Verify Admin receives empty array when no categories exist
    When Admin sends a GET request to retrieve all categories
    Then the response status should be 200
    And the response should be an empty array

  Scenario: TC_ADMIN_CAT_08 - Verify Admin can search by category or sub category name
    Given there is at least one matching category
    When Admin sends a GET request to retrieve categories with name "Flower"
    Then the response status should be 200
    And the response should contain matching categories
    And each category should have id, name, and parentName

  Scenario: TC_ADMIN_CAT_09 - Verify Admin receives empty array when no matching categories exist
    When Admin sends a GET request to retrieve categories with name "NoSubCategory123"
    Then the response status should be 200
    And the response should be an empty array
