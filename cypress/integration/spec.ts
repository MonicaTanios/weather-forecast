describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Current Weather');
    cy.contains('City Weather Dashboard');
  });
});
