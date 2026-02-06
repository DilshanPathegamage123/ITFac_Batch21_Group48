Feature: User Plant API

Background:
  Given User has a valid API token

Scenario: TC_USER_PLANT_06 Retrieve plant list
  When User requests plant list
  Then response status should be 200

Scenario: TC_USER_PLANT_07 User cannot add plant
  When User tries to create plant
  Then response status should be 403

Scenario: TC_USER_PLANT_08 Search by name
  When User searches plant by name "Plant A"
  Then response status should be 200

Scenario: TC_USER_PLANT_09 Filter plants by category
  When User filters plants by category 3
  Then response status should be 200
  And all plants should have categoryId 3

Scenario: TC_USER_PLANT_10 Invalid search
  When User searches plant by name "INVALID_123"
  Then response should be empty
