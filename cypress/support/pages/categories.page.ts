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
}
export default new CategoriesPage();
