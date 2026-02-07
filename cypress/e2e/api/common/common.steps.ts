import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiLogin } from "../../../support/api/auth";

export let token: string;
export let malformedToken: string;
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

Given('User has an invalid authentication token', () => {
  malformedToken = 'malformed_token_!@#$%';
});

Given('User is not authenticated', () => {
  token = ''; 
});

Then("the response status should be {int}", (status: number) => {
  expect(response.status).to.eq(status);
});
