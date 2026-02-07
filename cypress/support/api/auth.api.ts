// auth.api.ts
export const loginAdmin = (): Cypress.Chainable<Cypress.Response<{ token: string }>> => {
  return cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { username: 'admin', password: 'admin123' }, // or from fixture
    failOnStatusCode: false,
  });
};

export const loginUser = (): Cypress.Chainable<Cypress.Response<{ token: string }>> => {
  return cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { username: 'testuser', password: 'test123' },
    failOnStatusCode: false,
  });
};
