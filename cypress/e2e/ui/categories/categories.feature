Feature: Categories Navigation

  Scenario: TC_ADMIN_CAT_01 Verify navigation to Categories page from Dashboard
    Given Admin is logged in
    And Admin is on the Dashboard page
    When Admin clicks on Manage Categories button
    Then Admin should be navigated to Categories page

  Scenario: TC_ADMIN_CAT_11 Verify Add Category URL
    Given Admin is logged in
    And Admin is on Categories page
    When Admin clicks Add A Category button
    Then URL should be "/ui/categories/add"

  Scenario: TC_ADMIN_CAT_12 Verify Add Category heading
    Given Admin is logged in
    And Admin is on Categories page
    When Admin clicks Add A Category button
    Then page heading should be "Add Category"

  Scenario: TC_ADMIN_CAT_13 Add new category successfully
    Given Admin is logged in
    And Admin is on Categories page
    When Admin adds category "Birds"
    Then success message should be visible
    And table should contain "Birds"

  Scenario: TC_ADMIN_CAT_14 Validate empty name error
    Given Admin is logged in
    And Admin is on Categories page
    When Admin saves category without name
    Then error message should be visible

  Scenario: TC_USER_CAT_11 Search category
    Given User is logged in
    And User is on Categories page
    When user searches for "Wildlife"
    Then table should contain "Wildlife"

  Scenario: TC_USER_CAT_12 Filter by parent
    Given User is logged in
    And User is on Categories page
    When user filters by parent "Animals"
    Then results should match parent

  Scenario: TC_USER_CAT_13 Sort by name
    Given User is logged in
    And User is on Categories page
    When user sorts by name
    Then categories should be sorted

  Scenario: TC_USER_CAT_14 Reset filters
    Given User is logged in
    And User is on Categories page
    When user clicks reset
    Then all categories should be visible

  Scenario: TC_USER_CAT_15 Verify heading
    Given User is logged in
    And User is on Categories page
    Then page heading should be "Categories"