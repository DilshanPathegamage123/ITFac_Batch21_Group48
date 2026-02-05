import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let apiToken: string;
let apiResponse: any;

Given('Admin has a valid API token', () => {
  cy.fixture('users').then((users) => {
    cy.request('POST', '/api/auth/login', {
      username: users.admin.username,
      password: users.admin.password,
    }).then((res) => {
      expect(res.status).to.eq(200);
      apiToken = res.body.token;
      expect(apiToken).to.not.be.empty;
    });
  });
});

// --- Admin plant list retrieval ---
When('Admin sends GET request to Plant List API', () => {
  cy.request({
    method: 'GET',
    url: '/api/plants',
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('Response should contain plant list', () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an('array');
  expect(apiResponse.body.length).to.be.greaterThan(0);
});

// --- Admin pagination ---
When('Admin sends GET request with pagination', () => {
  cy.request({
    method: 'GET',
    url: '/api/plants?page=0&size=5',
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('Response status should be {int}', (status: number) => {
  expect(apiResponse.status).to.eq(status);
});

Then('Response should contain paginated plant data', () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.have.property('content');
  expect(apiResponse.body).to.have.property('totalPages');
  expect(apiResponse.body).to.have.property('totalElements');
});

// --- Admin search and filter support ---
When('Admin searches plants by name {string} via API', (name: string) => {
  cy.request({
    method: 'GET',
    url: `/api/plants?name=${name}`,
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('Response should contain matching plant records', () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an('array');
  expect(apiResponse.body.length).to.be.greaterThan(0);

  const searchTerm = 'plant';
  const invalidPlants = apiResponse.body.filter(
    (plant: any) => !plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (invalidPlants.length > 0) {
    throw new Error(
      `Search results contain records that do not match the search term "${searchTerm}": ` +
        invalidPlants.map((p: any) => p.name).join(', ')
    );
  }
});

// --- Admin filter by category ---
When('Admin filters plants by category ID {int} via API', (categoryId: number) => {
  cy.request({
    method: 'GET',
    url: `/api/plants?categoryId=${categoryId}`,
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('Response should contain plants of selected category', () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an('array');
  apiResponse.body.forEach((plant: any) => {
    expect(plant.categoryId).to.eq(3);
  });
});

// --- Admin sort support ---
When('Admin sorts plants by {string} via API', (field: string) => {
  cy.request({
    method: 'GET',
    url: `/api/plants?sortField=${field}&sortDir=asc`,
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('Plants should be sorted by {string} ascending', (field: string) => {
  const values = apiResponse.body.map((p: any) => p[field]);
  const sorted = [...values].sort((a, b) => (typeof a === 'number' ? a - b : a.localeCompare(b)));
  expect(values).to.deep.equal(sorted);
});

// -------------------- User --------------------

Given('User has a valid API token', () => {
  cy.fixture('users').then((users) => {
    cy.request('POST', '/api/auth/login', {
      username: users.user.username,
      password: users.user.password,
    }).then((res) => {
      expect(res.status).to.eq(200);
      apiToken = res.body.token;
      expect(apiToken).to.not.be.empty;
    });
  });
});

When('User sends GET request to Plant List API', () => {
  cy.request({
    method: 'GET',
    url: '/api/plants',
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('User receives plant list', () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an('array');
  expect(apiResponse.body.length).to.be.greaterThan(0);
});

When('User tries to add a plant via API', () => {
  cy.request({
    method: 'POST',
    url: '/api/plants',
    headers: { Authorization: `Bearer ${apiToken}` },
    failOnStatusCode: false,
    body: {
      name: 'Test Plant',
      price: 10,
      quantity: 5,
      categoryId: 1,
    },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('API should return 403 Forbidden', () => {
  expect(apiResponse.status).to.eq(403);
});

When('User searches plants by name {string} via API', (name: string) => {
  cy.request({
    method: 'GET',
    url: `/api/plants?name=${name}`,
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('API returns matching plants', () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an('array');
  expect(apiResponse.body.length).to.be.greaterThan(0);
});

When('User searches plants with invalid name {string} via API', (name: string) => {
  cy.request({
    method: 'GET',
    url: `/api/plants?name=${name}`,
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('API returns empty plant list', () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an('array');
  expect(apiResponse.body.length).to.eq(0);
});

When('User filters plants by category ID {int} via API', (categoryId: number) => {
  cy.request({
    method: 'GET',
    url: `/api/plants?categoryId=${categoryId}`,
    headers: { Authorization: `Bearer ${apiToken}` },
  }).then((res) => {
    apiResponse = res;
  });
});

Then('API returns filtered plant list', () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an('array');
  apiResponse.body.forEach((plant: any) => {
    expect(plant.categoryId).to.eq(3);
  });
});
