class PlantsPage {
  verifyUrl(expectedUrl: string) {
    cy.url().should('include', expectedUrl);
  }

  checkAddPlantButtonNotVisible() {
    cy.contains('a', 'Add a Plant').should('not.exist');
  }

  checkAccessDeniedMessage() {
    cy.contains(/forbidden|access denied|not authorized/i).should('be.visible');
  }

  title() {
    return cy.contains('h3', 'Plants');
  }
  addPlantButton() {
    return cy.contains('Add Plant');
  }
  editButtons() {
    return cy.get('[title="Edit"]');
  }

  deleteButtons() {
    return cy.get('[title="Delete"]');
  }

  lowStockBadges() {
    return cy.get('span.badge.bg-danger.ms-2').contains('Low');
  }

  nameHeader() {
    return cy.contains('a', 'Name');
  }

  nameCells() {
    return cy.get('tbody tr td:nth-child(2)');
  }
  searchInput() {
    return cy.get('input[name="name"]');
  }

  searchButton() {
    return cy.contains('Search');
  }

  plantTableRows() {
    return cy.get('tbody tr');
  }
}

export default new PlantsPage();
