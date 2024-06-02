describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Shows loading spinner while fetching articles', () => {
    cy.get('.loading-spinner').should('exist');
    cy.get('.landing').should('not.exist');
  });

  it('Displays articles after fetching', () => {
    cy.wait(5000);
    cy.get('.loading-spinner').should('not.exist');
    cy.get('.landing').should('exist');
    cy.get('.card').should('have.length.greaterThan', 0);
  });
});
