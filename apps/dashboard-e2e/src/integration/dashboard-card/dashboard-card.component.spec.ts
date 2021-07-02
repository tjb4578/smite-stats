describe('dashboard', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dashboardcardcomponent--primary&args=title;imgUrl;route;'));
  it('should render the component', () => {
    cy.get('smitestats-dashboard-card').should('exist');
  });
});