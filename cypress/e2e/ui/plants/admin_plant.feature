Feature: Admin Plant Management

  Background:
    Given Admin is logged in

  Scenario: TC_ADMIN_PLANT_11 - Verify Cancel button functionality on Add Plant page
    Then Admin is on Add Plant page "/ui/plants/add"
    When Admin clicks Cancel button on Add Plant page
    Then User is navigated back to Plants list page "/ui/plants" and no new plant is created; entered data is discarded

  Scenario: TC_ADMIN_PLANT_12 - Verify validation errors display for empty mandatory fields
    Then Admin is on Add Plant page "/ui/plants/add"
    When Admin leaves all fields empty on Add Plant page
    And Admin clicks Save button
    Then Validation errors appear in red below each field: "Plant name is required", "Price is required", "Quantity is required", "Category is required"

  Scenario: TC_ADMIN_PLANT_13 - Verify Plant Name length validation (less than 3 characters)
    Then Admin is on Add Plant page "/ui/plants/add"
    When Admin enters Plant Name with 2 characters (e.g., "AB")
    And Admin fills other fields with valid data
    And Admin clicks Save button
    Then Validation error "Plant name must be between 3 and 25 characters" appears in red below Plant Name field