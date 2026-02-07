Feature: User Sales Module UI Validation

  Background:
    Given application is running
    And user is logged in as User

  Scenario: TC_USER_SALES_01 Verify Sales page loads correctly for User
    When user clicks Sales menu
    Then Sales page should load successfully for user

  Scenario: TC_USER_SALES_02 Verify Sell Plant button is hidden for User
    When user is on Sales page
    Then Sell Plant button should not be visible

  Scenario: TC_USER_SALES_03 Verify Delete button is hidden for User
    When user is on Sales page
    Then Delete button should not be visible

  Scenario: TC_USER_SALES_04 Verify User cannot access Sell Plant page directly
    When User navigates directly to Sell Plant page
    Then access should be denied

  Scenario: TC_USER_SALES_05 Verify User can view sales records
    When user is on Sales page
    Then sales records should be displayed correctly

  Scenario: TC_USER_SALES_06 Verify sorting is available for User
    When user is on Sales page
    Then sorting should be available for sales table
