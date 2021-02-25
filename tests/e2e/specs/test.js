// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
    it('Visits the app root url', async () => {
        // Arrange
        cy.visit('/');
        // Act
        cy.get('#first-number').clear().type('123');
        cy.get('#second-number').clear().type('456');
        cy.get('#clicks').click();
        // Assert
        cy.get('#result').should('have.text', '579');
        cy.get('#clicks').should('have.text', '3');
        cy.screenshot();
    });
});
