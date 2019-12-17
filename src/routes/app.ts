import { Router } from 'express'
import { SessionUser } from '@freshbooks/app/dist/PassportStrategy'

const router = Router()

// ensure only authenticated users for this router
router.use((req, res, next) => {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/')
	}
})

router.get('/dashboard', (req, res) => {
	const user = req.user as SessionUser
	res.send(`Hello ${user.id}`)
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

export default router
