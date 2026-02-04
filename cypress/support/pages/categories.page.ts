class CategoriesPage {
  verifyUrl(expectedUrl: string) {
    cy.url().should('include', expectedUrl);
  }

  title() {
    return cy.get('h3');
  }

  categoryTableBody() {
    return cy.get('table tbody');
  }

  categoryRows() {
    return cy.get('table tbody tr');
  }

  emptyStateMessage() {
    return cy.get('table tbody tr').contains('No category found');
  }

  addCategoryButton() {
    return cy.contains('a', 'Add A Category');
  }

  editButtons() {
    return cy.get('table tbody tr').find('a.btn-outline-primary'); 
  }

  deleteButtons() {
    return cy.get('table tbody tr').find('button.btn-outline-danger'); 
  }



    clickAddCategory() {
    cy.contains('Add A Category').click();
  }

  search(name: string) {
    cy.get('input[name="name"]').clear().type(name);
    cy.contains('Search').click();
  }

  reset() {
    cy.contains('Reset').click();
  }

  selectParent(parent: string) {
    cy.get('select[name="parentId"]').should('be.visible');
    cy.get('select[name="parentId"]').select(parent);
  }

  sortByName() {
    cy.contains('th', 'Name').click();
  }

  tableShouldContain(text: string) {
    cy.get('tbody').should('contain', text);
  }

  tableShouldHaveRows() {
    cy.get('tbody tr').its('length').should('be.greaterThan', 0);
  }
}



export default new CategoriesPage();
