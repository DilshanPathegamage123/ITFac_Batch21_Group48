Feature: Unauthorize User – Categories - API

Scenario: Unauthenticated user can't get all categories
  When unauthenticated user sends "GET" request to "/api/categories"
  Then the response status should be 401

Scenario: Unauthenticated user can't get category by id
  When unauthenticated user sends "GET" request to "/api/categories/1"
  Then the response status should be 401

Scenario: Unauthenticated user can't get paginated categories
  When unauthenticated user sends "GET" request to "/api/categories/page"
  Then the response status should be 401

Scenario: Unauthenticated user can't get category summary
  When unauthenticated user sends "GET" request to "/api/categories/summary"
  Then the response status should be 401

Scenario: Unauthenticated user can't get sub categories
  When unauthenticated user sends "GET" request to "/api/categories/sub-categories"
  Then the response status should be 401

Scenario: Unauthenticated user can't get main categories
  When unauthenticated user sends "GET" request to "/api/categories/main"
  Then the response status should be 401

Scenario: Unauthenticated user can't create category
  When unauthenticated user sends "POST" request to "/api/categories"
  Then the response status should be 401

Scenario: Unauthenticated user can't update category
  When unauthenticated user sends "PUT" request to "/api/categories/1"
  Then the response status should be 401

Scenario: Unauthenticated user can't delete category
  When unauthenticated user sends "DELETE" request to "/api/categories/1"
  Then the response status should be 401
