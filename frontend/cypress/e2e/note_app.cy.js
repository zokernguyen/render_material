describe('Note app', function () {

  beforeEach(function () {
    cy.request('POST',
    `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Tin Nguyen',
      username: 'zoker',
      password: '123456'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user) 
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('zoker')
    cy.get('#password').type('123456')
    cy.get('#login-button').click()
    cy.contains('Tin Nguyen logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      // cy.contains('log in').click()
      // cy.get('input:first').type('zoker')
      // cy.get('input:last').type('123456')
      // cy.get('#login-button').click()
      cy.login({ username: 'zoker', password: '123456' })
      cy.createNote({content: 'first note', important: false})
      cy.createNote({content: 'second note', important: false})
      cy.createNote({content: 'third note', important: false})
    })

    it('one of those can be made important', function () {
      cy.contains('second note').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.get('@theButton').should('contain', 'make not important')
    })
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('zoker')
    cy.get('#password').type('clumsy')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      //should give a wider scope of test while contain is only text-based testing
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    
    cy.get('html').should('not.contain', 'Tin Nguyen logged in')
  })
})