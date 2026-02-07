import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { token, malformedToken, setResponse, response } from '../common/common.steps';
import { createSale, getSales, deleteSale } from '../../../support/api/sales.api';

let createdSaleId: number;

When(
  'Admin creates a sale for plant ID {int} with quantity {int}',
  (plantId: number, quantity: number) => {
    createSale(token, plantId, quantity, false).then((res) => {
      setResponse(res);
      if (res.status === 201) {
        createdSaleId = res.body.id;
      }
    });
  }
);

When(
  'User tries to create a sale for plant ID {int} with quantity {int}',
  (plantId: number, quantity: number) => {
    createSale(token, plantId, quantity, false).then((res) => {
      setResponse(res);
    });
  }
);

When('Admin creates a sale with non-existent plant ID {int}', (plantId: number) => {
  createSale(token, plantId, 1, false).then((res) => {
    setResponse(res);
  });
});

When('Admin retrieves all sales', () => {
  getSales(token).then((res) => {
    setResponse(res);
  });
});

When('User retrieves all sales', () => {
  getSales(token).then((res) => {
    setResponse(res);
  });
});

Then('the response should contain a sales array', () => {
  expect(response.body).to.be.an('array');
});

Given('a sale exists', () => {
  createSale(token, 1, 1, false).then((res) => {
    expect(res.status).to.eq(201);
    createdSaleId = res.body.id;
  });
});

When('Admin deletes the sale', () => {
  deleteSale(token, createdSaleId).then((res) => {
    setResponse(res);
  });
});

Then('the sale should no longer exist', () => {
  getSales(token).then((res) => {
    expect(res.status).to.eq(200);
    const ids = res.body.map((s: any) => s.id);
    expect(ids).to.not.include(createdSaleId);
  });
});

When('User tries to delete the sale', () => {
  deleteSale(token, createdSaleId).then((res) => {
    setResponse(res);
  });
});

When('User sends a GET request to Sales API with malformed token', () => {
  cy.request({
    method: 'GET',
    url: '/api/sales',
    headers: {
      Authorization: `Bearer ${malformedToken}`,
    },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

When('Non-authenticator retrieves all sales', () => {
  cy.request({
    method: 'GET',
    url: '/api/sales',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined, 
    },
    failOnStatusCode: false, 
  }).then((res) => {
    setResponse(res);
  });
});

