Feature: User Dashboard

  Background:
    Given Non-Admin user is logged in

  Scenario: TC_USER_DASH_01 - Verify Dashboard loads for User after login
    Then Non-Admin user is redirected to Dashboard page "/ui/dashboard"
    And Dashboard page loads successfully

  Scenario: TC_USER_DASH_02 - Verify unauthenticated users cannot access Dashboard
    Given Non-Admin user is not logged in
    When Non-Admin user navigates directly to Dashboard URL
    Then Non-Admin user is redirected to "/ui/login" page
    And Dashboard page should not be accessible