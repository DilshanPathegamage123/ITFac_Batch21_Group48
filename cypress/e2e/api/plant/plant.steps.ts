import { Given, When, Then, After } from '@badeball/cypress-cucumber-preprocessor';
import { apiLogin } from '../../../support/api/auth';
import { setResponse, response } from '../common/common.steps';

let token: string;
let categoryId: number;
let plantPayload: any;
let plantId: number | null = null;

Given('Admin is authenticated and valid sub-category exists', () => {
  apiLogin('admin').then((t) => {
    token = t;
    // Get a valid category
    cy.request({
      method: 'GET',
      url: '/api/categories/sub-categories',
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.length).to.be.greaterThan(0);
      categoryId = res.body[0].id;
    });
  });
});

Given('Admin is authenticated and category exists', () => {
  apiLogin('admin').then((t) => {
    token = t;
    // Get first category for subsequent requests
    cy.request({
      method: 'GET',
      url: '/api/categories',
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      categoryId = res.body[0].id;
    });
  });
});

When('Admin sends a POST request to create a plant with valid data', () => {
  const uniquePlantName = 'TestPlant_' + new Date().getTime();
  plantPayload = {
    id: 0,
    name: uniquePlantName,
    price: 150,
    quantity: 25,
    category: {},
  };

  cy.request({
    method: 'POST',
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
    plantId = res.body.id;
  });
});

When('Admin sends a POST request to create plant without Price field', () => {
  plantPayload = {
    id: 0,
    name: 'Test Plant',
    quantity: 25,
    category: {},
  };

  cy.request({
    method: 'POST',
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

When('Admin sends a POST request to create plant with negative quantity', () => {
  plantPayload = {
    id: 0,
    name: 'Test Plant',
    price: 120,
    quantity: -5,
    category: {},
  };

  cy.request({
    method: 'POST',
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

Then(
  'the response should contain created plant object with generated ID and all provided fields',
  () => {
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name');
    expect(response.body).to.have.property('price').and.equal(150);
    expect(response.body).to.have.property('quantity').and.equal(25);
    expect(response.body.id).to.be.a('number').and.greaterThan(0);
  }
);

Then('the response should contain validation error message about Price is required', () => {
  expect(response.body.message).to.equal('Validation failed');
  expect(response.body.details).to.have.property('price');
  expect(response.body.details.price).to.equal('Price is required');
});

Then('the response should contain validation error message about quantity cannot be negative', () => {
  expect(response.body.message).to.equal('Validation failed');
  expect(response.body.details).to.have.property('quantity');
  expect(response.body.details.quantity).to.equal('Quantity cannot be negative');
});

// non-admin plant steps can go here

Given('Non-admin user is authenticated and valid sub-category exists', () => {
  apiLogin('user').then((t) => {
    token = t;

    cy.request({
      method: 'GET',
      url: '/api/categories/sub-categories',
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      expect(res.status).to.eq(200);
      categoryId = res.body[0].id;
    });
  });
});

/* -------------------------------------------
   EXISTING PLANT SETUP (created by admin)
-------------------------------------------- */

Given('User is authenticated and plant exists', () => {
  // Login as admin to create plant first
  apiLogin('admin').then((adminToken) => {
    cy.request({
      method: 'GET',
      url: '/api/categories/sub-categories',
      headers: { Authorization: `Bearer ${adminToken}` },
    }).then((res) => {
      categoryId = res.body[0].id;

      const uniqueName = 'Plant' + Date.now();

      cy.request({
        method: 'POST',
        url: `/api/plants/category/${categoryId}`,
        headers: { Authorization: `Bearer ${adminToken}` },
        body: {
          id: 0,
          name: uniqueName,
          price: 120,
          quantity: 10,
          category: {},
        },
      }).then((createRes) => {
        plantId = createRes.body.id;

        // Now login as regular user
        apiLogin('user').then((userToken) => {
          token = userToken;
        });
      });
    });
  });
});


// CREATE PLANT AS USER (SHOULD FAIL)
When('User sends POST request to create plant with valid data', () => {
  plantPayload = {
    id: 0,
    name: 'Plant_' + Date.now(),
    price: 150,
    quantity: 20,
    category: {},
  };

  cy.request({
    method: 'POST',
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

//UPDATE PLANT AS USER (SHOULD FAIL)
When('User sends PUT request to update plant', () => {
  plantPayload = {
    id: plantId,
    name: 'Updated' + Date.now(),
    price: 200,
    quantity: 30,
    category: {},
  };

  cy.request({
    method: 'PUT',
    url: `/api/plants/${plantId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});


After(() => {
  if (plantId) {
    const sqlQuery = `DELETE FROM plants WHERE id = ${plantId}`;
    
    cy.task('queryDb', sqlQuery).then((result: any) => {
        console.log('Result Object:', result);
      cy.log(`Cleanup successful. Rows affected: ${result.affectedRows}`);
      // Reset the ID for the next run
      plantId = null; 
    });
  } else {
    cy.log('Cleanup skipped: No plantId captured.');
  }
});
