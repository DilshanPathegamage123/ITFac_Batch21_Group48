Feature: Non-Admin Plant Management

    Background:
        Given Non-Admin user is logged in

    Scenario: TC_USER_PLANT_11 - Verify Add Plant button is not visible to User
        Given Non-Admin user is logged in
        When Non-Admin user navigates to Plants list page "/ui/plants"
        Then Add Plant button is not visible on the page

    Scenario: TC_USER_PLANT_12 - Verify User cannot access Add Plant page directly via URL
        Given Non-Admin user is logged in
        When Non-Admin user directly navigates to "/ui/plants/add" in browser
        Then User is redirected to 403 Forbidden page
        And Access denied message is displayed