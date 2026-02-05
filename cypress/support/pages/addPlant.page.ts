class AddPlantPage {
  verifyUrl(expectedUrl: string) {
    cy.url().should('include', expectedUrl);
  }

  pageTitle() {
    return cy.get('h3');
  }

  plantNameInput() {
    return cy.get('#name');
  }

  categorySelect() {
    return cy.get('#categoryId');
  }

  priceInput() {
    return cy.get('#price');
  }

  quantityInput() {
    return cy.get('#quantity');
  }

  saveButton() {
    return cy.get('button.btn-primary');
  }

  cancelButton() {
    return cy.get('a.btn-secondary');
  }

  getValidationErrorForField(fieldId: string) {
    return cy.get(`#${fieldId}`).siblings('.text-danger');
  }

  getAllValidationErrors() {
    return cy.get('.text-danger');
  }

  fillPlantForm(plantName: string, categoryId: string, price: string, quantity: string) {
    this.plantNameInput().clear().type(plantName);
    this.categorySelect().select(categoryId);
    this.priceInput().clear().type(price);
    this.quantityInput().clear().type(quantity);
  }

  submitForm() {
    this.saveButton().click();
  }

  clickCancel() {
    this.cancelButton().click();
  }
}

export default new AddPlantPage();