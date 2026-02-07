import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../support/pages/login.page';
import DashboardPage from '../../../support/pages/dashboard.page';
import CategoriesPage from '../../../support/pages/categories.page';
import AddCategoryPage from '../../../support/pages/addCategory.page';

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
      cy.wrap($btn).click({ force: true }); 
      cy.url().should('eq', urlBefore); 
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

Given('Admin is on Categories page', () => {
  cy.visit('/ui/categories');
});

Given('User is logged in', () => {
  cy.fixture('users').then((users) => {
    LoginPage.visit();
    LoginPage.login(users.user.username, users.user.password);
  });
});

Given('User is on Categories page', () => {
  cy.visit('/ui/categories');
});




When('Admin clicks Add A Category button', () => {
  CategoriesPage.addCategoryButton()
    .should('be.visible')
    .click();
});

Then('URL should be {string}', (url: string) => {
  cy.url().should('include', url);
});

Then('page heading should be {string}', (expectedHeading: string) => {
  AddCategoryPage.heading()
    .should('be.visible')
    .and('have.text', expectedHeading);
});

When('Admin adds category {string}', (categoryName: string) => {
  // Click Add A Category
  CategoriesPage.addCategoryButton()
    .should('be.visible')
    .click();
  AddCategoryPage.addCategory(categoryName);
});

// Verify success message (you can use React Hot Toast or UI toast selector)
Then('success message should be visible', () => {
  cy.contains('Category created successfully')
  .should('be.visible');
});

// Verify new category appears in table
Then('table should contain {string}', (categoryName: string) => {
  CategoriesPage.categoryRows()
    .should('contain.text', categoryName);
});

When('Admin saves category without name', () => {
  CategoriesPage.addCategoryButton().click();
  cy.url().should('include', '/ui/categories/add');
  AddCategoryPage.save();
});

Then('error message should be visible', () => {
  cy.contains('Category name')
  .should('be.visible')
    .and('contain.text', 'Category name must be between 3 and 10 characters')
    .and('contain.text', 'Category name is required');
});


When(
  'Admin edits category {string} to {string}',
  (oldName: string, newName: string) => {

    // find row containing old category
    CategoriesPage.openEditFor(oldName);

    // ensure edit page opened
    cy.url().should('include', '/ui/categories/edit');

    // update name
    AddCategoryPage.updateCategoryName(newName);
  }
);

When('user searches using first category name', () => {
  CategoriesPage.categoryRows()
    .first()
    .find('td')
    .eq(1)
    .invoke('text')
    .then((text) => {
      const name = text.trim();
      cy.wrap(name).as('searchedCategory');
      CategoriesPage.search(name);
    });
});

When('user sorts by name', () => {
  CategoriesPage.sortByName();
});

Then('categories should be sorted', () => {
  CategoriesPage.shouldBeSortedByName();
});

When('user clicks reset', () => {
  CategoriesPage.reset();
});

Then('all categories should be visible', () => {
  CategoriesPage.tableShouldHaveRows();
});

Then('table should contain searched category', () => {
  cy.get('@searchedCategory').then((name) => {
    CategoriesPage.categoryRows()
      .should('contain.text', name);
  });
});

Then('at least one parent category exists', () => {
  CategoriesPage.parentOptions()
    .its('length')
    .should('be.greaterThan', 0);
});

When('user filters by an existing parent', () => {
  CategoriesPage.getFirstParentName().then((parentName) => {
    cy.wrap(parentName).as('selectedParent');
    CategoriesPage.selectParentByName(parentName);
  });
});

Then('results should match selected parent', () => {
  CategoriesPage.filteredRowsShouldExist();
});

When('Admin adds a new category', () => {
  const name = `CAT${Cypress._.random(100, 999)}`;
  cy.wrap(name).as('createdCategory'); // store for cleanup later
  CategoriesPage.addCategoryButton()
    .should('be.visible')
    .click();
  AddCategoryPage.addCategory(name);

  cy.contains('Category created successfully').should('be.visible');
  CategoriesPage.tableShouldContain(name);
});

Then('table should contain the created category', () => {
  cy.get('@createdCategory').then((name) => {
    CategoriesPage.tableShouldContain(String(name));
  });
});

When('Admin edits the created category to {string}', (newName: string) => {
  cy.get('@createdCategory').then((oldName) => {
    CategoriesPage.openEditFor(String(oldName));
    AddCategoryPage.updateCategoryName(newName);

    // Store the new name for verification
    cy.wrap(newName).as('createdCategory');
  });
});


afterEach(function () {
  const createdCategory = this.createdCategory;
  if (createdCategory) {
    cy.log(`Cleaning up category: ${createdCategory}`);

    cy.wrap(null).then(() => {
      try {
        CategoriesPage.openDeleteFor(createdCategory)
          .then(() => CategoriesPage.confirmDelete());
      } catch (err) {
        cy.log(`Cleanup failed for ${createdCategory}: ${(err as Error).message}`);
      }
    });
  }
});