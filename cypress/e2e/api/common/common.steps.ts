import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiLogin } from "../../../support/api/auth";

export let token: string;
// This will be set by individual step files
export let response: Cypress.Response<any>;

export const setResponse = (res: Cypress.Response<any>) => {
  response = res;
};

// Authenticate admin user
Given("Admin user is authenticated via API", () => {
  return apiLogin("admin").then((t) => {
    token = t;
  });
});

// Authenticate non-admin user
Given("Non-admin user is authenticated via API", () => {
  return apiLogin("user").then((t) => {
    token = t;
  });
});

// Common assertion steps
Then("the response status should be 200", () => {
  expect(response.status).to.eq(200);
});

Then("the response status should be 204", () => {
  expect(response.status).to.eq(204);
});

Then("the response status should be 400", () => {
  expect(response.status).to.eq(400);
});

Then("the response status should be 401", () => {
  expect(response.status).to.eq(401);
});

Then("the response status should be 403", () => {
  expect(response.status).to.eq(403);
});

Then("the response status should be 201", () => {
  expect(response.status).to.eq(201);
});
