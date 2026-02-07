Feature: Admin User – Categories - API

  Background:
    Given Admin user is authenticated via API

  Scenario: TC_ADMIN_CAT_06 - Verify Admin can retrieve all categories
    Given at least one category exists in the system
    When user sends a GET request to retrieve all categories
    Then the response status should be 200
    And the response should contain a list of categories
    And each category should have id, name, parent, and subCategories

  Scenario: TC_ADMIN_CAT_08 - Verify Admin can search by category or sub category name
    Given there is at least one matching category
    When user sends a GET request to retrieve categories with name "Flower"
    Then the response status should be 200
    And the response should contain matching categories
    And each category should have id, name, and parentName

  Scenario: TC_ADMIN_CAT_09 - Verify Admin receives empty array when no matching categories exist
    When user sends a GET request to retrieve categories with name "NoSubCategory123"
    Then the response status should be 200
    And the response should be an empty array

  Scenario: TC_ADMIN_CAT_10 - Verify Admin can successfully delete an existing category
    And Category which is going to be deleted exists in the system
    When user sends DELETE request to delete the category
    Then the response status should be 204
    And the response body should be empty
    And attempting to retrieve the deleted category should return 404

  Scenario: TC_ADMIN_CAT_21 - Verify when admin deleting non-existing category returns 404
    Given compute a non-existing category ID
    When user sends DELETE request to delete the category
    Then the response status should be 404

  Scenario: TC_ADMIN_CAT_22 - Verify categories are sorted by parentName in ascending order
   Given at least one category exists in the system
   When user sends a GET request to retrieve paginated categories sorted by parentName "asc"
   Then the response status should be 200
   And the paginated categories should be sorted by parentName in ascending order

  Scenario: TC_ADMIN_CAT_23 - Verify categories are sorted by parentName in descending order
   Given at least one category exists in the system
   When user sends a GET request to retrieve paginated categories sorted by parentName "desc"
   Then the response status should be 200
   And the paginated categories should be sorted by parentName in descending order



  Scenario: TC_ADMIN_CAT_16 - Verify Admin can create a new main category successfully
    When user sends a POST request to create a new main category
    Then the response status should be 201
    And the response should contain the created category with id, name, parent, and subCategories

  Scenario: TC_ADMIN_CAT_17 - Verify Admin can update an existing category's details
    Given Category which is going to be updated exists in the system
    When user sends PUT request to update the category
    Then the response status should be 200
    And the response should contain the updated category details

  Scenario: TC_ADMIN_CAT_18 - Verify User can retrieve a specific category by ID
    Given a category exists in the system
    When user sends a GET request to retrieve the category by ID
    Then the response status should be 200
    And the response should contain the requested category details

  Scenario: TC_ADMIN_CAT_19 - Verify Admin can retrieve all sub-categories
    Given at least one sub-category exists in the system
    When user sends a GET request to retrieve all sub-categories
    Then the response status should be 200
    And the response should contain only sub-categories

  Scenario: TC_ADMIN_CAT_20 - Verify behavior when Admin tries to update non-existent category
    When user sends PUT request to update non-existent category
    Then the response status should be 404
    And the response body should contain error message "not found"
  