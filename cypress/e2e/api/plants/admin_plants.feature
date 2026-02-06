Feature: Admin Plant Management API

Background:
  Given Admin has a valid API token

Scenario: TC_ADMIN_PLANT_06 Retrieve plant list
  When Admin requests plant list
  Then the response status should be 200
  And response should match plant list schema

Scenario: TC_ADMIN_PLANT_07 Pagination support
  When Admin requests plant list with page 0 and size 5
  Then response status should be 200
  And response should be paginated

Scenario: TC_ADMIN_PLANT_08 Search by name
  When Admin searches plant by name "Plant 0"
  Then response status should be 200
  And all plants should contain name "Plant 0"

Scenario: TC_ADMIN_PLANT_09 Filter by category
  When Admin filters plants by category 3
  Then response status should be 200
  And all plants should have categoryId 3

Scenario: TC_ADMIN_PLANT_10 Sort by name
  When Admin sorts plants by "name"
  Then response status should be 200
  And plants should be sorted by "name"
