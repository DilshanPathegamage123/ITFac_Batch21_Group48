import { Then } from "@badeball/cypress-cucumber-preprocessor";

// This will be set by individual step files
export let response: Cypress.Response<any>;

export const setResponse = (res: Cypress.Response<any>) => {
  response = res;
};

// Common assertion steps
Then("the response status should be 200", () => {
  expect(response.status).to.eq(200);
});

Then("the response status should be 401", () => {
  expect(response.status).to.eq(401);
});