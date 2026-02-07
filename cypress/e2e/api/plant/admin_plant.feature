Feature: Admin User – Plants - API

    Background:
        Given Admin user is authenticated via API

    Scenario: TC_ADMIN_PLANT_06 Retrieve plant list
        When Admin requests plant list
        Then the response status should be 200
        And response should match plant list schema

    Scenario: TC_ADMIN_PLANT_07 Pagination support
        When Admin requests plant list with page 0 and size 5
        Then the response status should be 200
        And response should be paginated

    Scenario: TC_ADMIN_PLANT_08 Search plant by ID
        When Admin searches plant by ID 1
        Then response status should be 200
        And plant details should contain correct ID and name


    Scenario: TC_ADMIN_PLANT_09 Filter by category
        When Admin filters plants by category 3
        Then the response status should be 200
        And all plants should have categoryId 3


    Scenario: TC_ADMIN_PLANT_10 Sort by name
        When Admin sorts plants by "name"
        Then the response status should be 200
        And plants should be sorted by "name"

    Scenario: TC_ADMIN_PLANT_11 Filter by non-existing category
        When Admin filters plants by non-existing category 999
        Then the response should fail with category not found for 999


    @cleanup
    Scenario: TC_ADMIN_PLANT_14 - Verify Create Plant API with valid data
        Given Admin is authenticated and valid sub-category exists
        When Admin sends a POST request to create a plant with valid data
        Then the response status should be 201
        And the response should contain created plant object with generated ID and all provided fields

    Scenario: TC_ADMIN_PLANT_15 - Verify Create Plant API with missing mandatory field (Price)
        Given Admin is authenticated and valid sub-category exists
        When Admin sends a POST request to create plant without Price field
        Then the response status should be 400
        And the response should contain validation error message about Price is required

    Scenario: TC_ADMIN_PLANT_16 - Verify Create Plant API with negative quantity
        Given Admin is authenticated and valid sub-category exists
        When Admin sends a POST request to create plant with negative quantity
        Then the response status should be 400
        And the response should contain validation error message about quantity cannot be negative