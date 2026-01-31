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

Then('Admin should be navigated to Categories page', () => {
  CategoriesPage.verifyUrl();
  CategoriesPage.title().should('be.visible');
});
