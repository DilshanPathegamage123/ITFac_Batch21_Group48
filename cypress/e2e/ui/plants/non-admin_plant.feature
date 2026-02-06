Feature: Non-Admin Plant Management

    Background:
        Given Non-Admin user is logged in

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

    Scenario: TC_USER_PLANT_11 - Verify Add Plant button is not visible to User
        Given Non-Admin user is logged in
        When Non-Admin user navigates to Plants list page "/ui/plants"
        Then Add Plant button is not visible on the page

    Scenario: TC_USER_PLANT_12 - Verify User cannot access Add Plant page directly via URL
        Given Non-Admin user is logged in
        When Non-Admin user directly navigates to "/ui/plants/add" in browser
        Then User is redirected to 403 Forbidden page
        And Access denied message is displayed