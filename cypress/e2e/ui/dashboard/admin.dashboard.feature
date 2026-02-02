Feature: Admin Dashboard

  Background:
    Given Admin is logged in

  Scenario: TC_ADMIN_DASH_01 - Verify Dashboard loads for Admin after login
    Then User is redirected to Dashboard page "/ui/dashboard"
    And Dashboard page loads successfully

  Scenario: TC_ADMIN_DASH_02 - Verify Dashboard displays all summary sections for Admin
    Then Admin user is logged in
    And Dashboard should display Category summary section
    And Dashboard should display Plants summary section
    And Dashboard should display Sales summary section
    And All three summary sections should display summary information

  Scenario: TC_ADMIN_DASH_03 - Verify navigation menu highlights Dashboard for Admin
    Then Admin user is logged in and on Dashboard
    And Dashboard menu item should be highlighted in navigation menu
    And Dashboard menu item status should be active