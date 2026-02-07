import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { apiLogin } from "../../../support/api/auth";
import { setResponse, response, token } from "../common/common.steps";

let categoryIdToDelete: number;
let createdCategoryName: string;
let createdCategoryId: number;
let categoryIdToUpdate: number;
let updatedCategoryName: string;
let categoryNameToRetrieve: string;
let categoryIdToRetrieve: number;
let subCategoryParentId: number;
let nonExistingId: number;
let attemptedCategoryName: string;

// Precondition: At least one category exists
Given("at least one category exists in the system", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.body.length).to.be.greaterThan(0);
    setResponse(res);
  });
});

// Precondition: At least one matching category exists
Given("there is at least one matching category", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    qs: { name: "Flower" },
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.body.some((cat: any) => cat.name.includes("Flower"))).to.be.true;
    setResponse(res);
  });
});

// Precondition: Category to be deleted should exists
Given("Category which is going to be deleted exists in the system", () => {
  const categoryName = `CAT${Date.now().toString().slice(-4)}`;

  cy.request({
    method: "POST",
    url: "/api/categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      name: categoryName,
      parent: null,
      subCategories: [],
    },
  }).then((res) => {
    expect(res.status).to.eq(201);
    categoryIdToDelete = res.body.id;
  });
});

// Precondition: Existing category for non-admin delete test
Given("an existing category is available for non-admin delete test", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.body.length).to.be.greaterThan(0);
    categoryIdToDelete = res.body[0].id; 
  });
});

// Step to dynamically compute a non-existing ID
Given("compute a non-existing category ID", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    const existingIds = res.body.map((c: any) => c.id);
    const maxId = Math.max(...existingIds);
    categoryIdToDelete = maxId + 1;
  });
});

// Precondition: Existing category for non-admin update test
Given("an existing category is available for update", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body.length).to.be.greaterThan(0);

    categoryIdToUpdate = res.body[0].id;
  });
});

// Main requests
When("user sends a GET request to retrieve all categories", () => {
  cy.request({
    method: "GET",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setResponse(res);
  });
});

When(
  "user sends a GET request to retrieve categories with name {string}",
  (name: string) => {
    cy.request({
      method: "GET",
      url: "/api/categories",
      qs: { name },
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setResponse(res);
    });
  }
);

When("user sends DELETE request to delete the category", () => {
  cy.request({
    method: "DELETE",
    url: `/api/categories/${categoryIdToDelete}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

When("user sends a GET request to retrieve paginated categories", () => {
  cy.request({
    method: "GET",
    url: "/api/categories/page",
    qs: {
      page: 0,
      size: 10,
      sortField: "id",
      sortDir: "asc",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    setResponse(res);
  });
}
);

When(
  "unauthenticated user sends {string} request to {string}",
  (method: string, endpoint: string) => {
    cy.request({
      method,
      url: endpoint,
      failOnStatusCode: false,
    }).then((res) => {
      setResponse(res);
    });
  }
);

When(
  "user sends a GET request to retrieve paginated categories sorted by parentName {string}",
  (sortDir: string) => {
    cy.request({
      method: "GET",
      url: "/api/categories/page",
      qs: {
        page: 0,
        size: 10,
        sortField: "parentName",
        sortDir,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setResponse(res);
    });
  }
);



// Main request - Create category
When("user sends a POST request to create a new main category", () => {
createdCategoryName = `CAT${Cypress._.random(100, 999)}`;

  cy.request({
    method: "POST",
    url: "/api/categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      name: createdCategoryName,
      parent: null,
      subCategories: [],
    },
  }).then((res) => {
    setResponse(res);
    createdCategoryId = res.body.id;
  });
});

//Update Category
Given("Category which is going to be updated exists in the system", () => {
  const name = `CAT${Cypress._.random(100, 999)}`;

  cy.request({
    method: "POST",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
    body: {
      name,
      parent: null,
      subCategories: [],
    },
  }).then((res) => {
    expect(res.status).to.eq(201);
    categoryIdToUpdate = res.body.id;
  });
});


When("user sends PUT request to update the category", () => {
  updatedCategoryName = `UPD${Cypress._.random(100, 999)}`;

  cy.request({
    method: "PUT",
    url: `/api/categories/${categoryIdToUpdate}`,
    headers: { Authorization: `Bearer ${token}` },
    body: {
      name: updatedCategoryName,
      parentId: null,
    },
  }).then((res) => {
    setResponse(res);
  });
});


// Precondition: Create a category for retrieval
Given("a category exists in the system", () => {
  categoryNameToRetrieve = `CAT${Cypress._.random(100, 999)}`;

  cy.request({
    method: "POST",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
    body: {
      name: categoryNameToRetrieve,
      parent: null,
      subCategories: [],
    },
  }).then((res) => {
    expect(res.status).to.eq(201);
    categoryIdToRetrieve = res.body.id;
  });
});

When("user sends a GET request to retrieve the category by ID", () => {
  cy.request({
    method: "GET",
    url: `/api/categories/${categoryIdToRetrieve}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setResponse(res);
  });
});



