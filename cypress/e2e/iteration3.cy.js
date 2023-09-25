describe('should load page title, form and existing shortened URLS', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixtue: "postedUrls"
    }).as('urls').visit('http://localhost:3000')

  })

  it('can view the page title, form and the existing shortened URLs', () => {
    // cy.wait(['@urls'])
    cy.get('header').should('exist')
      .contains('h1', 'URL Shortener')
      .contains('form')

      .get('form').children()
      .first().should('have.attr', 'name', 'title')
    cy.get('section').children().should('exist')

  })

  it('When a user fills out the form, the information is reflected in the input field values', () => {
    // cy.wait(['@urls'])
    cy.get('input.title').type('test')
    cy.get('input.urlToShorten').type('test url')
    cy.get('button').click()

  })

})