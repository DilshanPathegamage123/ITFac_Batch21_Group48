Feature: Admin Sales Module UI Validation

  Background:
    Given application is running
    And user is logged in as Admin

  Scenario: TC_ADMIN_SALES_01 Verify Sales page loads correctly for Admin
    When user clicks on Sales menu
    Then Sales page should load successfully

  Scenario: TC_ADMIN_SALES_02 Verify Sell Plant button visibility for Admin
    When user clicks on Sales menu
    Then Sell Plant button should be visible and enabled

  Scenario: TC_ADMIN_SALES_03 Verify navigation to Sell Plant page when clicking Sell Plant button
    When user is on Sales page
    And Admin clicks Sell Plant button
    Then Sell Plant page should be displayed

  Scenario: TC_ADMIN_SALES_04 Verify validation errors when submitting Sell Plant form with empty fields
    When user is on Sell Plant page
    And Admin submits Sell Plant form without entering data
    Then quantity validation error should be displayed

  Scenario: TC_ADMIN_SALES_05 Verify Admin can successfully create a sale using valid inputs
    When user is on Sell Plant page
    And Admin selects a plant and enters valid quantity
    Then newly created sale should appear in sales table

  Scenario: TC_ADMIN_SALES_06 Verify Admin can deletes a sale
    When user is on Sales page
    And Admin deletes the first sale on the current page
    Then sale should be deleted successfully
    And deleted sale should no longer appear in the table

Scenario: TC_ADMIN_SALES_08 Verify validation message for negative quantity input
  When user is on Sell Plant page
  And Admin selects a plant
  And Admin enters quantity as -5
  And Admin submits Sell Plant form
  Then validation message "Quantity must be greater than 0" should be displayed
