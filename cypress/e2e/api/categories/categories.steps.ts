import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiLogin } from "../../../support/api/auth";

let response: Cypress.Response<any>;
let token: string;

// Authenticate admin
Given("Admin is authenticated via API", () => {
  apiLogin("admin").then((t) => {
    token = t;
  });
});

// Precondition: At least one category exists
Given("at least one category exists in the system", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.body.length).to.be.greaterThan(0);
    response = res; // optional, you can reuse it for next steps
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
    response = res;
  });
});

// Main requests
When("Admin sends a GET request to retrieve all categories", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    response = res;
  });
});

When(
  "Admin sends a GET request to retrieve categories with name {string}",
  (name: string) => {
    cy.request({
      method: "GET",
      url: "/api/categories",
      qs: { name },
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      response = res;
    });
  }
);

// Assertions
Then("the response status should be 200", () => {
  expect(response.status).to.eq(200);
});

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
