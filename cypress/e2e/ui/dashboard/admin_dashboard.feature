Feature: Admin Dashboard

  Background:
    Given Admin is logged in

  Scenario: TC_ADMIN_DASH_01 - Verify Dashboard loads for Admin after login
    Then Admin is redirected to Dashboard page "/ui/dashboard"
    And Dashboard page loads successfully

  Scenario: TC_ADMIN_DASH_02 - Verify Dashboard displays all summary sections for Admin
    Then Admin user is logged in
    And Dashboard should display Category summary section with summary information
    And Dashboard should display Plants summary section with summary information
    And Dashboard should display Sales summary section with summary information
    And All three summary sections should display summary information

  Scenario: TC_ADMIN_DASH_03 - Verify navigation menu highlights Dashboard for Admin
    Then Admin user is logged in and on Dashboard
    And Dashboard menu item should be highlighted in navigation menu
    And Dashboard menu item status should be active

  Scenario: TC_ADMIN_DASH_04 - Verify navigation menu highlights other sections when navigated away from Dashboard
    Then Admin user is logged in and on Dashboard
    When Admin navigates to Categories page
    Then Categories menu item should be highlighted in navigation menu
    And Categories menu item status should be active
    When Admin navigates back to Dashboard page
    Then Dashboard menu item should be highlighted in navigation menu
    And Dashboard menu item status should be active