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

Then("the response status should be {int}", (status: number) => {
  expect(response.status).to.eq(status);
});
