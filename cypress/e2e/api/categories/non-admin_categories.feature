Feature: Non-Admin User – Categories - API

  Background:
    Given Non-admin user is authenticated via API

  Scenario: TC_USER_CAT_06 - Verify non-admin user can retrieve all categories
    Given at least one category exists in the system
    When user sends a GET request to retrieve all categories
    Then the response status should be 200
    And the response should contain a list of categories
    And each category should have id, name, parent, and subCategories

  @oneTime
  Scenario: TC_USER_CAT_07 - Verify non-admin user receives empty array when no categories exist
    When user sends a GET request to retrieve all categories
    Then the response status should be 200
    And the response should be an empty array

  Scenario: TC_USER_CAT_08 - Verify non-admin user can retrieve paginated category list
    Given at least one category exists in the system
    When user sends a GET request to retrieve paginated categories
    Then the response status should be 200
    And the response should contain a paginated list of categories
    And each paginated category should have id, name, and parentName

  Scenario: TC_USER_CAT_09 - Verify non-admin user can search paginated categories by name
    Given there is at least one matching category
    When user sends a GET request to retrieve paginated categories with name "Flower"
    Then the response status should be 200
    And the response should contain a paginated list of categories
    And each paginated category should have id, name, and parentName
    And all paginated categories' names should include "Flower"

  Scenario: TC_USER_CAT_10 - Verify non-admin users cannot delete a category
    Given an existing category is available for non-admin delete test
    When user sends DELETE request to delete the category
    Then the response status should be 403
    And the response body should contain "Forbidden"
