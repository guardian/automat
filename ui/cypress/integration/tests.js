const newTestName = `My new test name ${new Date().getTime()}`;

describe('App Navigation', () => {
  it('navigates to a slot page', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('MPU').click({ force: true });

    cy.url().should('equal', 'http://localhost:3000/slots/mpu');
    cy.contains('MPU Slot');
  });

  it('navigates back to home page', () => {
    cy.contains('Back to Slots').click({ force: true });

    cy.url().should('equal', 'http://localhost:3000/');
  });
});

describe('Test Creation', () => {
  it('creates a new test and navigates to it', () => {
    cy.visit('http://localhost:3000/slots/mpu');
    cy.wait(2000);

    cy.get('button').contains('Unlock Editing Mode').click({ force: true });
    cy.contains('Create Test').click({ force: true });

    cy.url().should('include', '/slots/mpu/tests/');
    cy.contains('Untitled Test');
  });

  it('populates the new test with basic details', () => {
    cy.get('#TestNameInput').clear({ force: true }).type(newTestName);
    cy.get('#DescriptionInput').clear({ force: true }).type('New test description');
  });

  it('switches to the variants tab and adds a variant', () => {
    cy.get('button').contains('Variants').click({ force: true });

    cy.contains('Your test must have at least one variant');

    cy.get('button').contains('Add Variant').click({ force: true });
    cy.get('[aria-label="Click to select component"]').click();
    cy.get('li[role="option"]').contains('Subscriptions MPU').click();
    cy.get('button[aria-label="Select"]').click({ force: true });

    cy.contains('A Guardian subscriptions advert in MPU format');
  });

  it('switches to the filters tab and adds a filter', () => {
    cy.get('button').contains('Filters').click({ force: true });

    cy.contains('No filters to display');

    cy.get('button').contains('Add Filter').click({ force: true });
    cy.get('[aria-label="Click to select filter"]').click({ force: true });
    cy.get('li[role="option"]').contains('Authentication Status').click({ force: true });
    cy.get('button[aria-label="Select"]').click({ force: true });

    cy.get('label').contains('User must be Signed In').click({ force: true });
  });

  it('saves changes to publish the new test', () => {
    cy.get('button[aria-label="Save changes"]').click({ force: true });
    cy.get('button[aria-label="Confirm save changes"]').click({ force: true });
  });
});

describe('Test Deletion', () => {
  it('unlocks the test again and deletes it', () => {
    cy.get('button').contains('Unlock Editing Mode').click({ force: true });
    cy.get('button[aria-label="Test context menu"]').click({ force: true });
    cy.contains('Delete Test').click({ force: true });
    cy.get('button[aria-label="Confirm delete test"]').click({ force: true });
    cy.contains(newTestName).should('not.exist');
  });

  it('saves changes again', () => {
    cy.get('button[aria-label="Save changes"]').click({ force: true });
    cy.get('button[aria-label="Confirm save changes"]').click({ force: true });
  });
});
