import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import AddPlantPage from '../../../support/pages/addPlant.page';
import PlantPage from '../../../support/pages/plant.page';

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
    AddPlantPage.getValidationErrorForField('name').should('contain', 'Plant name must be between 3 and 25 characters');
  }
);

When('Admin enters Plant Name with 2 characters \\(e.g., "AB")', () => {
  AddPlantPage.plantNameInput().clear().type('AB');
});

When('Admin fills other fields with valid data', () => {
  AddPlantPage.categorySelect().select('4');
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


// Non-Admin User Scenarios
When('Non-Admin user navigates to Plants list page {string}', (url: string) => {
  cy.visit(url);
});

Then('Add Plant button is not visible on the page', () => {
  PlantPage.checkAddPlantButtonNotVisible();
});

When('Non-Admin user directly navigates to {string} in browser', (url: string) => {
  cy.visit(url, { failOnStatusCode: false });
});

Then('User is redirected to 403 Forbidden page', () => {
  cy.url().should('include', '/ui/403');
});

Then('Access denied message is displayed', () => {
  PlantPage.checkAccessDeniedMessage();
});