class AddCategoryPage {

  addCategory(name: string) {
    cy.get('[name="name"]').clear().type(name);
    this.save();
  }

  save() {
    return cy.contains('Save').click();
  }

  heading() {
    return cy.get('h3');
  }

  nameInput() {
    return cy.get('[name="name"]');
  }

  updateCategoryName(name: string) {
  this.nameInput().clear().type(name);
  this.save();
  }

}

export default new AddCategoryPage();
