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



  Scenario: TC_USER_CAT_11 Search category
    Given User is on Categories page
    When user searches for "Wildlife"
    Then table should contain "Wildlife"

  Scenario: TC_USER_CAT_12 Filter by parent
    Given User is on Categories page
    When user filters by parent "Animals"
    Then results should match parent

  Scenario: TC_USER_CAT_13 Sort by name
    Given User is on Categories page
    When user sorts by name
    Then categories should be sorted

  Scenario: TC_USER_CAT_14 Reset filters
    Given User is on Categories page
    When user clicks reset
    Then all categories should be visible

  Scenario: TC_USER_CAT_15 Verify heading
    Given User is on Categories page
    Then page heading should be "Categories"