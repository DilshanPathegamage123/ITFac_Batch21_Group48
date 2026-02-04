Feature: Plant Management UI 

  Scenario: TC_ADMIN_PLANT_01 Admin opens Plant List 
    Given Admin is logged in 
    When Admin clicks "Manage Plants" 
    Then Plant List page should load 
    
  Scenario: TC_ADMIN_PLANT_02 Add Plant button visible 
    Given Admin is on Plant List page 
    Then "Add a Plant" button should be visible 

  Scenario: TC_ADMIN_PLANT_03 Verify Edit and Delete actions are available for Admin
    Given Admin is on Plant List page
    Then Edit and Delete buttons should be visible for each plant

Scenario: TC_ADMIN_PLANT_04 Verify Low stock badge display
  Given Admin is logged in
  And Admin is on Plant List page
  Then Low stock badge should be displayed


  Scenario: TC_ADMIN_PLANT_05 Verify sorting functionality
    Given Admin is logged in
    And Admin is on Plant List page
    When Admin clicks Name column
    Then Plants should be sorted by ascending order
    Then Plants should be sorted by descending order

  
  Scenario: TC_USER_PLANT_01 Verify Plant List page loads for User
  Given User is logged in
  When User opens Plant List page
  Then Plant List page should load for User

  Scenario: TC_USER_PLANT_02 Add Plant hidden for User 
    Given User is on Plant List page 
    Then "Add Plant" button should not be visible 
    
  Scenario: TC_USER_PLANT_03 Verify Edit and Delete actions are hidden for User
    Given  User is on Plant List page
    Then Edit and Delete actions should not be visible

  Scenario: TC_USER_PLANT_04 Verify plant search functionality for User
    Given  User is on Plant List page
    When User searches for plant "Plant A"
    Then Matching plant records should be displayed
   
  Scenario: TC_USER_PLANT_05 Verify "No plants found" message
    Given User is on Plant List page
    When User searches for plant "INVALID_PLANT_123"
    Then "No plants found" message should be displayed
   
