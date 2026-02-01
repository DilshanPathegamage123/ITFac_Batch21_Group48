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






