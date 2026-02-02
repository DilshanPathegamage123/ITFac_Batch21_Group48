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
}

export default new PlantsPage();
