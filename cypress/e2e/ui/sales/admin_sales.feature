Feature: Admin Sales Module UI Validation

  Background:
    Given application is running
    And user is logged in as Admin

  Scenario: TC_ADMIN_SALES_01 Verify Sales page loads correctly for Admin
    When user clicks Sales menu
    Then Sales page should load successfully

  Scenario: TC_ADMIN_SALES_02 Verify Sell Plant button visibility for Admin
    When user is on Sales page
    Then Sell Plant button should be visible and enabled

  Scenario: TC_ADMIN_SALES_03 Verify navigation to Sell Plant page
    When user is on Sales page
    And Admin clicks Sell Plant button
    Then Sell Plant page should be displayed

  Scenario: TC_ADMIN_SALES_04 Verify validation errors for empty Sell Plant form
    When user is on Sell Plant page
    And Admin submits empty Sell Plant form
    Then quantity validation error should be displayed

  Scenario: TC_ADMIN_SALES_05 Verify Admin can create a sale
    When user is on Sell Plant page
    And Admin creates a sale with plant 1 and quantity 1
    Then new sale should appear in sales table

  Scenario: TC_ADMIN_SALES_06 Verify Admin can delete a sale
    When user is on Sales page
    And Admin deletes the first sale
    Then sale should be deleted successfully
    And deleted sale should no longer appear in the table

  Scenario: TC_ADMIN_SALES_07 Verify validation for negative quantity
    When user is on Sell Plant page
    And Admin selects a plant
    And Admin enters quantity as -5
    And Admin submits Sell Plant form
    Then quantity validation error should be displayed
