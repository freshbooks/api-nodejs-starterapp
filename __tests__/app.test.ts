import request from 'supertest'
import passport from 'passport'
import app from '../src/app'

describe('App', () => {
	test('GET /', async () => {
		const response = await request(app).get('/')
		expect(response.status).toBe(404)
	})
})

describe('Auth', () => {
	test('GET /auth/freshbooks', async () => {
		// setup route
		app.get(
			'/auth/freshbooks',
			passport.authenticate('freshbooks', {
				successRedirect: '/success',
				failureRedirect: '/failure',
			})
		)

		const response = await request(app).get('/auth/freshbooks')
		const {
			header: { location },
			status,
		} = response

		expect(status).toBe(302)
		expect(
			location.startsWith(
				'https://my.freshbooks.com/service/auth/oauth/authorize'
			)
		).toBeTruthy()
	})
})
