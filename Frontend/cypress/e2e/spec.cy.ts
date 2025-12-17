describe("My first test", () => {
  it("should open Google", () => {
    cy.visit("https://yahoo.com");
    cy.contains("Yahoo");
    cy.get('input[name="p"]').type("Cypress{enter}");
  });
});
