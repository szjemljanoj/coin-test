describe('Connect / disconnect button', () => {
  it('Should change text and class', () => {
    cy.visit('http://localhost:3000/');
    cy.request('/http://localhost:3000/initCryptocarrency.json')
    cy.get('.button-connect')
      .should('have.text', 'Disconnect')
      .and('have.class', 'connect')
      .click()
      .should('have.text', 'Connect')
      .and('have.class', 'disconnect');
  });
});

describe('Request API', () => {
  it('Expect to receive status 200 and 621 coins by init request', () => {
    cy.request('/http://localhost:3000/initCryptocarrency.json').should(response => {
      expect(response.status).to.eq(200);
    });
    cy.get('.cryptocurrencies-item').then($item=> {
      expect($item, '621 items').to.have.length(621);
    });
  });
});
