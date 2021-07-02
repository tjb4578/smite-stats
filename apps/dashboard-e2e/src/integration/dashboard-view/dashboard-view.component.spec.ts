describe('dashboard', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dashboardviewcomponent--primary'));
  it('should render the component', () => {
    cy.get('smitestats-dashboard-view').should('exist');
  });
});