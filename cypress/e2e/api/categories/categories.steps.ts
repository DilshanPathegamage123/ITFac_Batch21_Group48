import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiLogin } from "../../../support/api/auth";
import { setResponse, response, token } from "../common/common.steps";

let categoryIdToDelete: number;

// Precondition: At least one category exists
Given("at least one category exists in the system", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.body.length).to.be.greaterThan(0);
    setResponse(res);
  });
});

// Precondition: At least one matching category exists
Given("there is at least one matching category", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    qs: { name: "Flower" },
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.body.some((cat: any) => cat.name.includes("Flower"))).to.be.true;
    setResponse(res);
  });
});

// Precondition: Category to be deleted should exists
Given("Category which is going to be deleted exists in the system", () => {
  const categoryName = `CAT${Date.now().toString().slice(-4)}`;

  cy.request({
    method: "POST",
    url: "/api/categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      name: categoryName,
      parent: null,
      subCategories: [],
    },
  }).then((res) => {
    expect(res.status).to.eq(201);
    categoryIdToDelete = res.body.id;
  });
});

// Precondition: Existing category for non-admin delete test
Given("an existing category is available for non-admin delete test", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.body.length).to.be.greaterThan(0);
    categoryIdToDelete = res.body[0].id; 
  });
});

// Main requests
When("user sends a GET request to retrieve all categories", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setResponse(res);
  });
});

When(
  "user sends a GET request to retrieve categories with name {string}",
  (name: string) => {
    cy.request({
      method: "GET",
      url: "/api/categories",
      qs: { name },
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setResponse(res);
    });
  }
);

When("user sends DELETE request to delete the category", () => {
  cy.request({
    method: "DELETE",
    url: `/api/categories/${categoryIdToDelete}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

When("user sends a GET request to retrieve paginated categories", () => {
  cy.request({
    method: "GET",
    url: "/api/categories/page",
    qs: {
      page: 0,
      size: 10,
      sortField: "id",
      sortDir: "asc",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    setResponse(res);
  });
}
);


// Assertions

Then("the response should contain a list of categories", () => {
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.be.greaterThan(0);
});

Then("the response should contain matching categories", () => {
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.be.greaterThan(0);
});

Then("the response should be an empty array", () => {
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.eq(0);
});

Then("each category should have id, name, parent, and subCategories", () => {
  response.body.forEach((category: any) => {
    expect(category).to.have.all.keys("id", "name", "parent", "subCategories");
    expect(category.id).to.be.a("number");
    expect(category.name).to.be.a("string");
    expect(category.parent).to.be.a("string");
    expect(category.subCategories).to.be.an("array");
  });
});

Then("each category should have id, name, and parentName", () => {
  response.body.forEach((category: any) => {
    expect(category).to.have.all.keys("id", "name", "parentName");
    expect(category.id).to.be.a("number");
    expect(category.name).to.be.a("string");
    expect(category.parentName).to.be.a("string");
  });
});

Then("the response body should be empty", () => {
  expect(response.body).to.be.empty;
});

Then(
  "attempting to retrieve the deleted category should return 404",
  () => {
    cy.request({
      method: "GET",
      url: `/api/categories/${categoryIdToDelete}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  }
);

Then("the response should contain a paginated list of categories", () => {
  expect(response.body).to.be.an("object");

  // content validation
  expect(response.body).to.have.property("content");
  expect(response.body.content).to.be.an("array");
  expect(response.body.content.length).to.be.greaterThan(0);
  expect(response.body.content.length).to.be.at.most(10);

  // pagination metadata
  expect(response.body).to.have.property("pageable");
  expect(response.body).to.have.property("totalElements");
  expect(response.body).to.have.property("totalPages");
});

Then(
  "each paginated category should have id, name, and parentName",
  () => {
    response.body.content.forEach((category: any) => {
      expect(category).to.have.all.keys("id", "name", "parentName");
      expect(category.id).to.be.a("number");
      expect(category.name).to.be.a("string");
      expect(category.parentName).to.be.a("string");
    });
  }
);

When(
  "user sends a GET request to retrieve paginated categories with name {string}",
  (name: string) => {
    cy.request({
      method: "GET",
      url: "/api/categories/page",
      qs: {
        page: 0,
        size: 10,
        sortField: "id",
        sortDir: "asc",
        name,
      },
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setResponse(res);
    });
  }
);

Then(
  "all paginated categories' names should include {string}",
  (name: string) => {
    response.body.content.forEach((category: any) => {
      expect(category.name.toLowerCase()).to.include(name.toLowerCase());
    });
  }
);

Then(
  "the response body should contain {string}",
  (expectedMessage: string) => {
    const actualMessage = response.body.message || response.body.error || "";
    expect(actualMessage.toLowerCase()).to.include(expectedMessage.toLowerCase());
  }
);
