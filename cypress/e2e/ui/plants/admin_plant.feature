Feature: Admin Plant Management

  Background:
    Given Admin is logged in

  Scenario: TC_ADMIN_PLANT_01 Admin opens Plant List 
    When Admin clicks "Manage Plants" 
    Then Plant List page should load 
    
  Scenario: TC_ADMIN_PLANT_02 Add Plant button visible 
    Given Admin is on Plant List page "/ui/plants"
    Then "Add Plant" button should be visible 

  Scenario: TC_ADMIN_PLANT_03 Verify Edit and Delete actions are available for Admin
    Given Admin is on Plant List page "/ui/plants"
    Then Edit and Delete buttons should be visible for each plant

  Scenario: TC_ADMIN_PLANT_04 Verify Low stock badge display
    Given Admin is logged in
    And Admin is on Plant List page "/ui/plants"
    Then Low stock badge should be displayed


  Scenario: TC_ADMIN_PLANT_05 Verify sorting functionality
    Given Admin is logged in
    And Admin is on Plant List page "/ui/plants"
    When Admin clicks Name column
    Then Plants should be sorted by ascending order
    Then Plants should be sorted by descending order


  Scenario: TC_ADMIN_PLANT_06 – Search plant by full name with spaces
    Then Admin is on Plant List page "/ui/plants"
    When Admin searches for plant "Plant 1"
    Then plant "Plant 1" should be visible in the results

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