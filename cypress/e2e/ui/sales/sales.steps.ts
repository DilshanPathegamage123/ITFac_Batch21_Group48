import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../support/pages/login.page';
import DashboardPage from '../../../support/pages/dashboard.page';
import SalesPage from '../../../support/pages/sales.page';
import SellPlantPage from '../../../support/pages/sellPlant.page';

Given('application is running', () => {
  cy.visit('/ui/login');
  cy.url().should('include', '/ui/login');
});

Given('user is logged in as Admin', () => {
  cy.fixture('users').then((users) => {
    LoginPage.visit();
    LoginPage.login(users.admin.username, users.admin.password);
    cy.url().should('include', '/ui/dashboard');
  });
});

Given('user is logged in as User', () => {
  cy.fixture('users').then((users) => {
    LoginPage.visit();
    LoginPage.login(users.user.username, users.user.password);
    cy.url().should('include', '/ui/dashboard');
  });
});

When('user is on Sales page', () => {
  cy.visit('/ui/sales');
});

When('user is on Sell Plant page', () => {
  cy.visit('/ui/sales/new');
});

When('user clicks on Sales menu', () => {
  DashboardPage.manageSalesButton().click();
});

Then('Sales page should load successfully', () => {
  SalesPage.verifyUrl();
  SalesPage.tableHeader('Plant').should('be.visible');
  SalesPage.tableHeader('Quantity').should('be.visible');
  SalesPage.tableHeader('Total Price').should('be.visible');
  SalesPage.tableHeader('Sold At').should('be.visible');
  SalesPage.tableHeader('Actions').should('be.visible');
});

Then('Sales page should load successfully for user', () => {
  SalesPage.verifyUrl();
  SalesPage.tableHeader('Plant').should('be.visible');
  SalesPage.tableHeader('Quantity').should('be.visible');
  SalesPage.tableHeader('Total Price').should('be.visible');
  SalesPage.tableHeader('Sold At').should('be.visible');
});

Then('Sell Plant button should be visible and enabled', () => {
  SalesPage.sellPlantButton()
    .should('be.visible') 
    .and('not.have.attr', 'disabled');
});


When('Admin clicks Sell Plant button', () => {
  SalesPage.sellPlantButton().click();
});

Then('Sell Plant page should be displayed', () => {
  cy.url().should('include', '/ui/sales/new');
  SellPlantPage.sellButton().should('be.visible');
});

When('Admin submits Sell Plant form without entering data', () => {
  SellPlantPage.submitEmptyForm();
});

Then('quantity validation error should be displayed', () => {
  cy.contains('Quantity').should('be.visible');
  cy.url().should('include', '/ui/sales/new');
});

When('Admin selects a plant and enters valid quantity', () => {
  SellPlantPage.sellPlant(1, '1');
});

Then('newly created sale should appear in sales table', () => {
  cy.url().should('include', '/ui/sales');
  SalesPage.salesRows().should('have.length.greaterThan', 0);
});



When('User clicks Sales menu', () => {
  DashboardPage.manageSalesButton().click();
});

Then('Sales page should display correctly for User', () => {
  SalesPage.verifyUrl();
  SalesPage.tableHeader('Plant').should('be.visible');
  SalesPage.tableHeader('Quantity').should('be.visible');
  SalesPage.tableHeader('Total Price').should('be.visible');
  SalesPage.tableHeader('Sold At').should('be.visible');
  SalesPage.actionsColumn().should('not.exist');
});

Then('Sell Plant button should not be visible', () => {
  SalesPage.sellPlantButton().should('not.exist');
});

Then('Delete button should not be visible', () => {
  SalesPage.deleteButtons().should('not.exist');
});

When('User navigates directly to Sell Plant page', () => {
  cy.visit('/ui/sales/new');
});

Then('access should be denied', () => {
  cy.url().should('include', '403');
});

Then('sales records should be displayed correctly', () => {
  SalesPage.salesRows().each(($row) => {
    cy.wrap($row).within(() => {
      cy.contains(/.+/).should('be.visible');
    });
  });
});

let deletedSaleTimestamp = '';

When('Admin deletes the first sale on the current page', () => {
    SalesPage.salesRows()
      .first()
      .within(() => {
        cy.get('td')
          .eq(3)
          .invoke('text')
          .then((text) => {
            deletedSaleTimestamp = text.trim();
          });

        cy.get('td').last().find('button').click();
      });
});

Then('sale should be deleted successfully', () => {
  cy.contains('Sale deleted successfully').should('be.visible');
});

Then('deleted sale should no longer appear in the table', () => {
  cy.get('table tbody').should('not.contain', deletedSaleTimestamp);
});

When('Admin selects a plant', () => {
  SellPlantPage.plantDropdown().select(1);
});

When('Admin enters quantity as {int}', (quantity: number) => {
  SellPlantPage.quantityInput().clear().type(quantity.toString());
});

When('Admin submits Sell Plant form', () => {
  SellPlantPage.sellButton().click();
});

Then('validation message {string} should be displayed', (message: string) => {
  SellPlantPage.validationMessage().should('be.visible');
});

Then(
  'sorting should be available for Plant name, Quantity, Total price, and Sold date for user',
  () => {
    const headers = ['Plant', 'Quantity', 'Total Price', 'Sold At'];

    headers.forEach((header) => {
      cy.contains('th', header).should('be.visible').and('have.attr', 'aria-sort');
    });
  }
);

