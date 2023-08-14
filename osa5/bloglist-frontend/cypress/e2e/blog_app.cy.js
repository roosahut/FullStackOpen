describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testaaja',
      username: 'tester',
      password: 'testi',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()

      cy.contains('Testaaja logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('väärin')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester', password: 'testi' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Testaus')
      cy.get('#author').type('Testaaja 2')
      cy.get('#url').type('testi.fi')
      cy.contains('create').click()

      cy.contains('new blog Testaus by Testaaja 2 added')
      cy.contains('Testaus Testaaja 2')
    })

    it('User can like a blog', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Testaus')
      cy.get('#author').type('Testaaja 2')
      cy.get('#url').type('testi.fi')
      cy.contains('create').click()

      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('likes: 1')
    })

    it('User who created the blog can delete it', function () {
      cy.createBlog({
        title: 'first blog',
        author: 'first blogger',
        url: 'firstblog.com',
      })

      cy.contains('view').click()

      cy.contains('delete this blog').click()

      cy.contains('first blog deleted')
    })

    describe('when there are more blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'first blogger',
          url: 'firstblog.com',
          likes: 3,
        })
        cy.createBlog({
          title: 'second blog',
          author: 'second blogger',
          url: 'secondblog.com',
          likes: 2,
        })
        cy.createBlog({
          title: 'third blog',
          author: 'third blogger',
          url: 'thirdblog.com',
          likes: 0,
        })
      })
      it('blogs are sorted by the amount of likes', function () {
        cy.get('.blog').eq(0).should('contain', 'first blog')
        cy.get('.blog').eq(1).should('contain', 'second blog')
        cy.get('.blog').eq(2).should('contain', 'third blog')
      })
    })
  })
})
