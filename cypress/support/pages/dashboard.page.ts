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

  categorySummaryLeftStat() {
    return this.categorySummarySection().find('.d-flex.justify-content-between > div').first();
  }

  categorySummaryRightStat() {
    return this.categorySummarySection().find('.d-flex.justify-content-between > div.text-end');
  }

  categorySummaryButton() {
    return this.categorySummarySection().find('a.btn');
  }

  plantsSummarySection() {
    return cy.get('.dashboard-card').eq(1);
  }

  plantsSummaryLeftStat() {
    return this.plantsSummarySection().find('.d-flex.justify-content-between > div').first();
  }

  plantsSummaryRightStat() {
    return this.plantsSummarySection().find('.d-flex.justify-content-between > div.text-end');
  }

  plantsSummaryButton() {
    return this.plantsSummarySection().find('a.btn');
  }

  salesSummarySection() {
    return cy.get('.dashboard-card').eq(2);
  }

  salesSummaryLeftStat() {
    return this.salesSummarySection().find('.d-flex.justify-content-between > div').first();
  }

  salesSummaryRightStat() {
    return this.salesSummarySection().find('.d-flex.justify-content-between > div.text-end');
  }

  salesSummaryButton() {
    return this.salesSummarySection().find('a.btn');
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

  categoriesMenuItem() {
    return cy.get('a.nav-link').contains('Categories');
  }

  categoriesMenuItemActive() {
    return cy.get('a.nav-link.active').contains('Categories');
  }

  navigateToCategories() {
    this.manageCategoriesButton().click();
  }

  navigateToDashboard() {
    this.dashboardMenuItem().click();
  }
}
export default new DashboardPage();