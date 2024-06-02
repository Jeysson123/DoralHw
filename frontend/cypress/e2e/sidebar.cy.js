describe('Sidebar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Loads successfully', () => {
    cy.get('.sidebar').should('exist');
  });

  it('Allows selecting date and language', () => {
    cy.get('.sidebar__date').type('2022-06-15');
    cy.get('.sidebar__select').select('English');
    cy.get('.sidebar__btn').click();
    cy.url().should('include', '/feed');
  });
});
