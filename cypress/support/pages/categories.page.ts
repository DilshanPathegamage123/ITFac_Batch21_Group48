class CategoriesPage {
    verifyUrl() {
      cy.url().should('include', '/ui/categories');
    }
  
    title() {
      return cy.contains('h3', 'Categories');
    }
  }
  
  export default new CategoriesPage();
  