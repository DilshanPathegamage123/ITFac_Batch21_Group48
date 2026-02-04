import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
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

Then('Dashboard should display Category summary section with summary information', () => {
  DashboardPage.categorySummarySection()
    .should('be.visible');
  DashboardPage.categorySummaryLeftStat()
    .should('be.visible')
    .find('.fw-bold.fs-5').should('exist');
  DashboardPage.categorySummaryRightStat()
    .should('be.visible')
    .find('.fw-bold.fs-5').should('exist');
  DashboardPage.categorySummaryButton()
    .should('be.visible')
    .should('contain', 'Manage Categories');
});

Then('Dashboard should display Plants summary section with summary information', () => {
  DashboardPage.plantsSummarySection()
    .should('be.visible');
  DashboardPage.plantsSummaryLeftStat()
    .should('be.visible')
    .find('.fw-bold.fs-5').should('exist');
  DashboardPage.plantsSummaryRightStat()
    .should('be.visible')
    .find('.fw-bold.fs-5').should('exist');
  DashboardPage.plantsSummaryButton()
    .should('be.visible')
    .should('contain', 'Manage Plants');
});

Then('Dashboard should display Sales summary section with summary information', () => {
  DashboardPage.salesSummarySection()
    .should('be.visible');
  DashboardPage.salesSummaryLeftStat()
    .should('be.visible')
    .find('.fw-bold.fs-5').should('exist');
  DashboardPage.salesSummaryRightStat()
    .should('be.visible')
    .find('.fw-bold.fs-5').should('exist');
  DashboardPage.salesSummaryButton()
    .should('be.visible')
    .should('contain', 'View Sales');
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

When('Admin navigates to Categories page', () => {
  DashboardPage.navigateToCategories();
  cy.url().should('include', '/ui/categories');
});

Then('Categories menu item should be highlighted in navigation menu', () => {
  DashboardPage.categoriesMenuItem()
    .should('be.visible');
});

Then('Categories menu item status should be active', () => {
  DashboardPage.categoriesMenuItemActive()
    .should('have.length.greaterThan', 0);
});

When('Admin navigates back to Dashboard page', () => {
  DashboardPage.navigateToDashboard();
  cy.url().should('include', '/ui/dashboard');
});