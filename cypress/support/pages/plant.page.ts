class PlantPage {
  verifyUrl(expectedUrl: string) {
    cy.url().should('include', expectedUrl);
  }

  checkAddPlantButtonNotVisible() {
    cy.contains('a', 'Add Plant').should('not.exist');
  }

  checkAccessDeniedMessage() {
    cy.contains(/forbidden|access denied|not authorized/i).should('be.visible');
  }
}

export default new PlantPage();
