import { Then } from '@badeball/cypress-cucumber-preprocessor';
import DashboardPage from '../../../support/pages/dashboard.page';

Then('User is redirected to Dashboard page {string}', (expectedUrl: string) => {
  DashboardPage.verifyUrl(expectedUrl);
});

Then('Dashboard page loads successfully', () => {
  DashboardPage.pageTitle()
    .should('be.visible');
  DashboardPage.summaryInformation()
    .should('be.visible');
});

Then('Admin user is logged in', () => {
  cy.url().should('include', '/ui/dashboard');
});

Then('Dashboard should display Category summary section', () => {
  DashboardPage.categorySummarySection()
    .should('be.visible');
});

Then('Dashboard should display Plants summary section', () => {
  DashboardPage.plantsSummarySection()
    .should('be.visible');
});

Then('Dashboard should display Sales summary section', () => {
  DashboardPage.salesSummarySection()
    .should('be.visible');
});

Then('All three summary sections should display summary information', () => {
  DashboardPage.summaryCards()
    .should('have.length.greaterThan', 0)
    .each(($card) => {
      cy.wrap($card)
        .should('be.visible');
    });
});

Then('Admin user is logged in and on Dashboard', () => {
  cy.url().should('include', '/ui/dashboard');
});

Then('Dashboard menu item should be highlighted in navigation menu', () => {
  DashboardPage.dashboardMenuItem()
    .should('be.visible');
});

Then('Dashboard menu item status should be active', () => {
  DashboardPage.dashboardMenuItemActive()
    .should('have.length.greaterThan', 0);
});