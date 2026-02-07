class SalesPage {
  verifyUrl() {
    cy.url().should('include', '/ui/sales');
  }

  salesRows() {
    return cy.get('table tbody tr');
  }

  sellPlantButton() {
    return cy.contains('a,button', 'Sell Plant');
  }

  tableHeader(header: string) {
    return cy.contains('th', header);
  }

  actionsColumn() {
    return cy.contains('th', 'Actions');
  }

  deleteButtons() {
    return cy.get('table tbody tr button');
  }
}

export default new SalesPage();
