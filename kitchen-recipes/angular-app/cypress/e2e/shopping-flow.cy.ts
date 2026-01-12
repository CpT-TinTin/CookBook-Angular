describe('Shopping List Flow', () => {
    it('should add ingredients from Angular to React Shopping List', () => {
        // 1. Visit Angular App
        cy.visit('http://localhost:4200/login');

        // Login
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('password');
        cy.get('button[type="submit"]').click();

        // Check if redirected to recipes
        cy.url().should('include', '/recipes');

        // 2. Add first recipe to shopping list
        // Click the menu trigger (three dots)
        cy.get('.menu-trigger').first().click();
        // Click "Adaugă la Listă"
        cy.contains('🛒 Adaugă la Listă').click();

        // 3. Verify redirection to React App
        // Note: This assumes both apps are running. 
        // Cypress might have trouble with cross-origin if not configured, 
        // but let's try the happy path.
        cy.origin('http://localhost:5173', () => {
            cy.url().should('include', '/shopping-list');
            cy.contains('Lista de Cumpărături');
            // Verify items are present (e.g., "Spaghete" from Carbonara)
            cy.contains('Spaghete').should('exist');
        });
    });
});
