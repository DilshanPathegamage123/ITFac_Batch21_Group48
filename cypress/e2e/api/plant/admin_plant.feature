Feature: Admin User – Plants - API

    Background:
        Given Admin user is authenticated via API

    Scenario: TC_ADMIN_PLANT_14 - Verify Create Plant API with valid data
        Given Admin is authenticated and valid sub-category exists
        When Admin sends a POST request to create a plant with valid data
        Then the response status should be 201
        And the response should contain created plant object with generated ID and all provided fields

    Scenario: TC_ADMIN_PLANT_15 - Verify Create Plant API with missing mandatory field (Price)
        Given Admin is authenticated and category exists
        When Admin sends a POST request to create plant without Price field
        Then the response status should be 400
        And the response should contain validation error message about Price is required

    Scenario: TC_ADMIN_PLANT_16 - Verify Create Plant API with negative quantity
        Given Admin is authenticated and category exists
        When Admin sends a POST request to create plant with negative quantity
        Then the response status should be 400
        And the response should contain validation error message about quantity cannot be negative