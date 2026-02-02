Feature: Plant Management UI

  Scenario: TC_ADMIN_PLANT_01 Admin opens Plant List
    Given Admin is logged in
    When Admin clicks "Manage Plants"
    Then Plant List page should load

  Scenario: TC_ADMIN_PLANT_02 Add Plant button visible
    Given Admin is on Plant List page
    Then "Add a Plant" button should be visible

  Scenario: TC_USER_PLANT_02 Add Plant hidden for User
    Given User is on Plant List page
    Then "Add Plant" button should not be visible
