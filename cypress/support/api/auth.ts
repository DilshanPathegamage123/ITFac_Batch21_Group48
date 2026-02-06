export const apiLogin = (role: "admin" | "user") => {
    return cy.fixture("users").then((users) => {
      const credentials = users[role];
  
      return cy.request({
        method: "POST",
        url: "/api/auth/login",
        body: {
          username: credentials.username,
          password: credentials.password,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("token");
  
        return response.body.token;
      });
    });
  };
