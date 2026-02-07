import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import AddPlantPage from '../../../support/pages/addPlant.page';
import DashboardPage from '../../../support/pages/dashboard.page';
import PlantsPage from '../../../support/pages/plants.page';

// Admin User Scenarios
Then('Admin is on Add Plant page {string}', (expectedUrl: string) => {
  cy.visit(expectedUrl);
  AddPlantPage.verifyUrl(expectedUrl);
});

When('Admin clicks Cancel button on Add Plant page', () => {
  AddPlantPage.clickCancel();
});

Then(
  'User is navigated back to Plants list page {string} and no new plant is created; entered data is discarded',
  (expectedUrl: string) => {
    AddPlantPage.verifyUrl(expectedUrl);
    cy.url().should('not.include', '/ui/plants/add');
  }
);

Then(
  'Validation errors appear in red below each field: "Plant name is required", "Price is required", "Quantity is required", "Category is required"',
  () => {
    AddPlantPage.plantNameInput().should('be.visible');
    AddPlantPage.categorySelect().should('be.visible');
    AddPlantPage.priceInput().should('be.visible');
    AddPlantPage.quantityInput().should('be.visible');

    // Check for validation error messages using .text-danger class
    AddPlantPage.getValidationErrorForField('name').should('contain', 'Plant name is required');
    AddPlantPage.getValidationErrorForField('categoryId').should('contain', 'Category is required');
    AddPlantPage.getValidationErrorForField('price').should('contain', 'Price is required');
    AddPlantPage.getValidationErrorForField('quantity').should('contain', 'Quantity is required');
  }
);

When('Admin leaves all fields empty on Add Plant page', () => {
  AddPlantPage.plantNameInput().clear();
  AddPlantPage.categorySelect().select('');
  AddPlantPage.priceInput().clear();
  AddPlantPage.quantityInput().clear();
});

When('Admin clicks Save button', () => {
  AddPlantPage.submitForm();
});

Then(
  'Validation error "Plant name must be between 3 and 25 characters" appears in red below Plant Name field',
  () => {
    AddPlantPage.getValidationErrorForField('name').should(
      'contain',
      'Plant name must be between 3 and 25 characters'
    );
  }
);

When('Admin enters Plant Name with 2 characters \\(e.g., "AB")', () => {
  AddPlantPage.plantNameInput().clear().type('AB');
});

When('Admin fills other fields with valid data', () => {
  AddPlantPage.categorySelect().find('option').eq(1).then(($option) => {
    const value = $option.val() as string;
    AddPlantPage.categorySelect().select(value);
  });
  
  AddPlantPage.priceInput().clear().type('50');
  AddPlantPage.quantityInput().clear().type('20');
});

Then('Admin is on Add Plant page', () => {
  AddPlantPage.pageTitle().should('contain', 'Add Plant');
});

Then('Leave all fields empty', () => {
  AddPlantPage.plantNameInput().clear();
  AddPlantPage.categorySelect().select('');
  AddPlantPage.priceInput().clear();
  AddPlantPage.quantityInput().clear();
});

Then('Click Save button', () => {
  AddPlantPage.submitForm();
});

Then('Observe validation messages', () => {
  cy.get('.invalid-feedback').should('have.length.greaterThan', 0);
});

Then('Navigate to Add Plant page', () => {
  cy.visit('/ui/plants/add');
});

Then('Enter Plant Name with 2 characters \\(e.g., "AB")', () => {
  AddPlantPage.plantNameInput().clear().type('AB');
});

Then('Fill Category, Price \\(>0), Quantity \\(>0)', () => {
  AddPlantPage.categorySelect().select('4');
  AddPlantPage.priceInput().clear().type('50');
  AddPlantPage.quantityInput().clear().type('20');
});

Then('Click Save button', () => {
  AddPlantPage.submitForm();
});

Then('Observe validation message', () => {
  cy.get('.invalid-feedback').should('be.visible');
});
/* -----------------------------
   TC_ADMIN_PLANT_01 Admin opens Plant List (Pass)
------------------------------- */
When('Admin clicks {string}', (text: string) => {
  if (text === 'Manage Plants') {
    DashboardPage.managePlantsButton().should('be.visible').click();
  }
});

Then('Plant List page should load', (expectedUrl: string) => {
  PlantsPage.verifyUrl(expectedUrl);
  PlantsPage.title().should('be.visible');
});

/* -----------------------------
   TC_ADMIN_PLANT_02 Add Plant button visible (fail) 
------------------------------- */

Given('Admin is on Plant List page', (expectedUrl: string) => {
  cy.fixture('users').then((users) => {
    cy.visit('/ui/plants');
    PlantsPage.verifyUrl(expectedUrl);
  });
});

Then('{string} button should be visible', (btn: string) => {
  cy.contains(btn).should('be.visible');
});

