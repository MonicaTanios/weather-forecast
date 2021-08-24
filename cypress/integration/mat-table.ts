// This test works only in Egypt
// As it tests by selecting "Cairo"
// Length 13 = 12 Months + Header
describe('Assert table having 12 entries', () => {
  it('Visit Weather Dashboard', () => {
    cy.visit('/');
    cy.get('.form-select').select('Cairo');
    cy.get('.mat-elevation-z8 > table')
      .find('tr')
      .should('not.be.empty')
      .should('have.length', 13);
  });
});