// Sub-category precondition
Given("at least one sub-category exists in the system", () => {
  cy.log("Using existing sub-categories already created by admin");
});


When("user sends a GET request to retrieve all sub-categories", () => {
  cy.request({
    method: "GET",
    url: "/api/categories/sub-categories",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    setResponse(res);
  });
});


// Negative test: Update non-existent category
When("user sends PUT request to update non-existent category", () => {
  nonExistingId = Date.now();

  cy.request({
    method: "PUT",
    url: `/api/categories/${nonExistingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      name: "UpdatedName",
      parentId: null,
    },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});



//User
// Attempt to create category without admin privileges
When("user sends a POST request to create a new category", () => {
  attemptedCategoryName = `CAT_${Cypress._.random(1000, 9999)}`;

  cy.request({
    method: "POST",
    url: "/api/categories",
    headers: { Authorization: `Bearer ${token}` },
    body: {
      id: 0,
      name: attemptedCategoryName,
      parent: null,
      subCategories: [],
    },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});

// Attempt to update category without admin privileges
Given("Category with ID={int} exists", (categoryId: number) => {
  cy.request({
    method: "GET",
    url: `/api/categories/${categoryId}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false,
  }).then((res) => {
    expect(res.status).to.eq(200);
  });
});

When("user sends a PUT request to update the category", () => {
  cy.request({
    method: "PUT",
    url: `/api/categories/${categoryIdToUpdate}`,
    headers: { Authorization: `Bearer ${token}` },
    body: {
      name: `UPDATED_${Date.now()}`,
      parentId: null,
    },
    failOnStatusCode: false,
  }).then((res) => {
    setResponse(res);
  });
});


Then("the response should contain only sub-categories", () => {
  expect(response.status).to.eq(200);
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.be.greaterThan(0);

  response.body.forEach((item: any) => {
    expect(item).to.have.property("id").that.is.a("number");
    expect(item).to.have.property("name").that.is.a("string");
    expect(item).to.have.property("parent").that.is.a("string");
    expect(item).to.have.property("subCategories").that.is.an("array");
  });
});


When("user sends GET request to retrieve all main categories", () => {
  cy.request({
    method: "GET",
    url: "/api/categories/main",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    setResponse(res);
  });
});

Given("no main categories exist in the system", () => {
  cy.request({
    method: "GET",
    url: "/api/categories/main",
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    res.body.forEach((cat: any) => {
      cy.request({
        method: "DELETE",
        url: `/api/categories/${cat.id}`,
        headers: { Authorization: `Bearer ${token}`
       },
      });
    });
  });
});




// Assertions

Then("the response should contain a list of categories", () => {
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.be.greaterThan(0);
});

Then("the response should contain matching categories", () => {
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.be.greaterThan(0);
});

Then("the response should be an empty array", () => {
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.eq(0);
});

Then("each category should have id, name, parent, and subCategories", () => {
  response.body.forEach((category: any) => {
    expect(category).to.have.all.keys("id", "name", "parent", "subCategories");
    expect(category.id).to.be.a("number");
    expect(category.name).to.be.a("string");
    expect(category.parent).to.be.a("string");
    expect(category.subCategories).to.be.an("array");
  });
});

Then("each category should have id, name, and parentName", () => {
  response.body.forEach((category: any) => {
    expect(category).to.have.all.keys("id", "name", "parentName");
    expect(category.id).to.be.a("number");
    expect(category.name).to.be.a("string");
    expect(category.parentName).to.be.a("string");
  });
});

Then("the response body should be empty", () => {
  expect(response.body).to.be.empty;
});

