Feature: Non-Admin User – Categories

  Background:
    Given Non-Admin user is logged in

  Scenario: TC_USER_CAT_01 - Verify Add Category button hidden
    When Non-Admin user navigates to Categories page
    Then Add Category button should not be visible

  Scenario: TC_USER_CAT_02 - Verify Edit buttons are functionally disabled for non-admin users
    When Non-Admin user navigates to Categories page
    Then all Edit buttons should be functionally disabled

  Scenario: TC_USER_CAT_03 - Verify Edit buttons are visually disabled for non-admin users
    When Non-Admin user navigates to Categories page
    Then all Edit buttons should be visually disabled

  Scenario: TC_USER_CAT_04 - Verify Delete buttons are functionally disabled for non-admin users
    When Non-Admin user navigates to Categories page
    Then all Delete buttons should be functionally disabled

  Scenario: TC_USER_CAT_05 - Verify Delete buttons are visually disabled for non-admin users
    When Non-Admin user navigates to Categories page
    Then all Delete buttons should be visually disabled



  Scenario: TC_USER_CAT_11 - Verify non-admin user can successfully Search by category
    Given User is on Categories page
    Then categories should exist in the system
    When user searches using first category name
    Then table should contain searched category


  Scenario: TC_USER_CAT_12 - Verify non-admin user can successfully Filter by parent
    Given User is on Categories page
    Then at least one parent category exists
    When user filters by an existing parent
    Then results should match selected parent

  Scenario: TC_USER_CAT_13 - Verify non-admin user can successfully Sort by name
    Given User is on Categories page
    When user sorts by name
    Then categories should be sorted

  Scenario: TC_USER_CAT_14 - Verify non-admin user can successfully Reset the filters
    Given User is on Categories page
    When user clicks reset
    Then all categories should be visible

  Scenario: TC_USER_CAT_15 Verify categories page heading
    Given User is on Categories page
    Then page heading should be "Categories"