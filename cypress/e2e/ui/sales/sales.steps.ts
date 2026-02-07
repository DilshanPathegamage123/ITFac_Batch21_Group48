import { Before, After, Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../support/pages/login.page';
import DashboardPage from '../../../support/pages/dashboard.page';
import SalesPage from '../../../support/pages/sales.page';
import SellPlantPage from '../../../support/pages/sellPlant.page';

let createdSaleTimestamp: string | null = null;

Before(() => {
  cy.visit('/ui/login');
});

After(() => {
  if (createdSaleTimestamp) {
    cy.visit('/ui/sales');

    SalesPage.salesRows().each(($row) => {
      cy.wrap($row)
        .find('td')
        .eq(3)
        .invoke('text')
        .then((text) => {
          if (text.trim() === createdSaleTimestamp) {
            cy.wrap($row).find('button').click();
          }
        });
    });

    createdSaleTimestamp = null;
  }
});

Given('application is running', () => {
  cy.url().should('include', '/ui/login');
});

Given('user is logged in as Admin', () => {
  cy.fixture('users').then(({ admin }) => {
    LoginPage.login(admin.username, admin.password);
    cy.url().should('include', '/ui/dashboard');
  });
});

Given('user is logged in as User', () => {
  cy.fixture('users').then(({ user }) => {
    LoginPage.login(user.username, user.password);
    cy.url().should('include', '/ui/dashboard');
  });
});

When('user clicks Sales menu', () => {
  DashboardPage.manageSalesButton().click();
});

When('user is on Sales page', () => {
  cy.visit('/ui/sales');
});

When('user is on Sell Plant page', () => {
  cy.visit('/ui/sales/new');
});


When('Admin clicks Sell Plant button', () => {
  SalesPage.sellPlantButton().click();
});

When('Admin submits empty Sell Plant form', () => {
  SellPlantPage.submitEmptyForm();
});

When('Admin creates a sale with plant {int} and quantity {int}', (plant: number, qty: number) => {
  SellPlantPage.sellPlant(plant, qty.toString());

  SalesPage.salesRows()
    .first()
    .within(() => {
      cy.get('td')
        .eq(3)
        .invoke('text')
        .then((text) => {
          createdSaleTimestamp = text.trim();
        });
    });
});

When('Admin deletes the first sale', () => {
  SalesPage.salesRows()
    .first()
    .within(() => {
      cy.get('td')
        .eq(3)
        .invoke('text')
        .then((text) => {
          createdSaleTimestamp = text.trim();
        });

      cy.get('button').click();
    });
});

When('Admin selects a plant', () => {
  SellPlantPage.plantDropdown().select(1);
});

When('Admin enters quantity as {int}', (qty: number) => {
  SellPlantPage.quantityInput().clear().type(qty.toString());
});

When('Admin submits Sell Plant form', () => {
  SellPlantPage.sellButton().click();
});

Then('Sales page should load successfully', () => {
  SalesPage.verifyUrl();
  ['Plant', 'Quantity', 'Total Price', 'Sold At'].forEach((header) => {
    SalesPage.tableHeader(header).should('be.visible');
  });
});

Then('Sales page should load successfully for user', () => {
  SalesPage.verifyUrl();
  ['Plant', 'Quantity', 'Total Price', 'Sold At'].forEach((header) => {
    SalesPage.tableHeader(header).should('be.visible');
  });
});

Then('Sell Plant button should be visible and enabled', () => {
  SalesPage.sellPlantButton().should('be.visible').and('not.be.disabled');
});

Then('Sell Plant page should be displayed', () => {
  cy.url().should('include', '/ui/sales/new');
});

Then('quantity validation error should be displayed', () => {
  SellPlantPage.validationMessage().should('be.visible');
});

Then('new sale should appear in sales table', () => {
  expect(createdSaleTimestamp).to.not.be.null;
});

Then('sale should be deleted successfully', () => {
  cy.contains('Sale deleted successfully').should('be.visible');
});

Then('deleted sale should no longer appear in the table', () => {
  cy.get('table tbody').should('not.contain', createdSaleTimestamp);
});

Then('Sell Plant button should not be visible', () => {
  SalesPage.sellPlantButton().should('not.exist');
});

Then('Delete button should not be visible', () => {
  SalesPage.deleteButtons().should('not.exist');
});

When('User navigates directly to Sell Plant page', () => {
  cy.visit('/ui/sales/new', { failOnStatusCode: false });
});

Then('access should be denied', () => {
  cy.contains('403').should('be.visible');
});

Then('sales records should be displayed correctly', () => {
  SalesPage.salesRows().should('have.length.greaterThan', 0);
});
