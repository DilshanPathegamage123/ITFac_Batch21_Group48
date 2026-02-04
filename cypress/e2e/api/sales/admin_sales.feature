Feature: Admin User – Sales – API

  Background:
    Given Admin user is authenticated via API

  Scenario: TC_ADMIN_SALES_01 - Verify Admin can create a sale with valid data
    When Admin creates a sale for plant ID 1 with quantity 5
    Then the response status should be 201

  Scenario: TC_ADMIN_SALES_02 - Verify Admin receives error for zero quantity
    When Admin creates a sale for plant ID 1 with quantity 0
    Then the response status should be 400

  Scenario: TC_ADMIN_SALES_03 - Verify Admin receives error for non-existent plant ID
    When Admin creates a sale with non-existent plant ID 999
    Then the response status should be 404

  Scenario: TC_ADMIN_SALES_04 - Verify Admin can retrieve all sales
    When Admin retrieves all sales
    Then the response status should be 200
    And the response should contain a sales array

  Scenario: TC_ADMIN_SALES_05 - Verify Admin can successfully delete an existing sale
    Given a sale exists
    When Admin deletes the sale
    Then the response status should be 204
    And the sale should no longer exist