Then(
  "attempting to retrieve the deleted category should return 404",
  () => {
    cy.request({
      method: "GET",
      url: `/api/categories/${categoryIdToDelete}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  }
);

Then("the response should contain a paginated list of categories", () => {
  expect(response.body).to.be.an("object");

  // content validation
  expect(response.body).to.have.property("content");
  expect(response.body.content).to.be.an("array");
  expect(response.body.content.length).to.be.greaterThan(0);
  expect(response.body.content.length).to.be.at.most(10);

  // pagination metadata
  expect(response.body).to.have.property("pageable");
  expect(response.body).to.have.property("totalElements");
  expect(response.body).to.have.property("totalPages");
});

Then(
  "each paginated category should have id, name, and parentName",
  () => {
    response.body.content.forEach((category: any) => {
      expect(category).to.have.all.keys("id", "name", "parentName");
      expect(category.id).to.be.a("number");
      expect(category.name).to.be.a("string");
      expect(category.parentName).to.be.a("string");
    });
  }
);

When(
  "user sends a GET request to retrieve paginated categories with name {string}",
  (name: string) => {
    cy.request({
      method: "GET",
      url: "/api/categories/page",
      qs: {
        page: 0,
        size: 10,
        sortField: "id",
        sortDir: "asc",
        name,
      },
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setResponse(res);
    });
  }
);

Then(
  "all paginated categories' names should include {string}",
  (name: string) => {
    response.body.content.forEach((category: any) => {
      expect(category.name.toLowerCase()).to.include(name.toLowerCase());
    });
  }
);

Then("the paginated response content should be empty", () => {
  expect(response.body).to.have.property("content");
  expect(response.body.content).to.be.an("array");
  expect(response.body.content.length).to.eq(0);
});

Then(
  "the response body should contain {string}",
  (expectedMessage: string) => {
    const actualMessage = response.body.message || response.body.error || "";
    expect(actualMessage.toLowerCase()).to.include(expectedMessage.toLowerCase());
  }
);

Then(
  "the paginated categories should be sorted by parentName in ascending order",
  () => {
    const parentNames = response.body.content.map(
      (c: any) => c.parentName === "-" ? "" : c.parentName
    );

    const sorted = [...parentNames].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    expect(parentNames).to.deep.equal(sorted);
  }
);

Then(
  "the paginated categories should be sorted by parentName in descending order",
  () => {
    const parentNames = response.body.content.map(
      (c: any) => c.parentName === "-" ? "" : c.parentName
    );

    const sorted = [...parentNames]
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .reverse();

    expect(parentNames).to.deep.equal(sorted);
  }
);


//Admin
//Create category assertions
Then(
  "the response should contain the created category with id, name, parent, and subCategories",
  () => {
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.all.keys(
      "id",
      "name",
      "parent",
      "subCategories"
    );

    expect(response.body.id).to.be.a("number");
    expect(response.body.name).to.eq(createdCategoryName);
    expect(response.body.parent).to.be.null;
    expect(response.body.subCategories).to.be.an("array");
  }
);

afterEach(() => {
  if (createdCategoryId) {
    cy.request({
      method: "DELETE",
      url: `/api/categories/${createdCategoryId}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
  }
});


//Update category assertions
Then("the response should contain the updated category details", () => {
  expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("id").that.is.a("number");
  expect(response.body).to.have.property("name").that.is.a("string");

  // id and name should match the updated category
  expect(response.body.id).to.eq(categoryIdToUpdate);
  expect(response.body.name).to.eq(updatedCategoryName);

  // parent might be null or returned as parentId
  if ("parent" in response.body) {
    expect(response.body.parent).to.be.null;
  } else if ("parentId" in response.body) {
    expect(response.body.parentId).to.be.null;
  }

  // subCategories may not be returned
  if ("subCategories" in response.body) {
    expect(response.body.subCategories).to.be.an("array");
  }
});

//Retrieve category by ID assertions
Then("the response should contain the requested category details", () => {
  expect(response.status).to.eq(200);

  expect(response.body).to.include.keys(
    "id",
    "name",
    "parent",
    "subCategories"
  );

  expect(response.body.id).to.be.a("number");
  expect(response.body.name).to.be.a("string");
  expect(response.body.subCategories).to.be.an("array");
});

// Negative test assertions
Then(
  "the response body should contain error message {string}",
  (message: string) => {
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("error");
    expect(response.body).to.have.property("message");

    expect(response.body.message.toLowerCase()).to.include(
      message.toLowerCase()
    );
  }
);

// Assertion: response contains only sub-categories
Then("the also response should contain only sub-categories", () => {
  expect(response.status).to.eq(200);
  expect(response.body).to.be.an("array");
  expect(response.body.length).to.be.greaterThan(0);

  response.body.forEach((item: any) => {
    expect(item).to.have.property("id").that.is.a("number");
    expect(item).to.have.property("name").that.is.a("string");
    expect(item).to.have.property("parent").that.is.a("string");
    expect(item).to.have.property("subCategories").that.is.an("array");
  });
});


Then("the response should contain a list of main categories", () => {
  expect(response.status).to.eq(200);
  expect(response.body).to.be.an("array");

  response.body.forEach((cat: any) => {
    expect(cat).to.have.property("id");
    expect(cat).to.have.property("name");
    expect(cat).to.have.property("subCategories");

    expect(cat.id).to.be.a("number");
    expect(cat.name).to.be.a("string");
    expect(cat.subCategories).to.be.an("array");
  });
});


