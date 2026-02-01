import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../support/pages/login.page';
import DashboardPage from '../../../support/pages/dashboard.page';
import CategoriesPage from '../../../support/pages/categories.page';

Given('Admin is logged in', () => {
  cy.fixture('users').then((users) => {
    LoginPage.visit();
    LoginPage.login(users.admin.username, users.admin.password);

    cy.url().should('include', '/ui/dashboard');
  });
});

Given('Admin is on the Dashboard page', () => {
  cy.url().should('include', '/ui/dashboard');
});

When('Admin clicks on Manage Categories button', () => {
  DashboardPage.manageCategoriesButton()
    .should('be.visible')
    .click();
});

Then('the URL should be {string}', (expectedUrl: string) => {
  CategoriesPage.verifyUrl(expectedUrl);
});

Then('Categories page title should be {string}', (expectedTitle: string) => {
  CategoriesPage.title()
    .should('be.visible')
    .and('have.text', expectedTitle);
});

Then('categories should exist in the system', () => {
  CategoriesPage.categoryRows()
    .its('length')
    .should('be.greaterThan', 0);
});

Then('at least one category should be displayed in the categories table', () => {
  CategoriesPage.categoryRows()
    .first()
    .should('be.visible');
});

Then('no categories should exist in the system', () => {
  CategoriesPage.categoryRows().should('have.length', 0);
});

Then('{string} message should be displayed in the categories table', (message: string) => {
  CategoriesPage.emptyStateMessage()
    .should('contain.text', message);
});

Then('Add Category button should be visible', () => {
  CategoriesPage.addCategoryButton()
    .should('be.visible');
});

Given('Non-Admin user is logged in', () => {
  cy.fixture('users').then((users) => {
    LoginPage.visit();
    LoginPage.login(users.user.username, users.user.password);

    cy.url().should('include', '/ui/dashboard');
  });
});

When('Non-Admin user navigates to Categories page', () => {
  cy.visit('/ui/categories');
});

Then('Add Category button should not be visible', () => {
  CategoriesPage.addCategoryButton()
    .should('not.exist');
});

// Functional checks: nothing happens when clicked
Then('all Edit buttons should be functionally disabled', () => {
  CategoriesPage.editButtons().each(($btn) => {
    // Save current URL
    cy.url().then((urlBefore) => {
      cy.wrap($btn).click({ force: true }); // Force click to bypass cursor styles
      cy.url().should('eq', urlBefore);    // URL should not change
    });
  });
});

Then('all Delete buttons should be functionally disabled', () => {
  CategoriesPage.deleteButtons().each(($btn) => {
    cy.url().then((urlBefore) => {
      cy.wrap($btn).click({ force: true });
      cy.url().should('eq', urlBefore);
      cy.get('#deleteModal').should('not.be.visible');
    });
  });
});

Then('all Edit buttons should be visually disabled', () => {
  CategoriesPage.editButtons().each(($btn) => {
    cy.wrap($btn).should('be.disabled');
  });
});

Then('all Delete buttons should be visually disabled', () => {
  CategoriesPage.deleteButtons().each(($btn) => {
    cy.wrap($btn).should('be.disabled');
  });
});


