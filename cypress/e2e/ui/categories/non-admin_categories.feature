Feature: User – Categories Access Control

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