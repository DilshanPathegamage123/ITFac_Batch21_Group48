class PlantsPage {
  verifyUrl() {
    cy.url().should('include', '/ui/plants');
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
}

export default new PlantsPage();