/* -----------------------------
   TC_ADMIN_PLANT_03 Verify Edit and Delete actions are available for Admin (pass) 
------------------------------- */
Then('Edit and Delete buttons should be visible for each plant', () => {
  PlantsPage.editButtons().should('have.length.greaterThan', 0);
  PlantsPage.deleteButtons().should('have.length.greaterThan', 0);

  PlantsPage.editButtons().each(($btn) => {
    cy.wrap($btn).should('be.visible').and('not.have.class', 'disabled');
  });

  PlantsPage.deleteButtons().each(($btn) => {
    cy.wrap($btn).should('be.visible').and('not.have.class', 'disabled');
  });
});

/* -----------------------------
   TC_ADMIN_PLANT_04 Verify Low stock badge display (pass) 
------------------------------- */
Then('Low stock badge should be displayed', () => {
  PlantsPage.lowStockBadges().should('be.visible');
});

/* -----------------------------
   TC_ADMIN_PLANT_05 Verify sorting functionality (pass) 
------------------------------- */
When('Admin clicks Name column', () => {
  PlantsPage.nameHeader().click();
});
Then('Plants should be sorted by Name in ascending order', () => {
  const names: string[] = [];
  PlantsPage.nameCells()
    .each(($cell) => {
      names.push($cell.text().trim());
    })
    .then(() => {
      const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sortedNames);
    });
});

Then('Plants should be sorted by {word} order', (order: string) => {
  const names: string[] = [];

  PlantsPage.nameCells()
    .each(($cell) => {
      names.push($cell.text().trim());
    })
    .then(() => {
      const sortedNames = [...names].sort((a, b) =>
        order === 'ascending' ? a.localeCompare(b) : b.localeCompare(a)
      );
      expect(names).to.deep.equal(sortedNames);
    });
});
/* -----------------------------
   TC_ADMIN_PLANT_06 Search plant by full name with spaces (expected to fail)
------------------------------- */

When('Admin searches for plant {string}', (plantName: string) => {
  cy.get('input[name="name"]', { timeout: 10000 }).should('be.visible').clear().type(plantName);

  cy.contains('Search').click();
});

Then('plant {string} should be visible in the results', (plantName: string) => {
  cy.get('tbody tr').should('have.length.greaterThan', 0);
  cy.get('tbody').contains(plantName).should('be.visible');
});

// Non-Admin User Scenarios
When('Non-Admin user navigates to Plants list page {string}', (url: string) => {
  cy.visit(url);
});

Then('Add Plant button is not visible on the page', () => {
  PlantsPage.checkAddPlantButtonNotVisible();
});

When('Non-Admin user directly navigates to {string} in browser', (url: string) => {
  cy.visit(url, { failOnStatusCode: false });
});

Then('User is redirected to 403 Forbidden page', () => {
  cy.url().should('include', '/ui/403');
});

Then('Access denied message is displayed', () => {
  PlantsPage.checkAccessDeniedMessage();
});

/* -----------------------------
   TC_ADMIN_PLANT_01 Verify sorting functionality (pass) 
------------------------------- */
When('user clicks {string}', (text: string) => {
  if (text === 'Manage Plants') {
    DashboardPage.managePlantsButton().should('be.visible').click();
  }
});
Then('Plant List page should load for User', (expectedUrl: string) => {
  PlantsPage.verifyUrl(expectedUrl);
  PlantsPage.title().should('be.visible');
});

/* -----------------------------
   TC_ADMIN_PLANT_02 Add Plant hidden for User  (pass) 
------------------------------- */
Given('User is on Plant List page', () => {
  cy.fixture('users').then((users) => {
    cy.visit('/ui/plants');
  });
});
Then('{string} button should not be visible', (btn: string) => {
  cy.contains(btn).should('not.exist');
});
/* -----------------------------
   TC_ADMIN_PLANT_03 Verify Edit and Delete actions are hidden for User (pass) 
------------------------------- */
Then('Edit and Delete actions should not be visible', () => {
  cy.get('.edit').should('not.exist');
  cy.get('.delete').should('not.exist');
});
/* -----------------------------
   TC_ADMIN_PLANT_04 Verify plant search functionality for User (fail) 
------------------------------- */
When('User searches for plant {string}', (plantName: string) => {
  cy.get('input[name="name"]').clear().type(plantName);
  cy.contains('Search').click();
});

Then('Matching plant records should be displayed', (plantName: string) => {
  cy.get('tbody').contains('td', plantName).should('be.visible');
});

/* -----------------------------
   TC_ADMIN_PLANT_05 Verify "No plants found" message (pass) 
------------------------------- */
Then('"No plants found" message should be displayed', () => {
  cy.contains('No plants found').should('be.visible');
});
