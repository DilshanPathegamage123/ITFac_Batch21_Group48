Feature: Categories Navigation

  Scenario: TC_ADMIN_CAT_01 Verify navigation to Categories page from Dashboard
    Given Admin is logged in
    And Admin is on the Dashboard page
    When Admin clicks on Manage Categories button
    Then Admin should be navigated to Categories page
