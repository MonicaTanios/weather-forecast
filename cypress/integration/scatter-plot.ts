describe('Assert cities are bought via the API', () => {
  it('Visit Weather Dashboard', () => {
    cy.visit('/');
    cy.get('.form-select').should('not.be.empty');
  });
});

//
describe('Check that the plot is created', () => {
  it('Visit Weather Dashboard', () => {
    cy.visit('/');
    cy.get('.form-select').select('Cairo');
    cy.get('.filter-row > div > div > #AverageDailyRainFall').click();
    cy.get('.svg-div > svg').should('not.be.empty');
  });
});
