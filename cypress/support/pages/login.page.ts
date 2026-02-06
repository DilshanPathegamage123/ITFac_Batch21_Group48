class LoginPage {
    visit() {
      cy.visit('/ui/login');
    }
  
    usernameInput() {
      return cy.get('input[name="username"]');
    }
  
    passwordInput() {
      return cy.get('input[name="password"]');
    }
  
    loginButton() {
      return cy.get('button[type="submit"]');
    }
  
    login(username: string, password: string) {
      this.usernameInput().type(username);
      this.passwordInput().type(password);
      this.loginButton().click();
    }
  }
  
  export default new LoginPage();
  