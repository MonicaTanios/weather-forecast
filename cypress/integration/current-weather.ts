describe('Check that the current weather is not empty', () => {
  it('Visit Current Weather Card', () => {
    cy.visit('/');
    cy.get('.current-weather').should('have.length', 1);
  });
});

// 2 is for {day} and {full date}
describe('Assert date is displayed', () => {
  it('Visit Current Weather Card', () => {
    cy.visit('/');
    cy.get('.text-gray').should('have.length', 2);
  });
});

describe('Assert location is detected', () => {
  it('Visit Current Weather Card', () => {
    cy.visit('/');
    cy.get('.address > h4').should('not.be.empty');
  });
});
