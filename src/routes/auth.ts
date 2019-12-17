import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get(
	'/redirect',
	passport.authenticate('freshbooks', {
		successRedirect: '/app/dashboard',
		failureRedirect: '/',
	})
)

export default router
