Feature: Non-Admin User – Categories - API

  Background:
    Given Non-admin user is authenticated via API

  Scenario: TC_USER_CAT_06 - Verify non-admin user can retrieve all categories
    Given at least one category exists in the system
    When user sends a GET request to retrieve all categories
    Then the response status should be 200
    And the response should contain a list of categories
    And each category should have id, name, parent, and subCategories

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

  Scenario: TC_USER_CAT_21 - Verify when non-admin deleting non-existing category returns 403
    Given compute a non-existing category ID
    When user sends DELETE request to delete the category
    Then the response status should be 403

  Scenario: TC_USER_CAT_22 - Verify non-admin user receives empty paginated result for non-matching name
   When user sends a GET request to retrieve paginated categories with name "___NO_MATCH___"
   Then the response status should be 200
   And the paginated response content should be empty


  Scenario: TC_USER_CAT_16 - Verify non-admin user cannot create categories
    When user sends a POST request to create a new category
    Then the response status should be 403
    And the response body should contain "Forbidden"

  Scenario: TC_USER_CAT_17 - Verify non-admin user cannot update existing categories
    Given Category with ID=292 exists
    When user sends a PUT request to update the category with ID=292
    Then the response status should be 403
    And the response body should contain "Forbidden"

  Scenario: TC_USER_CAT_18 - Verify non-admin user can retrieve all sub-categories
    Given at least one sub-category exists in the system
    When user sends a GET request to retrieve all sub-categories
    Then the response should contain only sub-categories
 
  Scenario: TC_USER_CAT_19 - Verify non-admin user can successfully retrieve main categories
    When user sends GET request to retrieve all main categories
    Then the response should contain a list of main categories
