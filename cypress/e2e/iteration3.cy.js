describe('should load page title, form and existing shortened URLS', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: "postedUrls.json"
    }).as('urls')
    .visit('http://localhost:3000')

  })

  it('can view the page title, form and the existing shortened URLs', () => {
    

    cy.wait(['@urls'])
    cy.get('header').should('exist')
      .contains('h1', 'URL Shortener')

      .get('form').should('exist')

      .get('form').children()
      .first().should('have.attr', 'name', 'title')
    cy.get('section').children().should('have.length', 4)
      .get(':nth-child(1)').within(() => {
        cy.get('h3').should('contain', 'Awesome photo')
        .get('a').should('contain', 'http://localhost:3001/useshorturl/1')
        .get('p').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
      })
      .get(':nth-child(2)').within(() => {
        cy.get('h3').should('contain', 'dfb')
        .get('a').should('contain', 'http://localhost:3001/useshorturl/2')
        .get('p').should('contain', 'dfnhdf')
      })
      .get(':nth-child(3)').within(() => {
        cy.get('h3').should('contain', 'sadf')
        .get('a').should('contain', 'http://localhost:3001/useshorturl/3')
        .get('p').should('contain', 'asdfads')
      })
      .get(':nth-child(4)').within(() => {
        cy.get('h3').should('contain', 'gjh')
        .get('a').should('contain', 'http://localhost:3001/useshorturl/4')
        .get('p').should('contain', 'gj')
      })
  })

  it('When a user fills out the form, the information is reflected in the input field values', () => {
    cy.get('input[name="title"]').type('Example')
    cy.get('input[name="urlToShorten"]').type('www.testtesttesttesttesttesttesttesttesttesttesttest.com')
    cy.get('input[name="title"]').should('have.value', 'Example')
    cy.get('input[name="urlToShorten"]').should('have.value', 'www.testtesttesttesttesttesttesttesttesttesttesttest.com')
  })

  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.get('input[name="title"]').type('Example')
    cy.get('input[name="urlToShorten"]').type('www.testtesttesttesttesttesttesttesttesttesttesttest.com')
    cy.get('button').click()

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: "newPost"
    }).as('post')

    cy.request('POST', 'http://localhost:3001/api/v1/urls', { 
      long_url: "www.testtesttesttesttesttesttesttesttesttesttesttest.com",
      title: "Example"
    }).then((response) => {
      expect(response.body).to.have.property('title', 'Example')
      expect(response.body).to.have.property('long_url', 'www.testtesttesttesttesttesttesttesttesttesttesttest.com')
    })

    cy.wait(['@urls'])

    cy.get('section').children().should('have.length', 5)
      .get(':nth-child(5)').within(() => {
        cy.get('h3').should('contain', 'Example')
        .get('a').should('contain', 'http://localhost:3001/useshorturl/5')
        .get('p').should('contain', 'www.testtesttesttesttesttesttesttesttesttesttesttest.com')
      })
  })

})