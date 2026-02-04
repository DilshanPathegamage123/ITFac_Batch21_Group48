class AddCategoryPage {
  addCategory(name: string) {
    cy.get('[name="name"]').clear().type(name);
    this.save();
  }

  save() {
    cy.contains('Save').click();
  }
}

export default new AddCategoryPage();
