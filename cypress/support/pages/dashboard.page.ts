class DashboardPage {
    manageCategoriesButton() {
      return cy.contains('a', 'Manage Categories');
    }
  }
  
  export default new DashboardPage();
  