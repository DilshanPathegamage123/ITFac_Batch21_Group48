class DashboardPage {
  verifyUrl(expectedUrl: string) {
    cy.url().should('include', expectedUrl);
  }

  pageTitle() {
    return cy.get('h3');
  }

  manageCategoriesButton() {
    return cy.contains('a', 'Manage Categories');
  }

  managePlantsButton() {
    return cy.contains('a', 'Manage Plants');
  }

  manageSalesButton() {
    return cy.contains('a', 'View Sales');
  }

  categorySummarySection() {
    return cy.get('.dashboard-card').first();
  }

  plantsSummarySection() {
    return cy.get('.dashboard-card').eq(1);
  }

  salesSummarySection() {
    return cy.get('.dashboard-card').eq(2);
  }

  summaryCards() {
    return cy.get('.dashboard-card');
  }

  summaryInformation() {
    return cy.get('.card-body');
  }

  navigationMenu() {
    return cy.get('.sidebar');
  }

  dashboardMenuItem() {
    return cy.get('a.nav-link').contains('Dashboard');
  }

  dashboardMenuItemActive() {
    return cy.get('a.nav-link.active').contains('Dashboard');
  }
}
export default new DashboardPage();