import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiLogin } from "../../../support/api/auth";
import { setResponse, response } from "../common/common.steps";

let token: string;
let categoryId: number;
let plantPayload: any;

Given("Admin is authenticated and valid sub-category exists", () => {
  apiLogin("admin").then((t) => {
    token = t;
    // Get a valid category
    cy.request({
      method: "GET",
      url: "/api/categories/sub-categories",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.length).to.be.greaterThan(0);
      categoryId = res.body[0].id;
    });
  });
});

Given("Admin is authenticated", () => {
  apiLogin("admin").then((t) => {
    token = t;
    // Get first category for subsequent requests
    cy.request({
      method: "GET",
      url: "/api/categories",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      categoryId = res.body[0].id;
    });
  });
});

When("Admin sends a POST request to create a plant with valid data", () => {
    const uniquePlantName = "TestPlant_" + new Date().getTime();
  plantPayload = {
    id: 0,
    name: uniquePlantName,
    price: 150,
    quantity: 25,
    category: {},
  };

  cy.request({
    method: "POST",
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

When("Admin sends a POST request to create plant without Price field", () => {
  plantPayload = {
    id: 0,
    name: "Test Plant",
    quantity: 25,
    category: {},
  };

  cy.request({
    method: "POST",
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

When("Admin sends a POST request to create plant with negative quantity", () => {
  plantPayload = {
    id: 0,
    name: "Test Plant",
    price: 100,
    quantity: -5,
    category: {},
  };

  cy.request({
    method: "POST",
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});


Then("the response should contain created plant object with generated ID and all provided fields", () => {
  expect(response.body).to.be.an("object");
  expect(response.body).to.have.property("id");
  expect(response.body).to.have.property("name");
  expect(response.body).to.have.property("price").and.equal(150);
  expect(response.body).to.have.property("quantity").and.equal(25);
  expect(response.body.id).to.be.a("number").and.greaterThan(0);
});

Then("the response should contain validation error message about Price is required", () => {
  expect(response.body).to.have.property("message");
  expect(response.body.message.toLowerCase()).to.include("validation");
});

Then("the response should contain validation error message about quantity cannot be negative", () => {
  expect(response.body).to.have.property("message");
  expect(response.body.message.toLowerCase()).to.include("validation");
});