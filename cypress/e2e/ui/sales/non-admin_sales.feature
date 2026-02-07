Feature: User Sales Module UI Validation

  Background:
    Given application is running
    And user is logged in as User

  Scenario: TC_USER_SALES_06 Verify Sales page loads correctly for User role
    When User clicks Sales menu
    Then Sales page should load successfully for user

  Scenario: TC_USER_SALES_07 Verify Sell Plant button is not visible for User
    When user is on Sales page
    Then Sell Plant button should not be visible

  Scenario: TC_USER_SALES_08 Verify Delete action is not available for User role
    When user is on Sales page
    Then Delete button should not be visible

  Scenario: TC_USER_SALES_09 Verify User cannot access Sell Plant page via direct URL
    When User navigates directly to Sell Plant page
    Then access should be denied

  Scenario: TC_USER_SALES_10 Verify User can view sales records correctly
    When user is on Sales page
    Then sales records should be displayed correctly

      Scenario: TC_USER_SALES_11 Verify sorting support on Sales page for User
    When user is on Sales page
    Then sorting should be available for Plant name, Quantity, Total price, and Sold date for user

