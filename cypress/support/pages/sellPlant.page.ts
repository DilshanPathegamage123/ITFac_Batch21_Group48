class SellPlantPage {
  plantDropdown() {
    return cy.get('select[name="plantId"]');
  }

  quantityInput() {
    return cy.get('input[name="quantity"]');
  }

  sellButton() {
    return cy.contains('button', 'Sell');
  }

  submitEmptyForm() {
    this.sellButton().click();
  }

  sellPlant(plantIndex: number, quantity: string) {
    this.plantDropdown().select(plantIndex);
    this.quantityInput().clear().type(quantity);
    this.sellButton().click();
  }
  validationMessage() {
    return cy.contains('Quantity must be greater than 0');
  }
}

export default new SellPlantPage();
