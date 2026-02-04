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



  addCategory(name: string) {
    cy.get('[name="name"]').clear().type(name);
    // Optionally add parent category here if needed
    this.save();
  }

  save() {
    cy.contains('Save').click();
  }

   errorMessage() {
    return cy.get('.error-message'); // replace with correct selector
  }

  search(name: string) {
    cy.get('input[name="name"]').clear().type(name);
    cy.contains('Search').click();
  }

  reset() {
    return cy.contains('Reset').click();
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

  shouldBeSortedByName() {
  cy.get('tbody tr td:first-child').then(($cells) => {
    const names = [...$cells].map(el => el.innerText.trim());
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).to.deep.equal(sorted);
  });
}

  rowsShouldMatchParent(parent: string) {
  cy.get('tbody tr').each(($row) => {
    cy.wrap($row).should('contain.text', parent);
  });
}

}




export default new CategoriesPage();
