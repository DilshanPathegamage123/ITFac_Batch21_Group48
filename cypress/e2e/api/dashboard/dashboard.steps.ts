import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiLogin } from "../../../support/api/auth";
import { setResponse, response } from "../common/common.steps";

let token: string;
let invalidToken: string;

Given("Admin authentication token is valid and plants exist in the system", () => {
  apiLogin("admin").then((t) => {
    token = t;
    cy.request({
      method: "GET",
      url: "/api/plants/summary",
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("object");
    });
  });
});

Given("Admin token is invalid or expired", () => {
  invalidToken = "invalid_or_expired_token_12345";
});

When("Admin sends a GET request to retrieve plants summary", () => {
  cy.request({
    method: "GET",
    url: "/api/plants/summary",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setResponse(res);
  });
});

When("Admin sends a GET request to Dashboard API with invalid token", () => {
  cy.request({
    method: "GET",
    url: "/api/dashboard",
    headers: { Authorization: `Bearer ${invalidToken}` },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

When("Admin sends a GET request to Dashboard API endpoint without authentication header", () => {
  cy.request({
    method: "GET",
    url: "/api/dashboard",
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

Then("the response should contain plants data in JSON format with relevant summary information", () => {
  expect(response.body).to.be.an("object");
  expect(response.body).to.have.property("totalPlants");
  expect(response.body).to.have.property("lowStockPlants");
});

Then("the response body structure should be valid and parseable", () => {
  expect(response.body).to.not.be.null;
  expect(typeof response.body).to.eq("object");
});

Then("the response should contain authentication error message", () => {
  expect(response.body).to.have.property("message");
  expect(response.body.message).to.include("Unauthorized");
});

Then("the response should indicate authentication is required", () => {
  expect(response.body).to.have.property("message");
  expect(response.body.message).to.include("Auth");
});