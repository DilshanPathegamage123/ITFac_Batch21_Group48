Feature: Categories Navigation

  Background:
    Given Admin is logged in
    And Admin is on the Dashboard page

  Scenario: TC_ADMIN_CAT_01 - Verify navigation to Categories page from Dashboard
    When Admin clicks on Manage Categories button
    Then the URL should be "/ui/categories"

  Scenario: TC_ADMIN_CAT_02 - Verify page title when Admin clicks Manage Categories
    When Admin clicks on Manage Categories button
    Then Categories page title should be "Categories"

  Scenario: TC_ADMIN_CAT_03 - Verify category list table displays when categories are available
    When Admin clicks on Manage Categories button
    Then categories should exist in the system
    And at least one category should be displayed in the categories table

  Scenario: TC_ADMIN_CAT_04 - Verify message displayed when no categories exist
    When Admin clicks on Manage Categories button
    Then no categories should exist in the system
    And "No category found" message should be displayed in the categories table

  Scenario: TC_ADMIN_CAT_05 - Verify Add Category button is visible to Admin
    When Admin clicks on Manage Categories button
    Then Add Category button should be visible



  Scenario: TC_ADMIN_CAT_11 Verify Add Category URL
    Given Admin is on Categories page
    When Admin clicks Add A Category button
    Then URL should be "/ui/categories/add"

  Scenario: TC_ADMIN_CAT_12 Verify Add Category heading
    Given Admin is on Categories page
    When Admin clicks Add A Category button
    Then page heading should be "Add Category"

  Scenario: TC_ADMIN_CAT_13 Add new category successfully
    Given Admin is on Categories page
    When Admin adds category "Birds"
    Then success message should be visible
    And table should contain "Birds"

  Scenario: TC_ADMIN_CAT_14 Validate empty name error
    Given Admin is on Categories page
    When Admin saves category without name
    Then error message should be visible

  Scenario: TC_ADMIN_CAT_15 Edit existing category successfully
    Given Admin is on Categories page
    When Admin edits category "Birds" to "Pets"
    Then URL should be "/ui/categories"
    And table should contain "Pets"







