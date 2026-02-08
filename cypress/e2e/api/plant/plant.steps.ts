import { Given, When, Then, After } from '@badeball/cypress-cucumber-preprocessor';
import { apiLogin } from '../../../support/api/auth';
import { setResponse, response, token } from '../common/common.steps';

let categoryId: number;
let plantPayload: any;
let plantId: number | null = null;
let userToken: string;


/* -----------------------------
Retrieve all plants
------------------------------- */
When('Admin requests plant list', () => {
  cy.request({
    method: 'GET',
    url: '/api/plants',
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setResponse(res);
  });
});

Then('response should match plant list schema', () => {
  expect(response.body).to.be.an('array');

  if (response.body.length > 0) {
    const plant = response.body[0];
    expect(plant).to.have.property('id');
    expect(plant).to.have.property('name');
    expect(plant).to.have.property('price');
    expect(plant).to.have.property('quantity');
    expect(plant).to.have.property('category');
  }
});

/* -----------------------------
 Pagination support
------------------------------- */
When('Admin requests plant list with page {int} and size {int}', (page: number, size: number) => {
  cy.request({
    method: 'GET',
    url: `/api/plants/paged?page=${page}&size=${size}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setResponse(res);
  });
});

Then('response should be paginated', () => {
  expect(response.body).to.have.property('content');
  expect(response.body).to.have.property('totalElements');
  expect(response.body).to.have.property('totalPages');
  expect(response.body).to.have.property('size');
  expect(response.body).to.have.property('number');

  expect(response.body.content).to.be.an('array');
  expect(response.body.content.length).to.be.lte(response.body.size);
});

/*----------------------- 
Search plant by ID
----------------------- */
When('Admin searches plant by ID {int}', (id: number) => {
  plantId = id;

  cy.request({
    method: 'GET',
    url: `/api/plants/${plantId}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setResponse(res);
  });
});



Then('plant details should contain correct ID and name', () => {
  expect(response.body).to.have.property('id', plantId);
  expect(response.body).to.have.property('name');
  expect(response.body).to.have.property('price');
  expect(response.body).to.have.property('quantity');
  expect(response.body).to.have.property('categoryId');
});

/*-----------------------
Filter plants by category
-----*/

When('Admin filters plants by category {int}', (categoryId: number) => {
   cy.request({
    method: 'GET',
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false, 
  }).then((res) => {
    setResponse(res); 
  });
});

Then('all plants should have categoryId {int}', (categoryId: number) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.be.an('array');

  response.body.forEach((plant: any) => {
    expect(plant).to.have.property('category');
    expect(plant.category).to.have.property('id', categoryId);
  });
});

/*----
Sort plants by a field (e.g., name)
--*/
When('Admin sorts plants by {string}', (field: string) => {
  cy.request({
    method: 'GET',
    url: `/api/plants/paged`,
    headers: { Authorization: `Bearer ${token}` },
    qs: {
      page: 0,
      size: 100, 
      sort: [`${field},asc`], 
    },
  }).then((res) => {
    setResponse(res); 
  });
});

Then('plants should be sorted by {string}', (field: string) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property('content').and.to.be.an('array');

  const values = response.body.content.map((p: any) => p[field].toLowerCase());

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] > values[i + 1]) {
      cy.log(`Misordered plants: "${values[i]}" > "${values[i + 1]}"`);
    }
    expect(values[i] <= values[i + 1]).to.be.true;
  }
});


// Filter plants by non-existing category
When('Admin filters plants by non-existing category {int}', (categoryId: number) => {
  cy.request({
    method: 'GET',
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false, 
  }).then((res) => {
    setResponse(res); 
  });
});

Then('the response should fail with category not found for {int}', (categoryId: number) => {
  expect(response.status).to.eq(404); 

  expect(response.body).to.have.property('message', 'Category not found');
});



Given('Admin is authenticated and valid sub-category exists', () => {
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

When('Admin sends a POST request to create a plant with valid data', () => {
  plantPayload = {
    id: 0,
    name: 'TestPlant5'+Date.now(),
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

Then(
  'the response should contain validation error message about quantity cannot be negative',
  () => {
    expect(response.body.message).to.equal('Validation failed');
    expect(response.body.details).to.have.property('quantity');
    expect(response.body.details.quantity).to.equal('Quantity cannot be negative');
  }
);

// non-admin plant steps can go here

Given('Non-admin user is authenticated and valid sub-category exists', () => {
  cy.request({
    method: 'GET',
    url: '/api/categories/sub-categories',
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.status).to.eq(200);
    categoryId = res.body[0].id;
  });
});

// EXISTING PLANT SETUP (created by admin)

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
        apiLogin('user').then((token) => {
          userToken = token;
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


After({ tags: "@DeletePlant" },() => {
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

/* -----------------------------
   TC_USER_PLANT_06 Retrieve plant list
------------------------------- */
When('User requests plant list', () => {
  cy.request({
    method: 'GET',
    url: '/api/plants',
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => setResponse(res));
});

Then('response status should be 200', () => {
  expect(response.status).to.eq(200);
});

/* -----------------------------
   TC_USER_PLANT_07 User cannot add plant
------------------------------- */
When('User tries to create plant', () => {
  const plantPayload = {
    id: 0,
    name: 'Unauthorized Plant',
    price: 100,
    quantity: 10,
    category: {},
  };

  cy.request({
    method: 'POST',
    url: '/api/plants/category/1',
    headers: { Authorization: `Bearer ${token}` },
    body: plantPayload,
    failOnStatusCode: false,
  }).then((res) => setResponse(res));
});

Then('response status should be 403', () => {
  expect(response.status).to.eq(403);
});

/* -----------------------------
   TC_USER_PLANT_08 Search by name
------------------------------- */
When('User searches plant by name {string}', (name: string) => {
  cy.request({
    method: 'GET',
    url: `/api/plants/paged?name=${encodeURIComponent(name)}&page=0&size=100`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});



Then('response should contain plants', () => {
  expect(response.body).to.have.property('content').and.to.be.an('array');
  expect(response.body.content.length).to.be.greaterThan(0);
});



/* -----------------------------
   TC_USER_PLANT_09 Filter plants by category
------------------------------- */
When('User filters plants by category {int}', (categoryId: number) => {
  cy.request({
    method: 'GET',
    url: `/api/plants/category/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => setResponse(res));
});

Then('all plants returned should belong to category {int}', (categoryId: number) => {
  expect(response.body).to.be.an('array');

  const invalidPlants = response.body.filter((p: any) => p.category.id !== categoryId);
  expect(invalidPlants).to.have.length(0, `Found plants not in category ${categoryId}`);
});

/* -----------------------------
   TC_USER_PLANT_10 Invalid search
------------------------------- */
When('User searches plant by invalid name {string}', (name: string) => {
  cy.request({
    method: 'GET',
    url: `/api/plants/paged?name=${encodeURIComponent(name)}&page=0&size=100`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});
Then('the search response should be empty', () => {
  expect(response.status).to.eq(200);
  expect(response.body)
    .to.have.property('content')
    .and.to.be.an('array')
    .and.have.length(0);
});


