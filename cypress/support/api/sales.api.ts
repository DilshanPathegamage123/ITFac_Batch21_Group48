/// <reference types="cypress" />

export interface Sale {
  id: number;
  plantId: number;
  quantity: number;
  totalPrice: number;
  soldAt: string;
}

export const createSale = (
  token: string,
  plantId: number,
  quantity: number,
  failOnStatusCode = true
): Cypress.Chainable<Cypress.Response<Sale>> => {
  return cy.request<Sale>({
    method: 'POST',
    url: `/api/sales/plant/${plantId}?quantity=${quantity}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode,
  });
};

export const getSales = (
  token?: string,
  failOnStatusCode = true
): Cypress.Chainable<Cypress.Response<Sale[]>> => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return cy.request<Sale[]>({
    method: 'GET',
    url: '/api/sales',
    headers,
    failOnStatusCode,
  });
};

export const deleteSale = (
  token: string,
  saleId: number
): Cypress.Chainable<Cypress.Response<void>> => {
  return cy.request({
    method: 'DELETE',
    url: `/api/sales/${saleId}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
  });
};
  